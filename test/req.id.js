describe('req', function () {
  describe('.id', function () {
    it('should reference an already existing x-request-id', function (done) {
      var app = hyperion()
        , spy = chai.spy(function (req, res) {
            req.should.have.header('x-request-id');
            req.should.have.property('id');
            req.id.should.equal('hello-universe');

            res
            .status(200)
            .type('text')
            .end(req.id);
          });

      app.use(spy);

      chai.request(app)
      .get('/')
      .req(function (req) {
        req.set('X-Request-Id', 'hello-universe');
      })
      .res(function (res) {
        res.should.have.status(200);
        res.should.be.text;
        res.text.should.equal('hello-universe');
        spy.should.have.been.called.once;
        done();
      });
    });

    it('should generate req.id if it does not exist', function (done) {
      var app = hyperion()
        , spy = chai.spy(function (req, res) {
            req.should.not.have.header('x-request-id');
            req.should.have.property('id');
            req.id.should.have.length(36);

            res
            .status(200)
            .type('text')
            .end(req.id);
          });

      app.use(spy);

      chai.request(app)
      .get('/')
      .res(function (res) {
        res.should.have.status(200);
        res.should.be.text;
        res.text.should.have.length(36);
        spy.should.have.been.called.once;
        done();
      });
    });
  });
});
