describe('req', function () {

  describe('id', function () {

    it('can be provided by header x-request-id', function (done) {
      var app = hyperion();

      app.use(function (req, res) {
        req.should.have.header('x-request-id');
        req.should.have.property('id');
        req.id.should.equal('hello-universe');

        // TODO: automatic handling of such things
        res.writeHeader(200, { 'content-type': 'text/plain' });
        res.write(req.id);
        res.end();
      });

      chai.request(app)
        .get('/')
        .req(function (req) {
          req.set('X-Request-Id', 'hello-universe');
        })
        .res(function (res) {
          res.should.have.status(200);
          res.should.be.text;
          res.text.should.equal('hello-universe');
          done();
        });
    });

    it('can be generate if not in header', function (done) {
      var app = hyperion();

      app.use(function (req, res) {
        req.should.not.have.header('x-request-id');
        req.should.have.property('id');
        req.id.should.have.length(36);

        // TODO: automatic handling of such things
        res.writeHeader(200, { 'content-type': 'text/plain' });
        res.write(req.id);
        res.end();
      });

      chai.request(app)
        .get('/')
        .res(function (res) {
          res.should.have.status(200);
          res.should.be.text;
          res.text.should.have.length(36);
          done();
        });
    });

  }); // id

});
