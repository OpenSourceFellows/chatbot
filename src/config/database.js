const config = require("./config");
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  config.postgresDb,
  config.postgresUser,
  config.postgresPassword,
  {
    host: config.postgresHost,
    port: config.postgresPort,
    dialect: "postgres",
    logging: false, // Disable SQL log spam in development
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

module.exports = sequelize;
