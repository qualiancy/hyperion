describe('res', function () {
  describe('.type(type)', function (done) {
    it('should set exact `content-type`', function (done) {
      var app = hyperion()

      app.use(function (req, res) {
        res.type('text/html').end();
      });

      chai.request(app)
      .get('/')
      .res(function (res) {
        res.should.be.html;
        done();
      });
    });

    it('should lookup mime-type for `content-type`', function (done) {
      var app = hyperion()

      app.use(function (req, res) {
        res.type('html').end();
      });

      chai.request(app)
      .get('/')
      .res(function (res) {
        res.should.be.html;
        done();
      });
    });
  });
});
