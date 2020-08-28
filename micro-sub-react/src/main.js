
// import './main.less';
import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import C from './components/C';


const render = container => {
  if(container){
    ReactDOM.render(<C />, container);
  }else{
    const root = document.getElementById('root');
   root && ReactDOM.render(<C />, root);
  }
};

window.render = render;

render();


