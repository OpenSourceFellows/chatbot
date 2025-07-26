/**
 * @param {String} value 
 * @param {import('joi').CustomHelpers} helpers 
 * @returns {import('joi').ErrorReport|String}
 */
function validateSafeString(value, helpers) {
  // Check if value is a string
  if (typeof value !== 'string') {
    return helpers.error('string.unsafe');
  }

  // Check for common SQL injection and XSS patterns
  const dangerousPatterns = [
    /--/, // SQL comments: any occurrence of --
    // SQL keywords with other SQL syntax (e.g., SELECT ... FROM, DROP TABLE, etc.)
    /\b(SELECT|DROP|DELETE|INSERT|UPDATE|UNION|CREATE|ALTER|EXEC|EXECUTE)\b\s+.*\b(FROM|TABLE|INTO|SET|PROCEDURE|VALUES|WHERE|JOIN|ON|BY)\b/i,
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

module.exports = validateSafeString;