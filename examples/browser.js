
var http = require('http')
  , hyperion = require('..')
  , join = require('path').join
  , app, server;

app = hyperion('examples');
server = http.createServer(app);

app.use('/js', hyperion.static(join(__dirname, '../build')));
app.use('/', hyperion.static(join(__dirname, 'browser')));

server.listen(8080);
console.log('server listening on port %d', server.address().port);
