const sinon = require('sinon');
const test = require('tape');

// modules/db.js
const db = (function (){
  const _save = function (document, options, cb){
    // emulate async
    setTimeout(function (){
      if (options.toString() !== '[object Object]'){
        return cb('Invalid options object');
      }
      cb(null, 'db saved!');
    }, 0);
  };
  return {
    save: _save
  };
})();

// modules/user.js
const User = function (db){
  const _create = function user (options, cb){
    db.save('user', options, cb);
  };
  return {
    create: _create
  };
};

// ./test.js
// const db = require('./modules/db');
// const User = require('./modules/user');

const user = User(db);

// Using a spy
test('when user.create recieves valid options object, db.save behaves correctly', function (t){
  t.plan(3);
  const save = sinon.spy(db, 'save');
  user.create({name:'Ben'}, function (err, msg){
    t.equal(save.called, true, 'db.save is called');
    t.equal(save.callCount, 1, 'db.save is called once');
    t.equal(save.threw(), false, 'db.save does not throw an error');
    save.restore(); // reinstate original function
  });
});

// Using a stub
test('when db.save throws an error, user.save handles it correctly', function (t){
  t.plan(1);
  const save = sinon.stub(db, 'save');
  const cb = sinon.spy();
  save.yields('Something went wrong!');
  user.create({name:'Ben'}, cb);
  t.equal(cb.calledWith('Something went wrong!'), true, 'Handled correctly if db.save throws an error');
  save.restore(); // reinstate original function
});
