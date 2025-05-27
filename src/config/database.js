const { Sequelize } = require('sequelize');
const logger = require('../config/logger');
const { initializeModels } = require('../models');
const config = require('./config');
const envConfig = require('./sequelize-cli.config')[config.env];

const sequelize = new Sequelize(
  envConfig.database,  
  envConfig.username,
  envConfig.password,
  {
    host: envConfig.host,
    port: envConfig.port,
    dialect: envConfig.dialect,
    logging: false,
    pool: envConfig.pool,
    dialectOptions: envConfig.dialectOptions,  
  },
  
);

initializeModels(sequelize);

// Connection management
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    logger.info('Database connection established');

    return sequelize;
  } catch (error) {
    logger.error(error);
  }
};
// Connection closure
const closeDB = async () => {
  try {
    await sequelize.close();
    logger.info('Database connection closed');
  } catch (error) {
    logger.error(error);
  }
};

module.exports = { connectDB, closeDB };
