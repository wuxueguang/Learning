const { resolve } = require("path");


const commonAction = {type: 'action type', payload: payload};


// redux-thunk
const thunkAction = function (dispatch) {
  return Promise.resolve({
    name: 'John',
    age: 13,
  }).then(({name, age}) => {
    dispatch({type: 'updateName', payload: name});
    dispatch({type: 'updateAge', payload: age});
  });
};

// redux-promise 
const promiseAction1 = Promise.resolve({type: 'updateName', payload: 'John'});
const promiseAction2 = {type: 'updateAge', payload: Promise.resolve(13)};

// redux-saga
const sagaAction = {};


function awaitfunc(p, cb){
  function* inner(){
    cb(yield p);
  }
  const iter = inner();
  iter.next().value.then(msg => iter.next(msg));
}

const ret = awaitfunc(new Promise(resolve => {
  setTimeout(() => resolve('test'), 1000);
}), (ret) => console.log(ret));


const a = _await(p1);
const b = _await(p2);
const c = _await(p3);

console.log(a, b, c);

function _async(){

}