const fs = require('fs');
const path = require('path');
const morgan = require('morgan');
const config = require('./config');

morgan.token('message', (req, res) => res.locals.errorMessage || '');

const getIPFormat = () =>
  config.env === 'production' ? ':remote-addr - ' : '';

const logsDir = path.join(__dirname, '..', '../logs');

const logFile = path.join(logsDir, 'access.log');

// Create the logs directory if it doesn't exist
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

// Create the write stream for the log file
const accessLogStream = fs.createWriteStream(logFile, { flags: 'a' });

const successResponseFormat = `${getIPFormat()} :method :url :status :response-time ms :user-agent :date`;

const successHandler = morgan(successResponseFormat, {
  stream: accessLogStream,
  skip: (req, res) => res.statusCode >= 400,
});

const errorResponseFormat = `${getIPFormat()} :method :url :status :response-time ms :user-agent :date - error-message: :message`;

const errorHandler = morgan(errorResponseFormat, {
  stream: accessLogStream,
  skip: (req, res) => res.statusCode < 400,
});

module.exports = { successHandler, errorHandler };
