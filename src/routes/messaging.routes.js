const express = require('express');
const messagingController = require('../controllers');
const validate = require('../middlewares/validate');
const twilioIncomingMessageValidation = require('../validations/twilio/incoming.message.validation');

const router = express.Router();

router.post('/webhook/incoming-message', validate(twilioIncomingMessageValidation), messagingController.handleIncomingMessage);

router.get('/', (req, res) => {
  res.send('📨 Messaging API is working');
});

module.exports = router;
