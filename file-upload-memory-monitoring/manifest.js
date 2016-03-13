import promisify from 'es6-promisify';
import fs from 'fs';

// manifest configuration
export default ({
  connections: [
    { port: 3000, labels: ['web'] },
  ],
  registrations: [
    { plugin: { register: './lib/api', options: { fs, promisify } } },
    // { plugin: { register: './lib/chat' } },
    { plugin: { register: 'memshaw' } },
    { plugin: { register: 'good', options: {
      reporters: [{
        reporter: 'good-console',
        events: { log: '*', response: '*' },
      }],
    } } },
    { plugin: { register: 'inert' } },
    { plugin: { register: 'vision' } },
    { plugin: { register: 'hapi-swagger' } },
  ],
});
