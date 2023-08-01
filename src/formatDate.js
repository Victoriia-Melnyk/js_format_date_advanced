'use strict';

/**
 *   Time flies, standards change. Let's get rid of the routine of changing the
 * date format. Create a `formatDate` function that accepts the `date` string,
 * the old `fromFormat` array and the new `toFormat` array. Function returns
 * given date in new format.
 *   The function can change a separator, reorder the date parts of convert a
 * year from 4 digits to 2 digits and back.
 *   When converting from YYYY to YY just use 2 last digit (1997 -> 97).
 *   When converting from YY to YYYY use 20YY if YY < 30 and 19YY otherwise.
 *
 * Examples:
 *
 * formatDate(
 *   '2020-02-18',
 *   ['YYYY', 'MM', 'DD', '-'],
 *   ['YYYY', 'MM', 'DD', '.'],
 * ) // '2020.02.18'
 *
 * formatDate(
 *   '2020-02-18',
 *   ['YYYY', 'MM', 'DD', '-'],
 *   ['DD', 'MM', 'YYYY', '.'],
 * ) // '18.02.2020'
 *
 * formatDate(
 *   '18-02-2020',
 *   ['DD', 'MM', 'YYYY', '-'],
 *   ['DD', 'MM', 'YY', '/'],
 * ) // '18/02/20'
 *
 * formatDate(
 *   '20/02/18',
 *   ['YY', 'MM', 'DD', '/'],
 *   ['YYYY', 'MM', 'DD', '.'],
 * ) // '2020.02.18'
 *
 * formatDate(
 *   '97/02/18',
 *   ['YY', 'MM', 'DD', '/'],
 *   ['DD', 'MM', 'YYYY', '.'],
 * ) // '18.02.1997'
 *
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */

function formatDate(date, fromFormat, toFormat) {
  const dateArray = date.split(fromFormat[3]);
  const newSeparator = toFormat[3];
  const result = [];

  let day, month, year;

  for (let i = 0; i < fromFormat.length; i++) {
    if (fromFormat[i].includes('Y')) {
      year = dateArray[i];
    }

    if (fromFormat[i].includes('M')) {
      month = dateArray[i];
    }

    if (fromFormat[i].includes('D')) {
      day = dateArray[i];
    }
  }

  for (let j = 0; j < toFormat.length; j++) {
    if (toFormat[j] === 'DD') {
      result.push(day);
    }

    if (toFormat[j] === 'MM') {
      result.push(month);
    }

    if (toFormat[j].includes('Y')) {
      if (toFormat[j].length === year.length) {
        result.push(year);
      }

      if (toFormat[j].length < year.length) {
        result.push(year.slice(-2));
      }

      if (toFormat[j].length > year.length && year < 30) {
        result.push(20 + year);
      }

      if (toFormat[j].length > year.length && year >= 30) {
        result.push(19 + year);
      }
    }
  }

  return result.join(newSeparator);
}

module.exports = formatDate;
