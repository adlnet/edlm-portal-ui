import { isInputSafe, preventNullChar, preventSpecialChars } from '@/utils/charsValidation';

describe('charsValidation', () => {
  const mockPreventDefault = jest.fn();
  
  beforeEach(() => {
    mockPreventDefault.mockClear();
  });

  it('should prevent default for special characters', () => {
    const specialChars = ['<', '>', '/', '?', '+', '=', '{', '}', ';', '#', '$', '%', '&', '*', '(', ')', '`', '~', '\\'];
    
    for (const char of specialChars) {
      const mockEvent = { key: char, preventDefault: mockPreventDefault };
      preventSpecialChars(mockEvent);
      expect(mockPreventDefault).toHaveBeenCalled();
      mockPreventDefault.mockClear();
    }
  });

  it('should prevent default for NUL characters', () => {
    const nullChars = ['\0', '%00'];
    
    for (const char of nullChars) {
      const mockEvent = { key: char, preventDefault: mockPreventDefault };
      preventNullChar(mockEvent);
      expect(mockPreventDefault).toHaveBeenCalled();
      mockPreventDefault.mockClear();
    }
  });

  it('should not prevent default for safe characters', () => {
    const safeChars = ['a', 'Z', '0', '!'];
    
    for (const char of safeChars) {
      const mockEvent = { key: char, preventDefault: mockPreventDefault };
      preventSpecialChars(mockEvent);
      expect(mockPreventDefault).not.toHaveBeenCalled();
    }
  });

  it('should return true for empty strings', () => {
    expect(isInputSafe('')).toBe(true);
  });

  it('should return true for strings with safe characters', () => {
    expect(isInputSafe('Eric')).toBe(true);
    expect(isInputSafe('Test123456')).toBe(true);
    expect(isInputSafe('777Fun')).toBe(true);
  });

  it('should return false for strings containing NULL chars', () => {
    expect(isInputSafe('Test\0Hello')).toBe(false);
    expect(isInputSafe('Ohhhh%00wow')).toBe(false);
  });
});