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
 * Internal dependancies
 */

var middleware = require('./middleware');

/*!
 * Constants
 */

var ENV = process.env.NODE_ENV || 'development';

/*!
 * Primary app
 */

var app = exports = module.exports = {};

/*!
 * Bind facet getters/setters
 */

facet.bind(app);

/**
 * ### .init ()
 *
 * Initialize the application prototype.
 *
 * @name init
 * @api public
 */

app.init = function () {
  // turn app into event emitter
  tea.merge(this, Drip.prototype);
  Drip.call(this, { delimeter: '::' });

  // default properties
  this.stack = [];

  // default settings
  this.set('env', ENV);

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

app.use = function (fn) {
  this.stack.push(fn);
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

app.handle = function (req, res) {
  var self = this
    , stack = this.stack || []

  runStack.call(this, stack, [ req, res ], function (err) {
    console.log(req.testing);
    res.end('no match');
  });
};

function runStack (stack, args, cb) {
  var self = this
    , len = args.length;

  function iterate (i) {
    if (!stack[i]) return cb();
    args[len] = function next (err) {
      if (err) return cb(err);
      iterate(++i);
    };

    stack[i].apply(null, args);
  }

  iterate(0);
}
