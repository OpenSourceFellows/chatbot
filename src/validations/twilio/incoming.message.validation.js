const Joi = require('joi');

const twilioIncomingMessageSchema = Joi.object({
  Body: Joi.string().required(),
  From: Joi.string().required(),
  To: Joi.string().required(),
  MessageSid: Joi.string().required(),
  AccountSid: Joi.string().required(),
  NumMedia: Joi.string().optional(),
  MediaUrl0: Joi.string().uri().optional(),
  FromCity: Joi.string().optional(),
  FromState: Joi.string().optional(),
  FromCountry: Joi.string().optional(),
  ToCity: Joi.string().optional(),
  ToState: Joi.string().optional(),
  ToCountry: Joi.string().optional(),
});

module.exports = twilioIncomingMessageSchema;