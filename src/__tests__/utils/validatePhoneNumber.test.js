const validatePhoneNumber = require('../../utils/validatePhoneNumber');

describe('validatePhoneNumber', () => {
  let mockHelpers;

  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
    
    // Mock Joi helpers
    mockHelpers = {
      error: jest.fn((code) => ({ code, message: `Validation error: ${code}` }))
    };
  });

  describe('Valid phone numbers', () => {
    it('should accept valid US/Canada phone numbers with exactly 10 digits after +1', () => {
      const validNumbers = [
        '+12345678901',
        '+15551234567',
        '+19876543210',
        '+11234567890'
      ];

      validNumbers.forEach(number => {
        const result = validatePhoneNumber(number, mockHelpers);

        expect(result).toBe(number);
        expect(mockHelpers.error).not.toHaveBeenCalled();
      });
    });

    it('should reject phone numbers with less than or more than 10 digits after +1', () => {
      const invalidNumbers = [
        '+123456789',    // 9 digits
        '+123456789012', // 12 digits
        '+1',            // only +1
        '+12',           // only +1 and 1 digit
        '+123',          // only +1 and 2 digits
        '+1234',         // only +1 and 3 digits
        '+12345',        // only +1 and 4 digits
        '+123456',       // only +1 and 5 digits
        '+1234567',      // only +1 and 6 digits
        '+12345678',     // only +1 and 7 digits
        '+123456789'     // only +1 and 9 digits
      ];

      invalidNumbers.forEach(number => {
        const result = validatePhoneNumber(number, mockHelpers);

        expect(result).toEqual({ code: 'any.invalid', message: 'Validation error: any.invalid' });
        expect(mockHelpers.error).toHaveBeenCalledWith('any.invalid');
      });
    });
  });

  describe('Invalid phone numbers', () => {
    it('should reject phone numbers that do not start with +', () => {
      const invalidNumbers = [
        '1234567890',
        '1555123456',
        '1987654321',
        '1123456789'
      ];

      invalidNumbers.forEach(number => {
        const result = validatePhoneNumber(number, mockHelpers);

        expect(result).toEqual({ code: 'any.invalid', message: 'Validation error: any.invalid' });
        expect(mockHelpers.error).toHaveBeenCalledWith('any.invalid');
      });
    });

    it('should reject phone numbers that do not start with +1', () => {
      const invalidNumbers = [
        '+21234567890',  // +2
        '+31234567890',  // +3
        '+41234567890',  // +4
        '+51234567890',  // +5
        '+61234567890',  // +6
        '+71234567890',  // +7
        '+81234567890',  // +8
        '+91234567890'   // +9
      ];

      invalidNumbers.forEach(number => {
        const result = validatePhoneNumber(number, mockHelpers);

        expect(result).toEqual({ code: 'any.invalid', message: 'Validation error: any.invalid' });
        expect(mockHelpers.error).toHaveBeenCalledWith('any.invalid');
      });
    });

    it('should reject phone numbers with non-digit characters after +1', () => {
      const invalidNumbers = [
        '+1a23456789',
        '+1-234-567-8900',
        '+1 (234) 567-8900',
        '+1.234.567.8900',
        '+1_234_567_8900',
        '+1 234 567 8900'
      ];

      invalidNumbers.forEach(number => {
        const result = validatePhoneNumber(number, mockHelpers);

        expect(result).toEqual({ code: 'any.invalid', message: 'Validation error: any.invalid' });
        expect(mockHelpers.error).toHaveBeenCalledWith('any.invalid');
      });
    });

    it('should reject phone numbers that are too short', () => {
      const invalidNumbers = [
        '+1',            // Only +1, no digits
        '+',             // Only +
        ''               // Empty string
      ];

      invalidNumbers.forEach(number => {
        const result = validatePhoneNumber(number, mockHelpers);

        expect(result).toEqual({ code: 'any.invalid', message: 'Validation error: any.invalid' });
        expect(mockHelpers.error).toHaveBeenCalledWith('any.invalid');
      });
    });
  });

  describe('Edge cases', () => {
    it('should handle null and undefined values', () => {
      const invalidValues = [null, undefined];

      invalidValues.forEach(value => {
        const result = validatePhoneNumber(value, mockHelpers);

        expect(result).toEqual({ code: 'any.invalid', message: 'Validation error: any.invalid' });
        expect(mockHelpers.error).toHaveBeenCalledWith('any.invalid');
      });
    });

    it('should handle non-string values', () => {
      const invalidValues = [123, {}, [], true, false];

      invalidValues.forEach(value => {
        const result = validatePhoneNumber(value, mockHelpers);

        expect(result).toEqual({ code: 'any.invalid', message: 'Validation error: any.invalid' });
        expect(mockHelpers.error).toHaveBeenCalledWith('any.invalid');
      });
    });

    it('should handle strings with leading/trailing whitespace', () => {
      const invalidNumbers = [
        ' +1234567890',
        '+1234567890 ',
        ' +1234567890 ',
        '\t+1234567890',
        '+1234567890\n'
      ];

      invalidNumbers.forEach(number => {
        const result = validatePhoneNumber(number, mockHelpers);

        expect(result).toEqual({ code: 'any.invalid', message: 'Validation error: any.invalid' });
        expect(mockHelpers.error).toHaveBeenCalledWith('any.invalid');
      });
    });
  });

  describe('Function behavior', () => {
    it('should return the original value for valid phone numbers', () => {
      const validNumber = '+12345678901';
      const result = validatePhoneNumber(validNumber, mockHelpers);
      
      expect(result).toBe(validNumber);
      expect(typeof result).toBe('string');
    });

    it('should call helpers.error with correct error code for invalid numbers', () => {
      const invalidNumber = '1234567890';

      validatePhoneNumber(invalidNumber, mockHelpers);
      
      expect(mockHelpers.error).toHaveBeenCalledTimes(1);
      expect(mockHelpers.error).toHaveBeenCalledWith('any.invalid');
    });

    it('should return error object from helpers.error for invalid numbers', () => {
      const invalidNumber = '1234567890';
      const result = validatePhoneNumber(invalidNumber, mockHelpers);
      
      expect(result).toEqual({ code: 'any.invalid', message: 'Validation error: any.invalid' });
    });
  });
}); 