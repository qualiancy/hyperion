describe('middleware', function () {
  describe('x-powered-by', function () {
    it('should be enabled by default', function (done) {
      var app = hyperion();

      app.use(function (req, res) {
        res.writeHeader(200, { 'content-type': 'text/plain' });
        res.write('hello universe');
        res.end();
      });

      chai.request(app)
      .get('/')
      .res(function (res) {
        res.should.have.status(200);
        res.should.have.header('x-powered-by', 'Hyperion');
        done();
      });
    });

    it('should support custom string', function (done) {
      var app = hyperion();

      app.set('x-powered-by', 'The Universe');

      app.use(function (req, res) {
        res.writeHeader(200, { 'content-type': 'text/plain' });
        res.write('hello universe');
        res.end();
      });

      chai.request(app)
      .get('/')
      .res(function (res) {
        res.should.have.status(200);
        res.should.have.header('x-powered-by', 'The Universe');
        done();
      });
    });

    it('should support .disable', function (done) {
      var app = hyperion();

      app.disable('x-powered-by');

      app.use(function (req, res) {
        res.writeHeader(200, { 'content-type': 'text/plain' });
        res.write('hello universe');
        res.end();
      });

      chai.request(app)
      .get('/')
      .res(function (res) {
        res.should.have.status(200);
        res.should.not.have.header('x-powered-by');
        done();
      });
    });
  });
});
