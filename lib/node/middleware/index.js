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

var common = require('../../middleware');

/*!
 * Primary exports
 */

var exports = module.exports = {};

/*!
 * Extend exports with common
 */

extend(exports, common);

/*!
 * Include browser-only middleware
 */

exports.init = require('./init');
exports.poweredBy = require('./poweredBy');
