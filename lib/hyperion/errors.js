/*!
 * Hyperion - HttpError constructor
 * Copyright(c) 2012 Jake Luer <jake@qualiancy.com>
 * MIT Licensed
 */

/*!
 * External module dependencies
 */

var dragonfly = require('dragonfly');

/*!
 * Constants
 */

var STATUS_CODES = require('http').STATUS_CODES
  , CODES = Object.keys(STATUS_CODES);

/*!
 * Primary Exports
 */

var exports = module.exports = dragonfly('HttpError');

/*!
 * Register all error codes with dragonfly
 */

CODES.forEach(function (code) {
  var msg = STATUS_CODES[code]
    , humanize = errorHumanize(msg)
    , type = errorType(msg);

  exports.register(humanize, {
      status: '' + code
    , message: msg
    , type: type
  });
});

/*!
 * Humanize the error message to use as the dragonfly
 * reference key.
 *
 * - all lower case
 * - removed special characters (ie: -)
 *
 * `Request Time-out == request timeout`
 *
 * @param {String} message
 * @return {String} humanized message
 * @api private
 */

function errorHumanize (msg) {
  return msg
    .split(/\s+/)
    .map(function (word) {
      return word.replace(/\W+/, '');
    })
    .join(' ')
    .toLowerCase();
}

/*!
 * Convert the error message to a PascalCase case,
 * appending `Error` if needed.
 *
 * - PascalCase
 * - removes special characters
 * - removes spaces
 *
 * `Request Time-out == RequestTimeoutError`
 *
 * @param {String} message
 * @return {String} error type
 * @api private
 */

function errorType (msg) {
  msg = msg
    .split(/\s+/)
    .map(function (word) {
      return word.charAt(0).toUpperCase()
        + word.slice(1).toLowerCase();
    })
    .join('')
    .replace(/\W+/, '');

  return /Error$/.test(msg)
    ? msg
    : msg + 'Error';
}
