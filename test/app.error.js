describe('app', function () {
  describe('.error()', function () {
    it('should allow for custom errors', function () {
      var app = hyperion();
      app.should.itself.respondTo('error');
      app.error('custom error', {
          status: 404
        , message: 'This resource cannot be located.'
      });
    });
  });
});
