function foo (name, cb){
return cb(name);
  cb(name);
}

foo('Ben', function (name){
  console.log('name', name);
});
