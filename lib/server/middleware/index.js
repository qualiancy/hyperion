/*!
 * Hyperion - Middleware (Node)
 * Copyright(c) 2012 Jake Luer <jake@qualiancy.com>
 * MIT Licensed
 */

/*!
 * External dependencies
 */

var extend = require('tea-extend');

/*!
 * Common middleware
 */

var common = require('../../common/middleware');

/*!
 * Primary exports
 */

var exports = module.exports = {};

/*!
 * Extend exports with common
 */

extend(exports, common);

/*!
 * Include node-only middleware
 */

exports.init = require('./init');
exports.static = require('./static');
exports.poweredBy = require('./poweredBy');
