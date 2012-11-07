describe('app', function () {
  describe('.configure(env, fn)', function () {
    it('should pivot on app.settings.env', function () {
      var app = hyperion();
      app.set('env', 'production');

      app.configure(function () { app.__noenv = true ; });
      app.configure('test', function () { app.__testenv = true; });
      app.configure('production', function () { app.__prodenv = true; });

      app.should.have.property('__noenv', true);
      app.should.not.have.property('__testenv');
      app.should.have.property('__prodenv', true);
    });
  });
});
