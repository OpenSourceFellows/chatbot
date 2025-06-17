const logger = require('../config/logger');
const messagingService = require('../services');
const catchAsync = require('../utils/catchAsync');
const withRetry = require('../utils/withRetry');

/**
 * @function handleIncomingMessage
 * @typedef {import('../utils/withRetry').AsyncExpressHandler}
 */
async function handleIncomingMessage(req, res, next) {
  const startTime = Date.now();
  const requestId = req.headers['x-request-id'] || `req_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

  logger.info('Webhook request received', {
    requestId,
    source: req.headers['user-agent'],
    contentType: req.headers['content-type'],
    bodySize: req.rawBody.length,
    timestamp: new Date().toISOString()
  });

  const result = await messagingService.processMessage(req, requestId);

  const processingTime = Date.now() - startTime;

  logger.info('Webhook request processed successfully', {
    requestId,
    processingTime,
    messageType: result.messageType,
    source: result.source,
  });

  res.status(200).json({
    success: true,
    requestId,
    message: 'Message processed successfully',
    processingTime
  });
  next(); 
}

const withRetryAndCatch = (options = {}) => (fn) => catchAsync(withRetry(fn, options));

module.exports = { handleIncomingMessage: withRetryAndCatch()(handleIncomingMessage) };