const catchAsync = require('./catchAsync');
const withRetry = require('./withRetry');
/**
 * @function withRetryAndCatch
 * @param {import('../utils/withRetry').RetryOptions} options
 * @returns {import('../utils/withRetry').AsyncExpressHandler} 
 */
const withRetryAndCatch = (options = {}) => fn => {
  if (!fn || typeof fn !== 'function') throw new Error('Express handler is required');

  return catchAsync(withRetry(fn, options));
};

module.exports = withRetryAndCatch;