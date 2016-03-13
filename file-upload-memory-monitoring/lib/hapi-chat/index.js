import fs from 'fs';
import path from 'path';
import sio from 'socket.io';

exports.register = (server, options, next) => {
  server.route({
    method: 'GET',
    path: '/chat',
    handler: (request, reply) => {
      const io = sio(server.listener);
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
      reply(fs.readFileSync(path.join(__dirname, './index.html'), 'utf8'));
    },
  });

  next();
};

exports.register.attributes = {
  name: 'chat',
  version: '0.0.1',
};
