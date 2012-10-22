/*!
 * Hyperion - Application Prototype
 * Copyright(c) 2012 Jake Luer <jake@qualiancy.com>
 * MIT Licensed
 */

/*!
 * External module dependancies
 */

var Drip = require('drip')
  , facet = require('facet')
  , tea = require('tea');

/*!
 * Constants
 */

var ENV = process.env.NODE_ENV || 'development';

/*!
 * Primary exports
 */

exports = module.exports = {};

/*!
 * Bind facet getters/setters
 */

facet.bind(exports);

/**
 * ### .init ()
 *
 * Initialize the application prototype.
 *
 * @name init
 * @api public
 */

exports.init = function () {
  // turn app into event emitter
  tea.merge(this, Drip.prototype);
  Drip.call(this, { delimeter: '::' });

  // default settings
  this.set('env', ENV);
};

/**
 * ### .use ([route,] fn)
 *
 * @param {String} route (optional)]
 * @param {Function} handler
 * @name use
 * @api public
 */

exports.use = function () {

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

exports.configure = function () {
  var args = [].slice.call(arguments)
    , fn = args.pop()
    , node_env = this.get('env');

  if (!args.length || ~args.indexOf(node_env)) {
    fn.call(this);
  }

  return this;
};

/**
 * ### .handle (req, res)
 *
 * Handle an http request.
 *
 * @param {Request}
 * @param {Response}
 * @name handle
 * @api public
 */

exports.handle = function (req, res) {

};
