const { pool } = require('../../config/database');

async function connectDB() {
  try {
    await pool.query('SELECT NOW()');
    console.log('PostgreSQL connected');
  } catch (error) {
    console.error('PostgreSQL connection error', error);
    process.exit(1);
  }
}

module.exports = connectDB;