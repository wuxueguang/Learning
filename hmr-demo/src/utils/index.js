// import React, { useState, useEffect } from 'react';
exports.transformStyle = styleObj => {
  const newStyle = {...styleObj};
  const pxs = ['width', 'height'];

  for(const n in newStyle){
    if(pxs.includes(n) && Number.isFinite(newStyle[n])){
      newStyle[n] = `${newStyle[n]}px`;
    }
  }

  return newStyle;
};

const typeOf = v => /^\[object (.*)\]$/.exec(Object.prototype.toString.call(v))[1].toLowerCase();

exports.isObject = obj => typeOf(obj) === 'object';

exports.isFunc = func => typeOf(func) === 'function';

exports.isArray = arr => typeOf(arr) === 'array';

exports.isPromise$ = Promise$ => p => p instanceof Promise$;

// const EventEmitter = require('events');
// const { useEffect } = require('react');

// const ev = new EventEmitter;

// ev.on('test', () => console.log('test'));
// ev.emit('test');
// console.log('-----');


// const et = new EventTarget;
// et.addEventListener('test', () => console.log('test'));
// et.dispatchEvent(new CustomEvent('test'));
// console.log('-----');

// const store = {};

// // eslint-disable-next-line react/display-name
// export const connect = (mapState, mapProps) => C => props => {

//   const [state, setState] = useState();

//   useEffect(() => {
//     store.subscibe(() => {
//       setState(mapState(store.getState()));
//     });
//   }, []);

//   return <C {...state} />;

// };
