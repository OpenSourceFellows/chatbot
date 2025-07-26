const validateSafeString = require('../../utils/validateSafeString');

describe('validateSafeString', () => {
  let mockHelpers;

  beforeEach(() => {
    // Mock Joi helpers
    mockHelpers = {
      error: jest.fn((code) => ({ code, message: `Validation error: ${code}` }))
    };
  });

  describe('Safe strings', () => {
    it('should accept normal text strings', () => {
      const safeStrings = [
        'Hello, world!',
        'This is a normal message',
        '1234567890',
        'Special characters: !@#$%^&*()',
        'Unicode: ñáéíóú',
        'Mixed case: Hello World',
        'Numbers and text: 123abc456def'
      ];

      safeStrings.forEach(str => {
        const result = validateSafeString(str, mockHelpers);

        expect(result).toBe(str);
        expect(mockHelpers.error).not.toHaveBeenCalled();
      });
    });

    it('should accept empty strings', () => {
      const result = validateSafeString('', mockHelpers);

      expect(result).toBe('');
      expect(mockHelpers.error).not.toHaveBeenCalled();
    });

    it('should accept strings with spaces and punctuation', () => {
      const safeStrings = [
        '   spaces   ',
        'multiple    spaces',
        'punctuation: . , ! ? ; : " \' ( ) [ ] { }',
        'newlines\nand\ttabs',
        'quotes: "double" and \'single\''
      ];

      safeStrings.forEach(str => {
        const result = validateSafeString(str, mockHelpers);

        expect(result).toBe(str);
        expect(mockHelpers.error).not.toHaveBeenCalled();
      });
    });
  });

  describe('SQL Injection patterns', () => {
    it('should allow strings with single quotes', () => {
      const safeStrings = [
        "O'Connor",
        "user's data",
        "don't do this",
        "it's dangerous",
        "can't validate"
      ];

      safeStrings.forEach(str => {
        const result = validateSafeString(str, mockHelpers);

        expect(result).toBe(str);
        expect(mockHelpers.error).not.toHaveBeenCalled();
      });
    });

    it('should allow strings with escaped single quotes', () => {
      const safeStrings = [
        "O\\'Connor",
        "user\\'s data",
        "don\\'t do this"
      ];

      safeStrings.forEach(str => {
        const result = validateSafeString(str, mockHelpers);

        expect(result).toBe(str);
        expect(mockHelpers.error).not.toHaveBeenCalled();
      });
    });

    it('should allow strings with semicolons', () => {
      const safeStrings = [
        'SELECT is a verb;',
        'multiple; statements; here;',
        'normal text; followed by semicolon'
      ];

      safeStrings.forEach(str => {
        const result = validateSafeString(str, mockHelpers);

        expect(result).toBe(str);
        expect(mockHelpers.error).not.toHaveBeenCalled();
      });
    });

    it('should reject strings with escaped semicolons', () => {
      const dangerousStrings = [
        'SELECT * FROM users\\;',
        'DROP TABLE users\\;'
      ];

      dangerousStrings.forEach(str => {
        const result = validateSafeString(str, mockHelpers);

        expect(result).toEqual({ code: 'string.unsafe', message: 'Validation error: string.unsafe' });
        expect(mockHelpers.error).toHaveBeenCalledWith('string.unsafe');
      });
    });

    it('should reject strings with SQL comments', () => {
      const dangerousStrings = [
        'SELECT * FROM users -- comment',
        'DROP TABLE users--',
        'normal text -- followed by comment',
        '-- start with comment',
        'text -- comment -- another comment'
      ];

      dangerousStrings.forEach(str => {
        const result = validateSafeString(str, mockHelpers);

        expect(result).toEqual({ code: 'string.unsafe', message: 'Validation error: string.unsafe' });
        expect(mockHelpers.error).toHaveBeenCalledWith('string.unsafe');
      });
    });

    it('should reject strings with SQL keywords and other SQL syntax', () => {
      const dangerousStrings = [
        'DROP TABLE users',
        'DELETE FROM users',
        'INSERT INTO users',
        'UPDATE users SET',
        'SELECT * FROM users',
        'UNION SELECT something FROM somewhere',
        'CREATE TABLE test',
        'ALTER TABLE test',
        'EXECUTE procedure'
      ];

      dangerousStrings.forEach(str => {
        const result = validateSafeString(str, mockHelpers);

        expect(result).toEqual({ code: 'string.unsafe', message: 'Validation error: string.unsafe' });
        expect(mockHelpers.error).toHaveBeenCalledWith('string.unsafe');
      });
    });

    it('should allow strings with SQL keywords in normal text', () => {
      const safeStrings = [
        'drop is a verb',
        'DELETE is a word',
        'insert is a verb',
        'update is a verb',
        'select is a verb',
        'union is a word',
        'create is a verb',
        'alter is a verb',
        'exec is short for execute',
        'execute is a word'
      ];

      safeStrings.forEach(str => {
        const result = validateSafeString(str, mockHelpers);

        expect(result).toBe(str);
        expect(mockHelpers.error).not.toHaveBeenCalled();
      });
    });
  });

  describe('XSS patterns', () => {
    it('should reject strings with script tags', () => {
      const dangerousStrings = [
        '<script>alert("xss")</script>',
        '<SCRIPT>alert("xss")</SCRIPT>',
        'normal text <script>alert("xss")</script>',
        '<script src="malicious.js"></script>',
        '<script>document.cookie</script>'
      ];

      dangerousStrings.forEach(str => {
        const result = validateSafeString(str, mockHelpers);

        expect(result).toEqual({ code: 'string.unsafe', message: 'Validation error: string.unsafe' });
        expect(mockHelpers.error).toHaveBeenCalledWith('string.unsafe');
      });
    });

    it('should reject strings with javascript protocol', () => {
      const dangerousStrings = [
        'javascript:alert("xss")',
        'JAVASCRIPT:alert("xss")',
        'normal text javascript:alert("xss")',
        'javascript:document.cookie',
        'javascript:void(0)'
      ];

      dangerousStrings.forEach(str => {
        const result = validateSafeString(str, mockHelpers);

        expect(result).toEqual({ code: 'string.unsafe', message: 'Validation error: string.unsafe' });
        expect(mockHelpers.error).toHaveBeenCalledWith('string.unsafe');
      });
    });
  });

  describe('Edge cases', () => {
    it('should handle null and undefined values', () => {
      const invalidValues = [null, undefined];

      invalidValues.forEach(value => {
        const result = validateSafeString(value, mockHelpers);

        expect(result).toEqual({ code: 'string.unsafe', message: 'Validation error: string.unsafe' });
        expect(mockHelpers.error).toHaveBeenCalledWith('string.unsafe');
      });
    });

    it('should handle non-string values', () => {
      const invalidValues = [123, {}, [], true, false];

      invalidValues.forEach(value => {
        const result = validateSafeString(value, mockHelpers);

        expect(result).toEqual({ code: 'string.unsafe', message: 'Validation error: string.unsafe' });
        expect(mockHelpers.error).toHaveBeenCalledWith('string.unsafe');
      });
    });

    it('should handle strings that contain safe parts of dangerous patterns', () => {
      const safeStrings = [
        'script is a word',
        'javascript is a programming language',
        'SELECT is a verb',
        'DROP is a verb',
        'INSERT is a verb',
        'UPDATE is a verb',
        'CREATE is a verb',
        'ALTER is a verb',
        'EXEC is short for execute',
        'UNION is a word'
      ];

      safeStrings.forEach(str => {
        const result = validateSafeString(str, mockHelpers);

        expect(result).toBe(str);
        expect(mockHelpers.error).not.toHaveBeenCalled();
      });
    });
  });

  describe('Function behavior', () => {
    it('should return the original value for safe strings', () => {
      const safeString = 'Hello, world!';
      const result = validateSafeString(safeString, mockHelpers);
      
      expect(result).toBe(safeString);
      expect(typeof result).toBe('string');
    });

    it('should call helpers.error with correct error code for dangerous strings', () => {
      const dangerousString = 'SELECT * FROM users';

      validateSafeString(dangerousString, mockHelpers);
      
      expect(mockHelpers.error).toHaveBeenCalledTimes(1);
      expect(mockHelpers.error).toHaveBeenCalledWith('string.unsafe');
    });

    it('should return error object from helpers.error for dangerous strings', () => {
      const dangerousString = 'SELECT * FROM users';
      const result = validateSafeString(dangerousString, mockHelpers);
      
      expect(result).toEqual({ code: 'string.unsafe', message: 'Validation error: string.unsafe' });
    });

    it('should detect the first dangerous pattern in a string', () => {
      const dangerousString = 'normal text <script>alert("xss")</script> more text';
      const result = validateSafeString(dangerousString, mockHelpers);
      
      expect(result).toEqual({ code: 'string.unsafe', message: 'Validation error: string.unsafe' });
      expect(mockHelpers.error).toHaveBeenCalledWith('string.unsafe');
    });
  });
}); 