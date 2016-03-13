// import 'newrelic';
import EventEmitter from 'events';
import path from 'path';
import Glue from 'glue';
import test from 'assert';
import dotenv from 'dotenv';
import promisify from 'es6-promisify';
import manifest from './manifest';
import utils from './lib/utils';
import pnrickmem from 'pubnub-rickshaw-memory';

module.exports = new EventEmitter();

// sensitive data as enivronment variables please :-)
dotenv.config({ path: path.join(__dirname, '.env') });

// graph memory usage
// TODO: replace with niome
pnrickmem.init({ dev: true, subscribe_key: 'demo' });

promisify(Glue.compose)(manifest, { relativeTo: __dirname })
  .then(server => server.start(err => {
    test.equal(null, err);
    module.exports.emit('ready', server);
    server.log(['server'], `server listening on port ${process.env.PORT} 😈`);
    console.log('server.start callback', utils.logMemory());
    server.ext('onPreResponse', (request, reply) => {
      console.log('preResponse', utils.logMemory());
      return reply.continue();
    });
  }))
  .catch(e => console.log(e));
