/**
 * Formats a numeric value into a localized currency string.
 * It provides a safe fallback for invalid numbers to prevent UI crashes.
 *
 * @param {number | null | undefined} value - The numeric amount to format.
 * @param {string} [currency='USD'] - The ISO 4217 currency code (e.g., 'USD', 'EUR').
 * @param {string} [locale='en-US'] - The BCP 47 language tag for localization.
 * @returns {string} The formatted currency string, or a fallback hyphen ('-') if the input is invalid.
 */
export function formatCurrency(value?: number | null, currency: string = "USD", locale: string = "en-US"): string {
  if (value === undefined || value === null || Number.isNaN(value)) {
    return "-";
  }

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(value);
}

/**
 * Formats a numeric fraction into a localized percentage string.
 *
 * @param {number | null | undefined} value - The numeric fraction to format (e.g., 0.15 for 15%).
 * @param {string} [locale='en-US'] - The BCP 47 language tag for localization.
 * @param {number} [maximumFractionDigits=2] - The maximum number of decimal places to display.
 * @returns {string} The formatted percentage string, or a fallback hyphen ('-') if the input is invalid.
 */
export function formatPercent(
  value?: number | null,
  locale: string = "en-US",
  maximumFractionDigits: number = 2
): string {
  if (value === undefined || value === null || Number.isNaN(value)) {
    return "-";
  }

  return new Intl.NumberFormat(locale, {
    style: "percent",
    maximumFractionDigits,
  }).format(value);
}

/**
 * Formats a standard number with thousand separators and decimal limits.
 * Ideal for metrics like mileage, quantities, or dimensions.
 *
 * @param {number | null | undefined} value - The number to format.
 * @param {string} [locale='en-US'] - The BCP 47 language tag for localization.
 * @param {number} [maximumFractionDigits=2] - The maximum number of decimal places to display.
 * @returns {string} The formatted number string, or a fallback hyphen ('-') if the input is invalid.
 */
export function formatNumber(
  value?: number | null,
  locale: string = "en-US",
  maximumFractionDigits: number = 2
): string {
  if (value === undefined || value === null || Number.isNaN(value)) {
    return "-";
  }

  return new Intl.NumberFormat(locale, {
    style: "decimal",
    maximumFractionDigits,
  }).format(value);
}
