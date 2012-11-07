describe('req', function () {
  describe('accept', function () {
    it('can parse accept headers', function (done) {
      var app = hyperion();

      app.use(function (req, res) {
        req.accepted.should.be.an('array');
        req.accepted.should.deep.equal([{ value: 'text/plain', quality: 1 }]);

        res.writeHeader(200, { 'content-type': 'text/plain' });
        res.write('hello universe');
        res.end();
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

    it('can determine if req accepts type', function (done) {
      var app = hyperion();

      app.use(function (req, res) {
        req.accepts('application/json').should.be.false;
        req.accepts('text/plain').should.be.true;

        res.writeHeader(200, { 'content-type': 'text/plain' });
        res.write('hello universe');
        res.end();
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
  });
});
