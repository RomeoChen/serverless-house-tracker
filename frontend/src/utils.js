export function convertDate(dateWithTime) {
  return dateWithTime.split('T')[0].replace('-', '\n');
}
