var util = __hyperion.util;

describe('util', function () {
  describe('.parseAccept(str)', function () {
    it('should parse a basic accept statement', function () {
      var parsed = util.parseAccept('application/json');
      parsed.should.be.an('array');
      parsed.should.deep.equal([{
          value: 'application/json'
        , quality: 1
        , type: 'application'
        , subtype: 'json'
      }]);
    });

    it('should parse a multiple accept statement', function () {
      var parsed = util.parseAccept('text/plain, text/html');
      parsed.should.be.an('array');
      parsed.should.deep.equal([
          { value: 'text/plain', quality: 1, type: 'text', subtype: 'plain' }
        , { value: 'text/html', quality: 1, type: 'text', subtype: 'html' }
      ]);
    });

    it('should parse a weighted accept statement', function () {
      var parsed = util.parseAccept('text/plain; q=.5, text/html');
      parsed.should.be.an('array');
      parsed.should.deep.equal([
          { value: 'text/html', quality: 1, type: 'text', subtype: 'html' }
        , { value: 'text/plain', quality: 0.5, type: 'text', subtype: 'plain' }
      ]);
    });
  });
});
