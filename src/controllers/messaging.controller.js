const logger = require('../config/logger');
const messagingService = require('../services');
const withRetryAndCatch = require('../utils/withRetryAndCatch');

/**
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @param {import('express').NextFunction} _next
 */
async function handleIncomingMessage(req, res) {
  const startTime = Date.now();
  const requestId = req.headers['x-request-id'] || `req_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

  logger.info('Webhook request received', {
    requestId,
    source: req.headers['user-agent'],
    contentType: req.headers['content-type'],
    bodySize: JSON.stringify(req.body).length,
    timestamp: new Date().toISOString()
  });

  try {
    const result = await messagingService.processMessage(req, requestId);

    const processingTime = Date.now() - startTime;

    logger.info('Webhook request processed successfully', {
      requestId,
      processingTime,
      source: result.source,
    });

    return res.status(200).json({
      success: true,
      requestId,
      message: 'Message processed successfully',
      processingTime
    });
  } catch (error) {
    const processingTime = Date.now() - startTime;
    
    logger.error('Webhook request processing failed', {
      requestId,
      processingTime,
      error: error.message,
      stack: error.stack
    });

    return res.status(500).json({
      success: false,
      requestId,
      message: 'Message processing failed',
      processingTime
    });
  }
}

//TODO: Configure retry options, logging, logic for retry, client error handling, etc.
module.exports = { handleIncomingMessage: withRetryAndCatch()(handleIncomingMessage) };