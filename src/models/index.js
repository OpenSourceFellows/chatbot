const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const basename = path.basename(__filename);

const db = {};

const initializeModels = (sequelize) => {
  // Read all model files
  fs.readdirSync(__dirname)
    .filter(file => {
      return (
        file.indexOf('.') !== 0 &&
        file !== basename &&
        file.slice(-3) === '.js' &&
        !file.includes('.test.js')
      );
    })
    .forEach(file => {
      const modelModule = require(path.join(__dirname, file));
      
      // Handle both function-style and class-style models
      let model;

      if (typeof modelModule === 'function') {
        // Function-style: module.exports = (sequelize, DataTypes) => {...}
        model = modelModule(sequelize, Sequelize.DataTypes);
      } else if (modelModule.init) {
        // Class-style: module.exports = class User extends Model {...}
        model = modelModule;
        model.init(sequelize);
      } else {
        throw new Error(`Model file ${file} must export either a function or a Sequelize Model class`);
      }
      
      db[model.name] = model;
    });

  // Setup associations
  Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });

  db.sequelize = sequelize;
  db.Sequelize = Sequelize;
};

module.exports = { initializeModels, db };