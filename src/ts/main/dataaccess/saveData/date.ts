function convertTwoDigits(dateItem: number) {
  return dateItem.toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });
}
function createTimeStamp(d: Date) {
  const str =
    d.getUTCFullYear().toString() +
    convertTwoDigits(d.getUTCMonth()) +
    convertTwoDigits(d.getUTCDate()) +
    convertTwoDigits(d.getUTCHours()) +
    convertTwoDigits(d.getUTCMinutes()) +
    convertTwoDigits(d.getUTCSeconds());
  return str;
}
export function timestampNow() {
  return createTimeStamp(new Date(Date.now()));
}
