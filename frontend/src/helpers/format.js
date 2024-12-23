/**
 * Formats a date into a human-readable string based on the provided locale and options.
 *
 * @param {string|Date} dateToFormat - The date to be formatted. Can be a string or a Date object.
 * @param {string} [locale='en-US'] - The locale to use for formatting (e.g., 'en-US', 'fr-FR').
 * @param {Object} [options={ year: 'numeric', month: 'long', day: 'numeric' }] - Formatting options.
 * @returns {string} - The formatted date string, or a default message if the date is invalid.
 */
export const formatDate = (
  dateToFormat,
  locale = 'en-US',
  options = { year: 'numeric', month: 'long', day: 'numeric' }
) => {
  // Ensure the input is a valid Date
  const date = new Date(dateToFormat.trim());

  if (isNaN(date.getTime())) {
    console.error('Invalid date detected:', dateToFormat);
    return 'Invalid Date';
  }

  // Format using Intl.DateTimeFormat
  return new Intl.DateTimeFormat(locale, options).format(date);
};
