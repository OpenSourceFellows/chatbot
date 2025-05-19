const express = require('express');
const router = express.Router();
const { chatbotValidation } = require('../validations');
const validate = require('../middlewares/validate');
const { chatbotController } = require('../controllers');
router.get('/chatbot', chatbotController);


module.exports = router;
