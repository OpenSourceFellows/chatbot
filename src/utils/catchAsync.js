/**
 * Utility function to wrap async Express route handlers
 * Catches async errors and passes them to Express error handling middleware
 * @param {Function} fn - Async function to wrap
 * @returns {Function} Express middleware function
 */
function catchAsync(fn) {
  return (req, res, next) => {
    // Execute the async function and catch any errors
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}
  
module.exports = catchAsync;
  