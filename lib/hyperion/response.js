/*!
 * Hyperion - Response
 * Copyright(c) 2012 Jake Luer <jake@qualiancy.com>
 * MIT Licensed
 */

/*!
 * External dependencies
 */

var http = require('http')
  , mime = require('mime')
  , tea = require('tea');

/*!
 * Internal dependencies
 */

var httpErrors = require('./errors');

/*!
 * Primary exports - ServerResponse
 */

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
  return this.getHeader(key.toLowerCase());
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

/**
 * ### .type (type)
 *
 * Shorthand to set the `content-type` header for
 * this response. If an extension or mime type key
 * is provided, it will be looked up.
 *
 * @param {String} mime type
 * @return {ServerResponse} for chaining
 * @name type
 * @api public
 */

res.type = function (type) {
  type = !~type.indexOf('/')
    ? mime.lookup(type)
    : type;

  return this.set('content-type', type);
};

/**
 * ### .error (key, props)
 *
 * @param {String} custom or http error key
 * @param {Object} error properties
 * @api public
 */

res.createError = function () {
  var key = arguments[0]
    , errors = 'number' !== typeof key && this.app.errors.has(key)
      ? this.app.errors
      : httpErrors
    , args = [].slice.call(arguments, 1)
    , ssf = arguments.callee
    , deref, err, proto;

  // lookup for status codes
  if ('number' === typeof key) {
    for (var name in errors.errors) {
      if (errors.errors[name].status === key) {
        proto = errors.errors[name];
        break;
      }
    }
  } else {
    proto = errors.errors[key];
  }

  // graceful non-key handle
  if (!proto) {
    throw new Error('Invalid error creation: ' + key);
  }

  // shallow clone the proto
  deref = tea.merge({}, proto);
  deref.arguments = args;

  // create the error
  err = new errors.proto(deref, ssf);
  return err;
};
