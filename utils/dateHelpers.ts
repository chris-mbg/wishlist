export function convertDateToLocaleString(date: Date | string) {
  const newDate = date instanceof Date ? date : new Date(date);
  return newDate.toLocaleDateString('sv-SE', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
