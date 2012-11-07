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
 * ### .status (code)
 *
 * Quickly set the status of the response.
 *
 * @param {Number} code
 * @returns {this} for chaining
 * @name status
 * @api public
 */

res.status = function (code) {
  this.statusCode = code;
  return this;
};
