const joi = require('joi');
const openedXEventSchema = require('../openedx/incoming.event.notification.validation');
const twilioIncomingMessageSchema = require('../twilio/incoming.message.validation');

const IncomingMessageSchema = joi.alternatives().try(twilioIncomingMessageSchema, openedXEventSchema);

module.exports = IncomingMessageSchema;