const express = require('express');

const router = express.Router();
const { chatbotController } = require('../controllers');
const validate = require('../middlewares/validate');
const { chatbotValidation } = require('../validations');

router.get('/chatbot', chatbotController);

module.exports = router;
