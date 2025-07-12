# Creating an ORM Model

Models are the way that we interact with our chatbot_server's underlying database.

First, create a new model in `src/models`.

```bash
touch src/models/myModel.js 
```
<!-- Models should be camelCase -->
 
Second, create the model in the following format

```javascript
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Test extends Model {
    static associate(models) {
      // Define associations here (example)
      // this.hasMany(models.TestResult, { foreignKey: 'test_id' });
    }
  }

  Test.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [3, 100]
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    difficulty_level: {
      type: DataTypes.ENUM('easy', 'medium', 'hard'),
      defaultValue: 'medium'
    },
    max_score: {
      type: DataTypes.INTEGER,
      validate: {
        min: 0,
        max: 1000
      }
    }
  }, {
    sequelize,
    modelName: 'Test',
    tableName: 'tests',
    timestamps: true,
    underscored: true,
    paranoid: true, // Enables soft deletes
  });

  return Test;
};
```



## Using the Model

You can go ahead and import the model in your service, and/or tests file as such and perform operations on the model given the demands of the tasks you're working on as such.

```javascript
// Import the model
const { Test } = require('./models');

// 1. Create a test
const newTest = await Test.create({
  name: 'Math Assessment',
  description: 'Basic algebra test',
  difficulty_level: 'medium',
  max_score: 100
});

// 2. Fetch tests
const tests = await Test.findAll({
  where: { is_active: true },
  limit: 10
});

// 3. Update a test
const [updatedRows] = await Test.update(
  { max_score: 150 },
  { where: { id: testId } }
);

// 4. Soft delete
await Test.destroy({ where: { id: testId } });

```

Once you restart the app, the Sequelize instance will be able to use the model.