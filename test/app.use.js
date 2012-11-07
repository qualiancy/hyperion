describe('app', function () {
  describe('.use(fn)', function () {
    it('should stack the function', function (done) {
      var app = hyperion()
        , spy = chai.spy(function (req, res) {
            res.writeHeader(200, { 'content-type': 'text/plain' });
            res.write('hello universe');
            res.end();
          });

      app.use(spy);

      chai.request(app)
      .get('/')
      .res(function (res) {
        res.should.have.status(200);
        res.should.be.text;
        res.text.should.equal('hello universe');
        spy.should.have.been.called.once;
        done();
      });
    });
  });

  describe('.use({ handle: fn })', function () {
    it('should stack the function', function (done) {
      var app = hyperion()
        , spy = chai.spy(function (req, res) {
            res.writeHeader(200, { 'content-type': 'text/plain' });
            res.write('hello universe');
            res.end();
          });

      app.use({ handle: spy });

      chai.request(app)
      .get('/')
      .res(function (res) {
        res.should.have.status(200);
        res.should.be.text;
        res.text.should.equal('hello universe');
        spy.should.have.been.called.once;
        done();
      });
    });
  });

  describe('.use(route, fn)', function () {
    it('should stack the function for only that route', function (done) {
      var app = hyperion()
        , root = chai.spy(function (req, res, next) {
            next();
          })
        , wrong = chai.spy(function (req, res, next) {
            next();
          })
        , right = chai.spy(function (req, res) {
            res.writeHeader(200, { 'content-type': 'text/plain' });
            res.write('hello right universe');
            res.end();
          });

      app.use(root);
      app.use('/wrong', wrong);
      app.use('/right', right);

      chai.request(app)
      .get('/right?test=true')
      .res(function (res) {
        res.should.have.status(200);
        root.should.have.been.called.once;
        right.should.have.been.called.once;
        wrong.should.have.not.been.called();
        done();
      });
    });
  });
});
