'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('messages', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      phoneNumber: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      message: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      response: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      source: {
        type: Sequelize.ENUM('twilio', 'web', 'api'),
        defaultValue: 'api',
      },
      status: {
        type: Sequelize.ENUM('pending', 'processed', 'failed'),
        defaultValue: 'pending',
      },
      metadata: {
        type: Sequelize.JSONB,
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });

    // Add indexes
    await queryInterface.addIndex('messages', ['userId']);
    await queryInterface.addIndex('messages', ['phoneNumber']);
    await queryInterface.addIndex('messages', ['status']);
    await queryInterface.addIndex('messages', ['createdAt']);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('messages');
  },
};
