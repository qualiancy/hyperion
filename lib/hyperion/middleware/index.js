/*!
 * Hyperion - Middlewares
 * Copyright(c) 2012 Jake Luer <jake@qualiancy.com>
 * MIT Licensed
 */

var fs = require('fs')
  , path = require('path');

/*!
 * Middleware placeholder
 */

var exports = module.exports = {};


/*!
 * Cycle througth this folder and provide getters
 * on the main exports for plugin.
 *
 * Ignore the current file and all non-javascript files,
 * if any.
 */

fs.readdirSync(__dirname).forEach(function (filename) {
  if (!/\.js$/.test(filename)) return;
  if (/index\.js$/.test(filename)) return;

  var name = path.basename(filename, '.js');

  function load () {
    return require('./' + name);
  }

  Object.defineProperty(exports, name, { get: load, enumerable: true });
});
