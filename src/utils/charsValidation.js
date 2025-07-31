/**
 * @description Validates a string for NULL characters and special characters
 * @param {string} str - The string to validate
 * @returns {boolean} - true if string is safe, false if it contains dangerous characters
 */

export function isInputSafe(str) {
  // Check for empty string, empty strings are considered safe
  if (!str) return true;
  
  // Check for NULL characters
  if (str.includes('\0') || str.includes('%00')) {
    return false;
  }
  
  return true;
}

// Prevents special characters that could be used for attacks such as XSS
export function preventSpecialChars(e) {
  if(/[<>/?+={};#$%&*()`~\\]/.test(e.key)){
    e.preventDefault();
  }
}

// Prevents nul characters from being entered into input fields
export function preventNullChar(e) {
  if (e.key === '\0' || e.key === '%00') {
    e.preventDefault();
  }
}

// Prevents search box input special characters that could be used for attacks such as XSS
export function preventSearchSpecialChars(e) {
  if(/[<>?+={};#$%*()`~\\]/.test(e.key)){
    e.preventDefault();
  }
}
