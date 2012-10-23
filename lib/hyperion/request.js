/*!
 * Hyperion - Request
 * Copyright(c) 2012 Jake Luer <jake@qualiancy.com>
 * MIT Licensed
 */

var http = require('http');

var req = exports = module.exports = {
  __proto__: http.IncomingMessage.prototype
};
