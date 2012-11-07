describe('req', function () {
  describe('.accepted', function () {
    it('should parse acceptable headers', function (done) {
      var app = hyperion();

      app.use(function (req, res) {
        req.accepted.should.be.an('array');
        req.accepted.should.deep.equal([{ value: 'text/plain', quality: 1 }]);

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
  });
});
