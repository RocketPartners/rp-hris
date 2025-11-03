/**
 * String utility functions
 */

/**
 * Capitalizes the first letter of a string
 * @param str - The string to capitalize
 * @returns The capitalized string
 */
export function capitalize(str: string): string {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * Converts a string to title case
 * @param str - The string to convert
 * @returns The title-cased string
 */
export function toTitleCase(str: string): string {
  if (!str) return '';
  return str
    .toLowerCase()
    .split(' ')
    .map(word => capitalize(word))
    .join(' ');
}

/**
 * Truncates a string to a specified length and adds ellipsis
 * @param str - The string to truncate
 * @param maxLength - Maximum length before truncation
 * @returns The truncated string
 */
export function truncate(str: string, maxLength: number): string {
  if (!str || str.length <= maxLength) return str;
  return str.slice(0, maxLength) + '...';
}

/**
 * Formats a full name from first and last name
 * @param firstName - The first name
 * @param lastName - The last name
 * @returns The formatted full name
 */
export function formatFullName(firstName: string, lastName: string): string {
  return [firstName, lastName].filter(Boolean).join(' ');
}
