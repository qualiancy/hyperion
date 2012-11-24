/*!
 * Hyperion
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

var proto = require('./hyperion/application')
  , request = require('./hyperion/request')
  , response = require('./hyperion/response');

/*!
 * Primary exports
 */

exports = module.exports = createApplication;

/*!
 * Module version
 */

exports.version = '0.0.0';

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
