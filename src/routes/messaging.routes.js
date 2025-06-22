const express = require('express');
const messagingController = require('../controllers');

const router = express.Router();

router.post('/webhook/incoming-message', messagingController.handleIncomingMessage);

router.get('/', (req, res) => {
  res.send('📨 Messaging API is working');
});

module.exports = router;
