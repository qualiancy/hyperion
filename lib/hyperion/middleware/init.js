
module.exports = function (app) {
  return function init (req, res, next) {
    req.app = res.app = app;
    req.res = res;
    res.req = req;

    req.__proto__ = app.request;
    res.__proto__ = app.response;

    next();
  };
};
