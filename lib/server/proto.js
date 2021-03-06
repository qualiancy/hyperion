/*!
 * Hyperion - Application Prototype
 * Copyright(c) 2012 Jake Luer <jake@qualiancy.com>
 * MIT Licensed
 */

/*!
 * Core dependencies
 */

var parse = require('url').parse;

/*!
 * External module dependencies
 */

var dragonfly = require('dragonfly')
  , drip = require('drip')
  , extend = require('tea-extend')
  , facet = require('facet');

/*!
 * Internal dependencies
 */

var formats = require('./formats')
  , middleware = require('./middleware');

/*!
 * Constants
 */

var ENV = process.env.NODE_ENV || 'development';

/*!
 * Hyperion application
 */

var app = exports = module.exports = {};

/*!
 * Bind facet getters/setters
 */

facet(app);

/**
 * ### .init ()
 *
 * Initialize the application prototype.
 *
 * @param {String} application name *
 * @name init
 * @api public
 */

app.init = function (name) {
  // turn app into event emitter
  extend(this, drip.EnhancedEmitter.prototype);
  drip.EnhancedEmitter.call(this, { delimeter: '::' });

  // default settings
  name = name || 'application';
  this.set('name', name);
  this.set('env', ENV);

  // default properties
  this.stack = [];
  this.errors = dragonfly(''
    + name.charAt(0).toUpperCase()
    + name.slice(1).toLowerCase()
    + 'Error');

  // default formats
  this.formats = {
      'text/html': [ formats.html ]
    , 'text/plain': [ formats.text ]
    , 'application/json': [ formats.json ]
    , 'application/octet-stream': [ formats.buffer ]
  };

  this.enable('x-powered-by');

  // default middleware
  this.use(middleware.init(this));
  this.use(middleware.poweredBy(this));
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

/**
 * ### .format (type, fn)
 *
 * Specify how to serialize and respond to a specific
 * type of object when using `res.send`. The format will
 * be selected based on the best fitting `req.header['accept']`
 * or default to `application/octet-stream`. This can be overwritten
 * by setting the content type manually using `res.type()`.
 *
 * @param {String} type
 * @param {Function} callback
 * @name format
 * @api public
 */

app.format = function (format, fn) {
  if (fn.handle && 'function' === typeof fn.handle) {
    fn = fn.handle;
  }

  // TODO: mime lookup
  var type = format
    , stack = this.formats[type];

  // so our defaults stay last
  stack.splice(stack.length - 1, 0, fn);
  return this;
};

/**
 * ### .error (key, config)
 *
 * Register a custom error.
 *
 * @param {String} key
 * @param {Object} default config values
 * @name error
 * @api public
 */

app.error = function (key, config) {
  this.errors.register(key, config || {});
  return this;
};

/**
 * ### .handle (req, res)
 *
 * Handle an http request.
 *
 * @param {Request}
 * @param {Response}
 * @param {Function} done (optional)
 * @name handle
 * @api public
 */

app.handle = function (req, res, done) {
  var self = this
    , stack = this.stack || []
    , url = parse(req.url);

  function errorHandle (err) {
    if (done) return done(err);
    // TODO: all wrong
    var accept = req.accepted[0].value
      , format = ~Object.keys(self.formats).indexOf(accept)
        ? self.formats[accept]
        : self.formats['application/octet-stream'];
    res.type(accept);
    format[0](req, res, err, function (err, body) {
      res.write(body);
      res.end();
    });
  }

  // TODO: move into iterate
  function notFound () {
    if (done) return done();
    var err = res.createError(404);
    errorHandle(err);
  }

  // TODO: self reflective
  function iterate (i) {
    var fn = stack[i];

    if (!fn) {
      return notFound();
    }

    if (url.pathname.indexOf(fn.route) !== 0) {
      return iterate(++i);
    }

    var originalUrl = req.url;

    if (fn.route !== '/') {
      req.url = req.url.substr(fn.route.length);
    }

    fn.handle(req, res, function next (err) {
      req.url = originalUrl;
      if (false == err) return;
      if (err) return errorHandle(err);
      iterate(++i);
    });
  }

  iterate(0);
};
