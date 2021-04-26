
import { observable, action, autorun } from 'mobx';
import React, { useEffect, useState } from 'react';
import { render } from 'react-dom';
import { Provider, inject } from './react-mobx';

const counter = observable(0);

counter.add = action(function(){
  this.set(this.get() + 1);
});

setInterval(() => {
  counter.add();
}, 1000);

const C = props => {
  return (
    <span>{props.counter.get()}</span>
  );
};

render((
  <C counter={counter}/>
), document.getElementById('root'));



