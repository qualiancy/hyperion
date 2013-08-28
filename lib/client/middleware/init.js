/*!
 * Hyperion - Initialize middleware
 * Copyright(c) 2012 Jake Luer <jake@qualiancy.com>
 * MIT Licensed
 */

module.exports = function (app) {
  return function init (ctx, next) {
    ctx.app = app;
    ctx.next = next;

    ctx.__proto__ = app.context;

    next();
  };
};
