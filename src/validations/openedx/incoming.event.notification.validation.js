const joi = require('joi');

// Define specific schemas later — here's a placeholder
// https://docs.openedx.org/projects/openedx-events/en/latest/how-tos/create-a-new-event.html
const CourseEnrollmentSchema = joi.object({
  user_id: joi.string().required(),
  course_id: joi.string().required(),
  mode: joi.string().valid('audit', 'honor', 'verified', 'professional').required(),
});

const PlaceholderEventSchema = joi.object().unknown(true); // For now, accept any shape

/**
 * See below for example JSON response
 * https://github.com/openedx/event-routing-backends/blob/master/event_routing_backends/processors/tests/fixtures/current/edx.forum.response.created.json
 */
const OpenEdxEventSchema = joi.object({
  event_type: joi.string().required(), // e.g., 'event'
  event_name: joi.string().required(), // e.g., 'org.openedx.learning.course.enrollment.registered.v1'
  event_source: joi.string().required(), // e.g., 'openedx.learning'
  event_time: joi.string().isoDate().required(), // ISO8601
  data: joi.alternatives().try(
    CourseEnrollmentSchema, // You can keep adding here
    PlaceholderEventSchema // Fallback until more types are defined
  ).required(),
  context: joi.object({
    user_id: joi.string().allow(null),
    username: joi.string().allow(null),
    course_id: joi.string().allow(null),
    ip: joi.string().ip({ version: ['ipv4', 'ipv6'] }).allow(null)
  }).unknown(true),
  metadata: joi.object().unknown(true).optional()
});

module.exports = OpenEdxEventSchema;

