
module.exports = function (req, res, body, next) {
  var str;

  if (body instanceof Error) {
    res.status(body.status || 500);
    str = (body.message || 'An Error Occurred')
      + '\n' + body.stack;
  } else {
    str = body.toString();
  }

  res.set('content-length', Buffer.byteLength(str));
  next(null, str);
};
