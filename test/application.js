describe('application', function () {

  it('can be created from main export', function () {
    var app = hyperion();
    app.should.be.a('function');
    app.should.itself.respondTo('use');
    app.should.itself.respondTo('configure');
    app.should.itself.respondTo('handle');
  });

  it('has a hyperion version', function () {
    var app = hyperion();
    app.should.have.property('__hyperionVersion', hyperion.version);
  });

  it('is an event emitter', function () {
    var app = hyperion()
      , single = chai.spy('single')
      , wildcard = chai.spy('wildcard')
    app.should.itself.respondTo('on');
    app.should.itself.respondTo('emit');
    app.on('test', single);
    app.on('hello::*', wildcard);
    app.emit('test');
    app.emit('hello::universe');
    single.should.have.been.called.once;
    wildcard.should.have.been.called.once;
  });

  it('has facet methods', function () {
    var app = hyperion();
    app.should.itself.respondTo('get');
    app.should.itself.respondTo('set');
    app.should.itself.respondTo('enable');
    app.should.itself.respondTo('disable');
    app.should.itself.respondTo('enabled');
    app.should.itself.respondTo('disabled');
  });

  it('has correct default config', function () {
    var app = hyperion();
    app.get('env').should.equal(process.env.NODE_ENV);
  });

  it('can be configured by node env', function () {
    var app = hyperion()
      , env = process.env.NODE_ENV // storing current

    // setting for test
    process.env.NODE_ENV = 'test';

    // configuring
    app.configure(function () { app.__noenv = true ; });
    app.configure('test', function () { app.__testenv = true; });
    app.configure('production', function () { app.__prodenv == true; });

    // testing
    app.should.have.property('__noenv', true);
    app.should.have.property('__testenv', true);
    app.should.not.have.property('__prodenv');

    // resetting
    process.env.NODE_ENV = env; // resetting current
  });

});
