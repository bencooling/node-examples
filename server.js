var http = require('http');
var PORT = process.env.PORT || 5000;
d = new Date();

http.createServer(function (req, res) {

  console.log('%d request received at %s', process.pid, d.toLocaleTimeString());

  res.writeHead(200, {'Content-Type': 'text/plain'});

  res.end('Hello world!\n');
}).listen(PORT);

console.log('%d listening on %d', process.pid, PORT);
