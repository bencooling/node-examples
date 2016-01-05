// require('heapdump');

var arr = [];
var leaky = [];

var getObj = function (text){
  return {
    text: text,
    getText: function (){ return this.text; }
  };
};

var addAndRemoveObject = function addAndRemoveObject (){

  var obj1 = getObj(Math.random().toString());
  var obj2 = getObj(Math.random().toString());

  arr.push(obj1);
  leaky.push(obj2);

  arr.splice(arr.indexOf(obj1), 1);
  // woops! keep adding to memory!
  // leaky.splice(arr.indexOf(obj2), 1);

};

var getStats = function getStats (){

  // force garbage collection
  global.gc();

  // output heap stats
  var heapUsed = process.memoryUsage().heapUsed;
  console.log('Program is using ' + heapUsed + ' bytes of Heap.');

  // get heap dump
  // process.kill(process.pid, 'SIGUSR2');

};

setInterval(addAndRemoveObject, 5); // Add to memory every 5 milliseconds
setInterval(getStats, 5000); // clean up every 2 seconds
