describe('res', function () {
  describe('.get(key)', function () {
    it('should get an existing header', function (done) {
      var app = hyperion();

      app.use(function (req, res) {
        res.setHeader('hello', 'universe');
        res.get('hello').should.equal('universe');
        res.get('Hello').should.equal('universe');
        res.end();
      });

      chai.request(app)
      .get('/')
      .res(function (res) {
        res.should.have.header('hello', 'universe');
        done();
      });
    });
  });
});
