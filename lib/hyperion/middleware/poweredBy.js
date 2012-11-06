/*!
 * Hyperion - Initialize middleware
 * Copyright(c) 2012 Jake Luer <jake@qualiancy.com>
 * MIT Licensed
 */

module.exports = function (app) {
  return function poweredBy (req, res, next) {
    var powerby = app.get('x-powered-by')
      , setby = ('string' === typeof powerby) ? powerby
              : (true === powerby ? 'Hyperion' : null);
    if (setby) res.set('x-powered-by', setby);
    next();
  };
};
