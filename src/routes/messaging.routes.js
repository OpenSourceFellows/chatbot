const express = require('express')
const router = express.Router()
const logger = require('../config/logger')
const { handleIncomingMessage } = require('../services/messaging/incoming.messages.service')


router.post('/webhook/incoming-message', handleIncomingMessage)

router.get('/', (req, res) => {
  res.send('📨 Messaging API is working');
});

module.exports = router;
