var core = require('./core');
var services = {
  fs: require('fs'),
  console: console
};

module.exports = function (){
  return core(services);
};
