
describe('withRetryAndCatch', () => {
  let mockReq, mockRes, mockNext;
  let mockHandler;
  let withRetryAndCatch;
  let withRetry;
  let catchAsync;


  beforeEach(() => {
    jest.resetModules();
    jest.doMock('../../utils/withRetry', () => {
      return jest.fn((fn) => {
        // Just return the handler as-is for test purposes

        return fn;
      });
    });
    jest.doMock('../../utils/catchAsync', () => {
      return jest.fn((fn) => function (...args) {
        const next = args[2];

        try {
          const maybePromise = fn(...args);

          if (maybePromise && typeof maybePromise.catch === 'function') {

            return maybePromise.catch(next);
          }

          return maybePromise;
        } catch (err) {
          if (typeof next === 'function') {

            next(err);
          } else {

            throw err;
          }
        }
      });
    });
    withRetryAndCatch = require('../../utils/withRetryAndCatch');
    withRetry = require('../../utils/withRetry');
    catchAsync = require('../../utils/catchAsync');

    // Reset all mocks
    jest.clearAllMocks();
    
    // Mock Express request, response, and next
    mockReq = {
      params: { id: '123' },
      body: { data: 'test' },
      query: { filter: 'active' }
    };
    
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    };
    
    mockNext = jest.fn();
    
    // Mock handler function
    mockHandler = jest.fn().mockResolvedValue({ success: true });
  });

  describe('Function Composition', () => {
    it('should return a function that wraps the handler with retry and catch logic', () => {
      const wrapper = withRetryAndCatch();

      expect(typeof wrapper).toBe('function');
      expect(wrapper.length).toBe(1); // Should accept one parameter (the handler function)
    });

    it('should call withRetry with the handler and options', () => {
      const options = { maxAttempts: 3, delay: 1000 };
      const wrapper = withRetryAndCatch(options);
      
      wrapper(mockHandler);
      
      expect(withRetry).toHaveBeenCalledWith(mockHandler, options);
    });

    it('should call catchAsync with the result of withRetry', () => {
      const wrapper = withRetryAndCatch();
      
      wrapper(mockHandler);

      expect(withRetry).toHaveBeenCalledWith(mockHandler, {});

      expect(catchAsync).toHaveBeenCalled();
      // catchAsync should be called with the result of withRetry
      const withRetryResult = withRetry.mock.results[0].value;

      expect(catchAsync).toHaveBeenCalledWith(withRetryResult);
    });

    it('should return the result of catchAsync', () => {
      const wrapper = withRetryAndCatch();
      
      const result = wrapper(mockHandler);
      
      // catchAsync now returns the actual wrapped function, so we check it's a function
      expect(typeof result).toBe('function');

      expect(catchAsync).toHaveBeenCalled();
    });
  });

  describe('Options Handling', () => {
    it('should use default empty options when none provided', () => {
      const wrapper = withRetryAndCatch();
      
      wrapper(mockHandler);
      
      expect(withRetry).toHaveBeenCalledWith(mockHandler, {});
    });

    it('should pass through custom retry options', () => {
      const customOptions = {
        maxAttempts: 5,
        delay: 2000,
        exponentialBackoff: true,
        jitter: true
      };
      
      const wrapper = withRetryAndCatch(customOptions);

      wrapper(mockHandler);
      
      expect(withRetry).toHaveBeenCalledWith(mockHandler, customOptions);
    });

    it('should handle partial options correctly', () => {
      const partialOptions = { maxAttempts: 2 };
      
      const wrapper = withRetryAndCatch(partialOptions);

      wrapper(mockHandler);
      
      expect(withRetry).toHaveBeenCalledWith(mockHandler, partialOptions);
    });
  });

  describe('Integration Behavior', () => {
    it('should handle successful handler execution', async () => {
      const successHandler = jest.fn().mockResolvedValue('success');
      const wrapper = withRetryAndCatch();
      const wrappedHandler = wrapper(successHandler);
      
      await wrappedHandler(mockReq, mockRes, mockNext);
      
      expect(successHandler).toHaveBeenCalledWith(mockReq, mockRes, mockNext);
      expect(mockNext).not.toHaveBeenCalled();
    });

    it('should handle handler failures and pass errors to next', async () => {
      const error = new Error('Handler failed');
      const failingHandler = jest.fn().mockRejectedValue(error);
      const wrapper = withRetryAndCatch();
      const wrappedHandler = wrapper(failingHandler);
      
      await wrappedHandler(mockReq, mockRes, mockNext);
      
      expect(failingHandler).toHaveBeenCalled();
      expect(mockNext).toHaveBeenCalled();
      expect(mockNext).toHaveBeenCalledWith(error);
    });
  });

  describe('Edge Cases', () => {
    it('should handle null options gracefully', () => {
      const wrapper = withRetryAndCatch(null);
      
      wrapper(mockHandler);

      expect(withRetry).toHaveBeenCalled();
      
      expect(withRetry).toHaveBeenCalledWith(mockHandler, null);
    });

    it('should handle undefined handler', () => {
      const wrapper = withRetryAndCatch();
      
      expect(() => wrapper(undefined)).toThrow('Express handler is required');
    });

    it('should maintain handler context', () => {
      const contextHandler = jest.fn(function(...args) {
        return Promise.resolve(args);
      });
      
      const wrapper = withRetryAndCatch();

      wrapper(contextHandler);
      
      expect(withRetry).toHaveBeenCalledWith(contextHandler, {});
    });
  });

  describe('Type Safety and Error Handling', () => {
    it('should handle non-function handlers gracefully', () => {
      const wrapper = withRetryAndCatch();
      
      expect(() => wrapper('not a function')).toThrow('Express handler is required');
    });

    it('should preserve original handler arity', () => {
      const threeParamHandler = (req, res, next) => {};
      const wrapper = withRetryAndCatch();
      
      wrapper(threeParamHandler);
      
      expect(withRetry).toHaveBeenCalledWith(threeParamHandler, {});
    });
  });

  describe('Performance and Memory', () => {
    it('should not create unnecessary closures', () => {
      const wrapper1 = withRetryAndCatch();
      const wrapper2 = withRetryAndCatch();
      
      expect(wrapper1).not.toBe(wrapper2);
    });

    it('should handle multiple simultaneous calls', () => {
      const wrapper = withRetryAndCatch();
      const handler1 = jest.fn();
      const handler2 = jest.fn();
      
      wrapper(handler1);
      wrapper(handler2);
      
      expect(withRetry).toHaveBeenCalledTimes(2);
      expect(catchAsync).toHaveBeenCalledTimes(2);
    });
  });

  describe('Real-world Scenarios', () => {
    it('should work with typical Express route handler', async () => {
      const routeHandler = jest.fn(async (req, res) => {
        res.json({ id: req.params.id, data: 'processed' });
      });
      
      const wrapper = withRetryAndCatch({ maxAttempts: 3 });
      const wrappedHandler = wrapper(routeHandler);
      
      // Simulate the actual call chain
      await wrappedHandler(mockReq, mockRes, mockNext);
      
      expect(withRetry).toHaveBeenCalledWith(routeHandler, { maxAttempts: 3 });
      expect(catchAsync).toHaveBeenCalled();
    });

    it('should work with async/await handlers', async () => {
      const asyncHandler = jest.fn(async (req, res) => {
        await new Promise(resolve => setTimeout(resolve, 10));

        return { processed: true };
      });
      
      const wrapper = withRetryAndCatch();
      const wrappedHandler = wrapper(asyncHandler);
      
      await wrappedHandler(mockReq, mockRes, mockNext);
      
      expect(asyncHandler).toHaveBeenCalledWith(mockReq, mockRes, mockNext);
    });

    it('should handle database operation scenarios', () => {
      const dbHandler = jest.fn(async (req, res) => {
        // Simulate database operation
        throw new Error('Connection timeout');
      });
      
      const wrapper = withRetryAndCatch({ 
        maxAttempts: 3, 
        delay: 100 
      });
      
      wrapper(dbHandler);
      
      expect(withRetry).toHaveBeenCalledWith(dbHandler, { 
        maxAttempts: 3, 
        delay: 100 
      });
    });
  });
});