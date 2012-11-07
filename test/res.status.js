describe('res', function () {
  describe('.status()', function () {
    it('should set the .statusCode', function (done) {
      var app = hyperion();

      app.use(function (req, res) {
        res.status(201);
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
