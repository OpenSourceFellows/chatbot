const logger = require('../config/logger');

/**
 * @typedef {Function} AsyncExpressHandler
 * @param {Express.Request} req
 * @param {Express.Response} res  
 * @param {Express.NextFunction} next
 * @returns {Promise<void>}
 */

/**
 * @typedef {Record} RetryOptions
 * @param {number} [maxAttempts=3] - Maximum number of retry attempts
 * @param {number} [baseDelay=1000] - Base delay in milliseconds
 * @param {number} [maxDelay=30000] - Maximum delay in milliseconds
 * @param {Function} [shouldRetry] - Predicate function to determine if error should trigger retry
 * @param {Function} [onRetry] - Callback executed on each retry attempt
 */
const defaultOptions = {
  maxAttempts: 3,
  baseDelay: 1000,
  maxDelay: 30000,
  shouldRetry: error => error.isClientError,
  onRetry: (attempt, error) => logger.warn(`Retry attempt ${attempt}`, error.message)
};

/**
 * 
 * @param {AsyncExpressHandler} fn 
 * @param {RetryOptions} options
 * @returns 
 */
function withRetry(fn, options = {}) {

  const maxAttempts = options.maxAttempts || defaultOptions.maxAttempts;
  const baseDelay = options.baseDelay || defaultOptions.baseDelay;
  const maxDelay = options.maxDelay || defaultOptions.maxDelay;
  const shouldRetry = options.shouldRetry || defaultOptions.shouldRetry;
  const onRetry = options.onRetry || defaultOptions.onRetry;

  return async (req, res, next) => {
    let lastError;
    
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        return await fn(req, res, next);
      } catch (error) {
        lastError = error;
        
        if (attempt === maxAttempts || !shouldRetry(error)) {
          throw error;
        }
        
        const delay = Math.min(
          baseDelay * Math.pow(2, attempt - 1) + Math.random() * 1000,
          maxDelay
        );
        
        onRetry(attempt, error);
        await new Promise(resolve => {
          setTimeout(resolve, delay);
        });
      }
    }
    
    throw lastError;
  };
}

module.exports = withRetry;
