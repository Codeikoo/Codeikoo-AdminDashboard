/**
 * Convert a date object (Year, Month, Day) to ISO 8601 date format.
 *
 * @param dateObj - The date object containing year, month, and day.
 * @returns A string representing the date in ISO 8601 format.
 */
export function convertFromDateObjectToISO(dateObj: {
  year: number;
  month: number;
  day: number;
}): string {
  const { year, month, day } = dateObj;

  // Create a Date object and format it to ISO 8601
  const date = new Date(year, month - 1, day); // Month in JavaScript starts from 0, so subtract 1 from the month
  return date.toISOString(); // Returns the date in ISO 8601 format
}

/**
 * Convert an ISO 8601 date string to a date object containing year, month, and day.
 *
 * @param isoDate - The date string in ISO 8601 format.
 * @returns An object containing the year, month, and day.
 */
export function convertFromISOToDateObject(isoDate: string | Date): {
  year: number;
  month: number;
  day: number;
} {
  const date = new Date(isoDate);

  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1, // Month in JavaScript starts from 0, so add 1 to the month
    day: date.getDate(),
  };
}
