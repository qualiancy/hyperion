/*!
 * Hyperion - Application Prototype (Browser)
 * Copyright(c) 2012 Jake Luer <jake@qualiancy.com>
 * MIT Licensed
 */

/*!
 * External module dependencies
 */

var debug = require('sherlock')('hyperion:app')
  , EventEmitter = require('drip').EnhancedEmitter
  , extend = require('tea-extend')
  , facet = require('facet')
  , Router = require('hyperion-router').Router;

var ENV = window.ENV || 'development';

/*!
 * Internal dependencies
 */

var middleware = require('./middleware');

/*!
 * Hyperion application
 */

var app = exports = module.exports = {};

/*!
 * Bind facet getters/setters
 */

facet(app);

app.init = function (name, browser) {
  // turn app into event emitter
  extend(this, EventEmitter.prototype);
  EventEmitter.call(this, { delimeter: '::' });

  // default settings
  name = name || 'application';
  this.set('name', name);
  this.set('env', ENV);

  // import some helios tools
  this.browser = browser;
  this.redirect = browser.redirect;

  // default properties
  this.router = new Router();
  this.stack = [];


  // default middleware
  this.use(middleware.init(this));
};

/**
 * ### .use ([route,] fn)
 *
 * @param {String} route (optional)]
 * @param {Function} handler
 * @name use
 * @api public
 */


app.use = function (route, fn) {
  if (1 === arguments.length) {
    fn = route;
    route = '/';
  }

  if (fn.handle && 'function' === typeof fn.handle) {
    fn = fn.handle;
  }

  this.stack.push({ route: route, handle: fn });
  return this;
};

/**
 * ### .configure ([env,] fn)
 *
 * Run certain function only if `app.get('env')` matches
 * the specified env. `app.get('env')` defaults to the
 * current `process.env.NODE_ENV` or `development`.
 *
 *     app.configure('development', function () {
 *       // ...
 *     });
 *
 * @param {String} environment to check (optional, multiple)
 * @param {Function} function execute if match
 * @returns {app} for chaining
 * @name configure
 * @api public
 */

app.configure = function () {
  var args = [].slice.call(arguments)
    , fn = args.pop()
    , env = this.get('env');

  if (!args.length || ~args.indexOf(env)) {
    fn.call(this);
  }

  return this;
};

app.handle = function (ctx, out) {
  debug('[handle] %s', ctx.url);
  console.log(this.router);
  this.router.dispatch(ctx, function (err) {
    if ('function' === typeof out) return out();
  });
};
