var STATUS_CODES = require('http').STATUS_CODES
  , errors = __hyperion.errors;

describe('errors', function () {
  it('should imported all http errors', function () {
    var codeKeys = Object.keys(STATUS_CODES)
      , errorKeys = Object.keys(errors.errors)
    errorKeys.should.have.length(codeKeys.length);
  });

  it('should create an error with correct properties', function () {
    (function () {
      throw errors.create('internal server error');
    }).should.throw(errors._proto, 'Internal Server Error');
  });

  it('should be able to get the http status from an error', function () {
    var err = errors.create('internal server error')
      , json = err.toJSON();
    err.should.have.property('status', '500');
    json.should.have.property('status', '500');
  });
});
