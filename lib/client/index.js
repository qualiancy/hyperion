/*!
 * Hyperion (Browser)
 * Copyright(c) 2012 Jake Luer <jake@qualiancy.com>
 * MIT Licensed
 */

/*!
 * External module dependencies
 */

var extend = require('tea-extend');
var helios = require('helios');

/*!
 * Internal Constructors
 */

var Context = require('./context');

/*!
 * Internal module dependencies
 */

var middleware = require('./middleware');
var proto = require('./proto');

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
  function app () { app.router.map().get.apply(app.router, arguments); };
  extend(app, proto);
  app.__hyperionVersion = exports.version;
  app.client = helios;
  app.context = Context;
  app.init(name, helios);
  helios(function (ctx) { app.handle(ctx); });
  return app;
};
