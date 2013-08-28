
module.exports = function (opts) {
  return function query (req, res, next) {
    if (arguments.length === 2) next = res, res = null;

    if (!req.query) {
      var query = ~req.url.indexOf('?')
        ? req.url.substr(req.url.indexOf('?') + 1)
        : '';

      req._query = query;
      req.query = query;
    }

    next();
  };
};
