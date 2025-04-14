// utils.js

/**
 * Generates a full URL based on a base path and query parameters.
 * @param {string} basePath - The base URL path.
 * @param {Object} [params={}] - Query parameters as a key-value object.
 * @returns {string} - The formatted URL.
 */
export function createPageUrl(basePath, params = {}) {
  const url = new URL(basePath, window.location.origin);
  Object.keys(params).forEach((key) =>
    url.searchParams.append(key, params[key])
  );
  return url.toString();
}

/**
 * Capitalizes the first letter of a string.
 * @param {string} str - The input string.
 * @returns {string} - The capitalized string.
 */
export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Debounces a function to prevent it from executing too frequently.
 * @param {Function} func - The function to debounce.
 * @param {number} delay - The debounce delay in milliseconds.
 * @returns {Function} - The debounced function.
 */
export function debounce(func, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
}
