describe('res', function () {
  describe('.createError(key)', function () {
    it('should create http errors by stringed key', function (done) {
      var app = hyperion();

      app.use(function (req, res) {
        var err = res.createError('not found');
        err.should.be.instanceof(Error);
        res
        .status(err.status)
        .type('text')
        .end(err.message);
      });

      chai.request(app)
      .get('/')
      .res(function (res) {
        res.should.have.status(404);
        res.text.should.equal('Not Found');
        done();
      });
    });

    it('should create http errors by stringed key', function (done) {
      var app = hyperion();

      app.error('not found', {
          status: 500
        , message: 'Custom Not Found'
      });

      app.use(function (req, res) {
        var err = res.createError('not found');
        err.should.be.instanceof(Error);
        res
        .status(err.status)
        .type('text')
        .end(err.message);
      });

      chai.request(app)
      .get('/')
      .res(function (res) {
        res.should.have.status(500);
        res.text.should.equal('Custom Not Found');
        done();
      });
    });

    it('should create http errors by status code', function (done) {
      var app = hyperion();

      app.use(function (req, res) {
        var err = res.createError(404);
        err.should.be.instanceof(Error);
        res
        .status(err.status)
        .type('text')
        .end(err.message);
      });

      chai.request(app)
      .get('/')
      .res(function (res) {
        res.should.have.status(404);
        res.text.should.equal('Not Found');
        done()
      });
    });
  });
});
