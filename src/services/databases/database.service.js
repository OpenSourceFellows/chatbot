const { pool } = require('../../config/database');
const logger = require('../../config/logger');

async function connectDB() {
  try {
    await pool.query('SELECT NOW()');
    logger.log('PostgreSQL connected');
  } catch (error) {
    logger.error('PostgreSQL connection error', error);
    process.exit(1);
  }
}

module.exports = connectDB;