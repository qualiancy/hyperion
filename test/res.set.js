describe('res', function () {
  describe('.set(key, value)', function () {
    it('should set response header field', function (done) {
      var app = hyperion();

      app.use(function (req, res) {
        res.set('hello', 'universe').end();
      });

      chai.request(app)
      .get('/')
      .res(function (res) {
        res.should.have.header('hello', 'universe');
        done();
      });
    });
  });

  describe('.set(obj)', function () {
    it('should set multiple header fields', function (done) {
      var app = hyperion();

      app.use(function (req, res) {
        res.set({
            goodbye: 'gravity'
          , hello: 'universe'
        }).end();
      });

      chai.request(app)
      .get('/')
      .res(function (res) {
        res.should.have.header('goodbye', 'gravity');
        res.should.have.header('hello', 'universe');
        done();
      });
    });
  });
});
