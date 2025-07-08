const joi = require('joi ');

/**
 * 
 * @param {String} value 
 * @param {import('joi').CustomValidator} helpers 
 * @returns {import('joi').ErrorReport|String}
 */
function validatePhoneNumber(value, helpers) {
  // Must start with + and have 10-15 digits after
  const phoneRegex = /^\+[1-9]\d{1,14}$/;
 
  if (!phoneRegex.test(value)) {
    return helpers.error('any.invalid');
  }
  
  return value;
};

/**
 * 
 * @param {String} value 
 * @param {import('joi').CustomHelpers} helpers 
 * @returns {import('joi').ErrorReport|String}
 */
function validateSafeString(value, helpers) {
  // Check for common SQL injection patterns
  const dangerousPatterns = [
    /('|(\\?')|(;|\\?;))/i,  // Single quotes and semicolons
    /--(\\s|$)/i,            // SQL comments
    /\b(DROP|DELETE|INSERT|UPDATE|SELECT|UNION|CREATE|ALTER|EXEC|EXECUTE)\b/i, // SQL keywords
    /<script/i,              // Basic XSS
    /javascript:/i           // JavaScript protocol
  ];
  
  for (const pattern of dangerousPatterns) {
    if (pattern.test(value)) {
      return helpers.error('string.unsafe');
    }
  }
  
  return value;
};

// Twilio SMS payload validation schema
const twilioIncomingMessageSchema = joi.object({
  // Required fields
  Body: joi.string()
    .required()
    .min(1) // Ensure not empty
    .max(1600) // SMS character limit
    .custom(validateSafeString, 'Safe string validation')
    .messages({
      'any.required': 'Body is required',
      'string.empty': 'Body cannot be empty',
      'string.unsafe': 'Body contains potentially dangerous content',
      'string.max': 'Body exceeds maximum SMS length'
    }),

  From: joi.string()
    .required()
    .custom(validatePhoneNumber, 'Phone number validation')
    .messages({
      'any.required': 'From phone number is required',
      'any.invalid': 'From must be a valid phone number starting with + followed by country code and number'
    }),

  To: joi.string()
    .required()
    .custom(validatePhoneNumber, 'Phone number validation')
    .messages({
      'any.required': 'To phone number is required',
      'any.invalid': 'To must be a valid phone number starting with + followed by country code and number'
    }),

  // Media validation - only text messages supported
  NumMedia: joi.string()
    .valid('0')
    .required()
    .messages({
      'any.required': 'NumMedia is required',
      'any.only': 'Only text messages are supported (NumMedia must be 0)'
    }),

  // Required Twilio fields
  MessageSid: joi.string()
    .pattern(/^SM[a-f0-9]{32}$/i)
    .required()
    .messages({
      'string.pattern.base': 'MessageSid must be a valid Twilio Message SID'
    }),

  AccountSid: joi.string()
    .pattern(/^AC[a-f0-9]{32}$/i)
    .required()
    .messages({
      'string.pattern.base': 'AccountSid must be a valid Twilio Account SID'
    }),

  SmsMessageSid: joi.string()
    .pattern(/^SM[a-f0-9]{32}$/i)
    .required()
    .messages({
      'string.pattern.base': 'SmsMessageSid must be a valid Twilio SMS Message SID'
    }),

  SmsSid: joi.string()
    .pattern(/^SM[a-f0-9]{32}$/i)
    .required()
    .messages({
      'string.pattern.base': 'SmsSid must be a valid Twilio SMS SID'
    }),

  SmsStatus: joi.string()
    .valid('received', 'sending', 'sent', 'failed', 'delivered', 'undelivered', 'queued')
    .required()
    .messages({
      'any.only': 'SmsStatus must be a valid Twilio SMS status'
    }),

  // Optional location fields
  ToCountry: joi.string().optional().allow(''),
  ToState: joi.string().optional().allow(''),
  ToCity: joi.string().optional().allow(''),
  ToZip: joi.string().optional().allow(''),
  FromCountry: joi.string().optional().allow(''),
  FromState: joi.string().optional().allow(''),
  FromCity: joi.string().optional().allow(''),
  FromZip: joi.string().optional().allow(''),

  // Other Twilio fields
  NumSegments: joi.string()
    .pattern(/^\d+$/)
    .optional()
    .messages({
      'string.pattern.base': 'NumSegments must be a numeric string'
    }),

  ApiVersion: joi.string()
    .pattern(/^\d{4}-\d{2}-\d{2}$/)
    .optional()
    .messages({
      'string.pattern.base': 'ApiVersion must be in YYYY-MM-DD format'
    })
})
  .unknown(false) // Reject any additional fields not defined in schema
  .messages({
    'object.unknown': 'Unknown field "{#label}" is not allowed'
  });

module.exports = twilioIncomingMessageSchema;