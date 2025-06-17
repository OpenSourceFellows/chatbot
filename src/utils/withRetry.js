const logger = require('../config/logger');

/**
 * @typedef {Function} AsyncExpressHandler
 * @param {Express.Request} req
 * @param {Express.Response} res  
 * @param {Express.NextFunction} next
 * @returns {Promise<void>}
 */

/**
 * 
 * @param {AsyncExpressHandler} fn 
 * @param {number} [options.maxAttempts=3] - Maximum number of retry attempts
 * @param {number} [options.baseDelay=1000] - Base delay in milliseconds
 * @param {number} [options.maxDelay=30000] - Maximum delay in milliseconds
 * @param {Function} [options.shouldRetry] - Predicate function to determine if error should trigger retry
 * @param {Function} [options.onRetry] - Callback executed on each retry attempt
 * @returns 
 */
function withRetry(fn, options = {}) {
  const {
    maxAttempts = 3,
    baseDelay = 1000,
    maxDelay = 30000,
    shouldRetry = (error) => !error.isClientError,
    onRetry = (attempt, error) => logger.warn(`Retry attempt ${attempt}:`, error.message)
  } = options;

  return async (...args) => {
    let lastError;
    
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        return await fn(...args);
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