const httpStatus = require('http-status');
const config = require('./../config/config');
const logger = require('./../config/logger');
const ApiError = require('./../utils/ApiError');

const errorConverter = (err, req, res, next) => { 
  let error = err;

  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode
      ? httpStatus.BAD_REQUEST
      : httpStatus.INTERNAL_SERVER_ERROR;

    const message = error.message || httpStatus[statusCode];

    error = new ApiError(statusCode, message, false, error.stack);
  }

  next(error);
};
const errorHandler = (err, req, res, next) => {
  let { statusCode, message } = err;

  if (config.env === 'production' && !err.isOperational) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    message = httpStatus[statusCode];
  }

  const response = {
    error: true,
    code: statusCode,
    message,
    ...(config.env === 'development' && { stack: err.stack }),
  };

  res.locals.errorMessage = message;

  if (config.env === 'development') {
    logger.error(err);
  }

  res.status(statusCode).send(response);

  return next();
};

module.exports = {
  errorHandler,
  errorConverter,
};
