module.exports = function (services){

  const _writeFoo = function (fooStr){
    if (fooStr){
      return services.fs.writeFileSync('/tmp/foo.txt', 'success');
    }
    throw ('Please gimme a foo');
  };

  const _logFoo = function (fooStr){
    if (fooStr){
      return services.console.log('success');
    }
    throw ('Please gimme a foo');
  };

  return {
    writeFoo: _writeFoo,
    logFoo: _logFoo
  };

};
