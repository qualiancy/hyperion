/*!
 * Hyperion (Node.js)
 * Copyright(c) 2012 Jake Luer <jake@qualiancy.com>
 * MIT Licensed
 */

/*!
 * External module dependencies
 */

var extend = require('tea-extend');

/*!
 * Internal module dependencies
 */

var middleware = require('./middleware');
var proto = require('./proto');

/*!
 * Improved Request/Response
 */

var request = require('./request');
var response = require('./response');

/*!
 * Primary exports
 */

exports = module.exports = createApplication;

/*!
 * Module version
 */

exports.version = require('../common/version');

/*!
 * Extend with middleware
 */

extend(exports, middleware);

/**
 * Construct a hyperion application
 *
 * @returns {Function}
 * @api public
 */

function createApplication (name) {
  function app (req, res) { app.handle(req, res); };
  extend(app, proto);
  app.__hyperionVersion = exports.version;
  app.request = request;
  app.response = response;
  app.init(name);
  return app;
};
