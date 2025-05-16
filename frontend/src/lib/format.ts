/**
 * Format a date to a relative time string (e.g., "2 hours ago")
 * @param date The date to format (Date object or ISO string)
 * @returns A string describing the relative time
 */
export function formatRelativeTime(date: Date | string): string {
  const inputDate = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - inputDate.getTime()) / 1000);
  
  if (isNaN(diffInSeconds) || diffInSeconds < 0) {
    return 'Invalid date';
  }
  
  if (diffInSeconds < 60) {
    return diffInSeconds === 1 ? '1 second ago' : `${diffInSeconds} seconds ago`;
  }
  
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return diffInMinutes === 1 ? '1 minute ago' : `${diffInMinutes} minutes ago`;
  }
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return diffInHours === 1 ? '1 hour ago' : `${diffInHours} hours ago`;
  }
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) {
    return diffInDays === 1 ? '1 day ago' : `${diffInDays} days ago`;
  }
  
  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return diffInMonths === 1 ? '1 month ago' : `${diffInMonths} months ago`;
  }
  
  const diffInYears = Math.floor(diffInMonths / 12);
  return diffInYears === 1 ? '1 year ago' : `${diffInYears} years ago`;
}

/**
 * Format a date to a standard date string
 * @param date The date to format (Date object or ISO string)
 * @returns A formatted date string
 */
export function formatDateTime(date: Date | string): string {
  const inputDate = typeof date === 'string' ? new Date(date) : date;
  
  if (isNaN(inputDate.getTime())) {
    return 'Invalid date';
  }
  
  return inputDate.toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
}

/**
 * Format a number with proper units and precision
 * @param value The number to format
 * @param precision The number of decimal places (default: 2)
 * @param unit Optional unit to append (e.g., "°C", "W")
 * @returns A formatted string with the number and unit
 */
export function formatNumber(value: number, precision: number = 2, unit?: string): string {
  if (isNaN(value)) {
    return 'N/A';
  }
  
  const formattedValue = value.toFixed(precision);
  return unit ? `${formattedValue} ${unit}` : formattedValue;
}

/**
 * Convert a temperature value between Celsius and Fahrenheit
 * @param value The temperature value
 * @param from The source unit ('C' or 'F')
 * @param to The target unit ('C' or 'F')
 * @returns The converted temperature value
 */
export function convertTemperature(value: number, from: 'C' | 'F', to: 'C' | 'F'): number {
  if (from === to) {
    return value;
  }
  
  if (from === 'C' && to === 'F') {
    return (value * 9 / 5) + 32;
  }
  
  if (from === 'F' && to === 'C') {
    return (value - 32) * 5 / 9;
  }
  
  return value;
}
