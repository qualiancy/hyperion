describe('res', function () {
  describe('.status(code)', function () {
    it('should set the response .statusCode', function (done) {
      var app = hyperion();

      app.use(function (req, res) {
        res.status(201).end();
      });

      chai.request(app)
      .get('/')
      .res(function (res) {
        res.should.have.status(201);
        done();
      });
    });
  });
});
