describe('app', function () {
  describe('.init()', function () {
    it('should have hyperion version property', function () {
      var app = hyperion();
      app.should.have.property('__hyperionVersion', hyperion.version);
    });

    it('should be an event emitter with "::" for delimer', function () {
      var app = hyperion()
        , single = chai.spy('single')
        , wildcard = chai.spy('wildcard')

      app.on('test', single);
      app.on('hello::*', wildcard);

      app.emit('test');
      app.emit('hello::universe');

      single.should.have.been.called.once;
      wildcard.should.have.been.called.once;
    });

    it('should have valid default config', function () {
      var app = hyperion();
      app.get('env').should.equal(process.env.NODE_ENV);
    });
  });
});
