const config = require('./config');
const logger = require('./logger');

module.exports = {
  development: {
    username: config.postgresUser,
    password: config.postgresPassword,
    database: config.postgresDb,
    host: config.postgresHost || 'postgres',
    port: config.postgresPort,
    dialect: 'postgres',
    logging: config.env === 'development' ? logger.info('development') : false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  },
  production: {
    username: config.postgresUser,
    password: config.postgresPassword,
    database: config.postgresDb,
    host: config.postgresHost,
    port: config.postgresPort,
    dialect: 'postgres',
    logging: false,
    pool: {
      max: 10,
      min: 2,
      acquire: 60000,
      idle: 20000
    },
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false // For self-signed certificates
      },
      // For connection timeouts
      connectTimeout: 60000,
      keepAlive: true
    },
    // Heroku and other cloud providers often use this
    ...(config.dbUrl ? { url: config.dbUrl } : {})
  }
};