describe('util', function () {
  var util = __hyperion.util;

  describe('parseAccept', function () {
    it('can parse a basic accept statement', function () {
      var parsed = util.parseAccept('application/json');
      parsed.should.be.an('array');
      parsed.should.deep.equal([{ value: 'application/json', quality: 1 }]);
    });

    it('can parse a multiple accept statement', function () {
      var parsed = util.parseAccept('text/plain, text/html');
      parsed.should.be.an('array');
      parsed.should.deep.equal([
          { value: 'text/plain', quality: 1 }
        , { value: 'text/html', quality: 1 }
      ]);
    });

    it('can parse a quality accept statement', function () {
      var parsed = util.parseAccept('text/plain; q=.5, text/html');
      parsed.should.be.an('array');
      parsed.should.deep.equal([
          { value: 'text/html', quality: 1 }
        , { value: 'text/plain', quality: 0.5 }
      ]);
    });
  });
});
