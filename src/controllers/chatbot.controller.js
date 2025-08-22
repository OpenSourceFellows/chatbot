const logger = require('../config/logger');
const chatbotService = require('../services');

/**
 * Handle incoming chatbot messages
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @param {import('express').NextFunction} next
 */
async function handleMessage(req, res, next) {
  try {
    const { message, phoneNumber, userId } = req.body;
    
    if (!message) {
      return res.status(400).json({
        success: false,
        message: 'Message is required'
      });
    }

    const result = await chatbotService.processMessage(message, phoneNumber, userId);
    
    return res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    logger.error('Error in chatbot controller:', error);
    next(error);
  }
}

/**
 * Get chat history for a user
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @param {import('express').NextFunction} next
 */
async function getChatHistory(req, res, next) {
  try {
    const { userId, phoneNumber, limit = 50, offset = 0 } = req.query;
    
    if (!userId && !phoneNumber) {
      return res.status(400).json({
        success: false,
        message: 'Either userId or phoneNumber is required'
      });
    }

    const history = await chatbotService.getChatHistory(userId, phoneNumber, limit, offset);
    
    return res.status(200).json({
      success: true,
      data: history
    });
  } catch (error) {
    logger.error('Error getting chat history:', error);
    next(error);
  }
}

module.exports = {
  handleMessage,
  getChatHistory
};
