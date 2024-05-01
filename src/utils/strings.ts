/**
 * Lowercase the first letter of a string
 * @param str - String to lowercase
 * @returns - A string with the first letter in lowercase
 */
export function lcfirst(str: string): string {
  return str.charAt(0).toLowerCase() + str.slice(1);
}

/**
 * Capitalize the first letter of a string
 * @param str - String to capitalize
 * @returns - Capitalized string
 */
export function ucfirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
