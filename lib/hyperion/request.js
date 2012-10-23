/*!
 * Hyperion - Request
 * Copyright(c) 2012 Jake Luer <jake@qualiancy.com>
 * MIT Licensed
 */

var http = require('http')
  , uuid = require('pauli').uuid;

var req = exports = module.exports = {
  __proto__: http.IncomingMessage.prototype
};

Object.defineProperty(req, 'id',
  { get: function () {
      if (this._id) return this._id;
      this._id = this.headers['x-request-id'] || uuid();
      return this._id;
    }
});
