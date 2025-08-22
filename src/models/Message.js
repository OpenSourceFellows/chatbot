const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Message extends Model {
    static associate(models) {
      // Define associations here
      if (models.User) {
        Message.belongsTo(models.User, { foreignKey: 'userId' });
      }
    }
  }

  Message.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      message: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      response: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      source: {
        type: DataTypes.ENUM('twilio', 'web', 'api'),
        defaultValue: 'api',
      },
      status: {
        type: DataTypes.ENUM('pending', 'processed', 'failed'),
        defaultValue: 'pending',
      },
      metadata: {
        type: DataTypes.JSONB,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Message',
      tableName: 'messages',
      timestamps: true,
    }
  );

  return Message;
};
