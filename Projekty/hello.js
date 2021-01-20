var http = require('http');

http.createServer(function (req, res) {
  res.writeHead(300, {'Content-Type': 'text/html'});
  res.end('Hello Worldss!');
}).listen(8080);