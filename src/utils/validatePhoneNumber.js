/**
 * @param {String} value 
 * @param {import('joi').CustomValidator} helpers 
 * @returns {import('joi').ErrorReport|String}
 */
function validatePhoneNumber(value, helpers) {
  // Must be a string
  if (typeof value !== 'string') {
    return helpers.error('any.invalid');
  }
  // Must start with +1 followed by exactly 10 digits (US/Canada NANP format)
  const phoneRegex = /^\+1\d{10}$/;

  if (!phoneRegex.test(value)) {
    return helpers.error('any.invalid');
  }

  return value;
};

module.exports = validatePhoneNumber;

