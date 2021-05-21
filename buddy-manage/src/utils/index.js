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
