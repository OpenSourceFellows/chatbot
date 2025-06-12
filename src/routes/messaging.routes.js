const express = require('express')
const messagingController = require('../controllers')

const router = express.Router()
router.post('/webhook/incoming-message', messagingController.handleIncomingMessage)

module.exports = router;

router.get('/', (req, res) => {
  res.send('📨 Messaging API is working');
});

module.exports = router;
