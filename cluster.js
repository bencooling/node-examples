var cluster = require('cluster');
var http = require('http');
var numCPUs = require('os').cpus().length;

// SEE: https://nodejs.org/dist/latest-v5.x/docs/api/cluster.html#cluster_cluster
if (cluster.isMaster) {
  for (var i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', function (worker, code, signal) {
    console.log('worker ' + worker.process.pid + ' died');
  });
}
else {
  require('./server');
}
