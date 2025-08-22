const Joi = require('joi');

const openedXEventSchema = Joi.object({
  event_type: Joi.string().required(),
  event_id: Joi.string().required(),
  timestamp: Joi.string().isoDate().required(),
  username: Joi.string().optional(),
  user_id: Joi.string().optional(),
  course_id: Joi.string().optional(),
  org_id: Joi.string().optional(),
  event: Joi.object().required(),
  context: Joi.object().optional(),
  session_id: Joi.string().optional(),
  ip: Joi.string().ip().optional(),
  agent: Joi.string().optional(),
  host: Joi.string().optional(),
  referer: Joi.string().uri().optional(),
  accept_language: Joi.string().optional(),
  name: Joi.string().optional(),
  event_source: Joi.string().optional(),
  page: Joi.string().optional(),
  time: Joi.string().isoDate().optional(),
  page_name: Joi.string().optional(),
  event: Joi.object().required(),
});

module.exports = openedXEventSchema;

