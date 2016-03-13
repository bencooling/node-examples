var shell = require('./shell')();

console.log('writing to file');
shell.writeFoo('foo');

console.log('write to stdout');
shell.logFoo('foo');
