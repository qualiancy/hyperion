/*!
 * Hyperion - Initialize middleware
 * Copyright(c) 2012 Jake Luer <jake@qualiancy.com>
 * MIT Licensed
 */

module.exports = function (app) {
  return function init (req, res, next) {
    req.app = res.app = app;
    req.res = res;
    res.req = req;
    req.next = next;

    req.__proto__ = app.request;
    res.__proto__ = app.response;

    next();
  };
};
