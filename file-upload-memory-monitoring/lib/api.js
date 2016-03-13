exports.register = (server, { fs, promisify }, next) => {
  server.route({
    method: 'GET',
    path: '/',
    handler: (request, reply) => {
      reply('api');
    },
  });
  server.route({
    method: 'POST',
    path: '/upload',
    config: {
      payload: {
        maxBytes: 5242880, // 5MB (1024*1024*5) limit
        output: 'stream', // files provided as streams
        parse: true, // payload raw vs processed by content-type header
      },
      description: 'Upload file',
      tags: ['api', 'file'],
      handler: (request, reply) => {
        let str = ''; // TODO: consider pure function?
        // console.log('request.payload.file.hapi', request.payload.file.hapi);
        request.payload.file
          .on('data', (chunk) => (str += chunk))
          .on('end', () => {
            promisify(fs.writeFile)(request.payload.file.hapi.filename, str, 'utf-8')
              .then(reply({
                statusCode: 200,
                message: 'File imported',
              }))
              .catch(e => reply(e)); // TODO: return statusCode
          });
      },
    },
  });
  next();
};

exports.register.attributes = {
  name: 'api',
  version: '0.0.1',
};
