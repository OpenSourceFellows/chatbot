const express = require('express')
const messagingController = require('../controllers')

const router = express.Router()
router.post('/webhook/incoming-message', messagingController.handleIncomingMessage)

module.exports = router;

