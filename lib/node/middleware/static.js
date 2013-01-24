
var debug = require('sherlock')('hyperion:static')
  , fs = require('fs')
  , mime = require('mime')
  , path = require('path');

module.exports = function (dir) {
  debug('[init] %s', dir);

  return function static (req, res, next) {
    var filename = path.join(dir, req.url);

    debug('[req] %s', filename);

    function serve (file, cb) {
      fs.exists(file, function (exist) {
        if (!exist) return cb(null, false);
        fs.stat(file, function (err, stat) {
          if (err) return cb(err);
          if (stat.isDirectory()) {
            serve(path.join(file, 'index.html'), cb);
          } else if (stat.isFile()) {
            var ctype = mime.lookup(file);
            debug('[serve] (%s) %s', ctype, file.replace(dir, ''));

            fs.readFile(file, function (err, buf) {
              if (err) return next(err);
              res.type(ctype);
              res.set('content-length', buf.length);
              res.write(buf);
              res.end();
              cb(null, true);
            });
          }
        });
      });
    }

    serve(filename, function (err, found) {
      if (err) return next(err);
      if (found) return next(false);
      next();
    });
  };
};
