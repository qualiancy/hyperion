/*!
 * Attach chai to global should
 */

global.chai = require('chai');
global.should = global.chai.should();

/*!
 * Chai Plugins
 */

global.chai.use(require('chai-spies'));
global.chai.use(require('chai-http'));

/*!
 * Import project
 */

global.hyperion = require('../..');

/*!
 * Helper to load internals for cov unit tests
 */

function req (name) {
  return process.env.hyperion_COV
    ? require('../../lib-cov/node/' + name)
    : require('../../lib/node/' + name);
}

/*!
 * Load unexposed modules for unit tests
 */

global.__hyperion = {
    util: req('util')
  , errors: req('errors')
};
