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

var commonMiddleware = require('./middleware')
  , nodeMiddleware = require('./node/middleware')
  , proto = require('./node/proto')
  , request = require('./node/request')
  , response = require('./node/response');

/*!
 * Primary exports
 */

exports = module.exports = createApplication;

/*!
 * Module version
 */

exports.version = require('./version');

/*!
 * Extend with common middleware
 */

extend(exports, commonMiddleware);

/*!
 * Extend with node middleware
 */

extend(exports, nodeMiddleware);

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
