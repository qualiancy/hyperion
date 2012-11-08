describe('req', function () {
  describe('.accepts(type)', function () {
    it('should determine if req accepts exact type', function (done) {
      var app = hyperion();

      app.use(function (req, res) {
        req.accepts('application/json').should.be.false;
        req.accepts('text/plain').should.be.true;
        req.accepts('json').should.be.false;
        req.accepts('text').should.be.true;

        res
        .status(200)
        .type('text')
        .end('hello universe');
      });

      chai.request(app)
      .get('/')
      .req(function (req) {
        req.set('accept', 'text/plain');
      })
      .res(function (res) {
        res.should.have.status(200);
        done();
      });
    });

    it('should determine if req accepts wildcard type', function (done) {
      var app = hyperion();

      app.use(function (req, res) {
        req.accepts('application/json').should.be.false;
        req.accepts('text/plain').should.be.true;
        req.accepts('text/html').should.be.true;
        req.accepts('json').should.be.false;
        req.accepts('text').should.be.true;
        req.accepts('html').should.be.true;

        res
        .status(200)
        .type('text')
        .end('hello universe');
      });

      chai.request(app)
      .get('/')
      .req(function (req) {
        req.set('accept', 'text/*');
      })
      .res(function (res) {
        res.should.have.status(200);
        done();
      });
    });
  });
});
