/*!
 * Hyperion - Response
 * Copyright(c) 2012 Jake Luer <jake@qualiancy.com>
 * MIT Licensed
 */

var http = require('http');

var res = exports = module.exports = {
  __proto__: http.ServerResponse.prototype
};

/**
 * ### .get (key)
 *
 * Shorthand to get a value of a header for
 * this response.
 *
 * @param {String} header key
 * @return {String} header value
 * @name get
 * @api public
 */

res.get = function (key) {
  return this.getHeader(key);
};

/**
 * ### .set (key[, value])
 *
 * Shorthand to set a header `key` to `value`.
 * Can also pass an object to set multiple values
 * at once.
 *
 * @param {String|Object} header key or object
 * @param {String} header value
 * @return {ServerResponse} for chaining
 * @name set
 * @api public
 */

res.set = function (key, value) {
  if (arguments.length === 1) {
    for (var name in key) {
      this.setHeader(name, '' + key[name]);
    }
  } else {
    this.setHeader(key, '' + value);
  }
  return this;
};

/**
 * ### .status (code)
 *
 * Shorthand to set the status of the response.
 *
 * @param {Number} code
 * @return {ServerResponse} for chaining
 * @name status
 * @api public
 */

res.status = function (code) {
  this.statusCode = code;
  return this;
};
