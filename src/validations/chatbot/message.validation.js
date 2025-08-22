const Joi = require('joi');

const sendMessage = {
  body: Joi.object().keys({
    message: Joi.string().required().min(1).max(1000),
    phoneNumber: Joi.string().optional(),
    userId: Joi.string().uuid().optional(),
  }),
};

const getHistory = {
  query: Joi.object().keys({
    userId: Joi.string().uuid().optional(),
    phoneNumber: Joi.string().optional(),
    limit: Joi.number().integer().min(1).max(100).default(50),
    offset: Joi.number().integer().min(0).default(0),
  }),
};

module.exports = {
  sendMessage,
  getHistory,
};
