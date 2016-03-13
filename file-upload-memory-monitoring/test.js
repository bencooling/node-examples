import test from 'tape';
import FormData from 'form-data';
import streamToPromise from 'stream-to-promise';
import server from './server.js';
import fs from 'fs';


fs.writeFileSync('./smallImage.jpg', new Buffer(1024 * 5));
const formWithSmallImage = new FormData();
formWithSmallImage.append('file', fs.createReadStream('./smallImage.jpg'), {
  filename: 'smallImage.jpg',
  contentType: 'image/jpg',
});

fs.writeFileSync('./largeImage.jpg', new Buffer(1024 * 1024 * 5));
const formWithLargeImage = new FormData();
formWithLargeImage.append('file', fs.createReadStream('./largeImage.jpg'), {
  filename: 'largeImage.jpg',
  contentType: 'image/jpg',
});

// SEE: [File upload with server.inject](https://github.com/hapijs/discuss/issues/77)
server.on('ready', s => {
  test('Uploading file over 5MB', (t) => {
    t.plan(1);
    const expected = 400;
    streamToPromise(formWithLargeImage).then(payload => {
      s.inject({
        method: 'POST',
        url: '/upload',
        payload,
        headers: formWithLargeImage.getHeaders(),
      }, response => {
        t.equal(response.raw.res.statusCode, expected, 'return a status code of 400');
        // test the file in tmp directory
      });
    });
  });
  test('Uploading file under 5MB', (t) => {
    t.plan(1);
    const expected = 200;
    streamToPromise(formWithSmallImage).then(payload => {
      s.inject({
        method: 'POST',
        url: '/upload',
        payload,
        headers: formWithSmallImage.getHeaders(),
      }, response => {
        t.equal(response.raw.res.statusCode, expected, 'return a status code of 200');
        s.stop();
        // test the file in tmp directory
      });
    });
  });
});
