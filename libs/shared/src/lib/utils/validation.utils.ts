/**
 * Validation utility functions
 */

/**
 * Checks if a value is empty (null, undefined, empty string, or empty array)
 * @param value - The value to check
 * @returns True if the value is empty
 */
export function isEmpty(value: unknown): boolean {
  if (value == null) return true;
  if (typeof value === 'string') return value.trim().length === 0;
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === 'object') return Object.keys(value).length === 0;
  return false;
}

/**
 * Validates an email address format
 * @param email - The email to validate
 * @returns True if the email is valid
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validates a Philippine mobile number format
 * @param phone - The phone number to validate
 * @returns True if the phone number is valid
 */
export function isValidPhilippineMobile(phone: string): boolean {
  // Accepts formats: 09123456789, +639123456789, 639123456789
  const phoneRegex = /^(\+?63|0)?9\d{9}$/;
  return phoneRegex.test(phone.replace(/\s|-/g, ''));
}

/**
 * Checks if a value is a valid number
 * @param value - The value to check
 * @returns True if the value is a valid number
 */
export function isNumeric(value: unknown): boolean {
  if (typeof value === 'number') return !isNaN(value) && isFinite(value);
  if (typeof value === 'string') return !isNaN(parseFloat(value)) && isFinite(parseFloat(value));
  return false;
}
