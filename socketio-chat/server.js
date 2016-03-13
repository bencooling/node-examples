const http = require('http');

const handleRequest = (request, response) => {
  response.end(`<!doctype html>
  <html>
    <head>
      <title>Socket.IO chat</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font: 13px sans-serif; }
        form { background: #f1f1f1; padding: 1em; position: fixed; bottom: 0; width: 100%; }
        form input { border: 0; padding: 1em; width: 90%; margin-right: .5%; }
        form button { width: 9%; background: rgb(75, 92, 181); border: none;
        padding: 10px; color:#f1f1f1; text-transform: uppercase; }
        #messages { list-style-type: none; margin: 0; padding: 0; }
        #messages li { padding: 5px 10px; }
        #messages li:nth-child(odd) { background: #eee; }
      </style>
    </head>
    <body>
      <script src="/socket.io/socket.io.js"></script>
      <script src="http://code.jquery.com/jquery-1.11.1.js"></script>
      <script>
        var socket = io();
        $(function(){
          $('form').submit(function(){
            socket.emit('chat', $('#m').val());
            $('#m').val('');
            return false;
          });
        });
        socket.on('chat', function(msg){
          $('#messages').append($('<li>').text(msg));
        });
      </script>
      <ul id="messages"></ul>
      <form action="">
        <input id="m" autocomplete="off" /><button>Send</button>
      </form>
    </body>
  </html>`);
};

const server = http.createServer(handleRequest);
const io = require('socket.io')(server);

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  socket.on('chat', (msg) => {
    console.log(`message: ${msg}`);
    io.emit('chat', msg);
  });
});

server.listen(8000);
