const express = require('express');
const { messagingController } = require('../controllers');
const validate = require('../middlewares/validate');
const { incomingMessageValidation } = require('../validations');

const router = express.Router();

router.post('/webhook/incoming-message', validate(incomingMessageValidation), messagingController.handleIncomingMessage);

router.get('/', (req, res) => {
  res.send('📨 Messaging API is working');
});

module.exports = router;
