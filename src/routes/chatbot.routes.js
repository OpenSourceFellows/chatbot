const express = require('express');
const { chatbotController } = require('../controllers');
const validate = require('../middlewares/validate');
const { chatbotValidations } = require('../validations');

const router = express.Router();

// Handle incoming messages
router.post('/message', validate(chatbotValidations.sendMessage), chatbotController.handleMessage);

// Get chat history
router.get('/history', validate(chatbotValidations.getHistory), chatbotController.getChatHistory);

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Chatbot service is running',
    timestamp: new Date().toISOString()
  });
});

module.exports = router;