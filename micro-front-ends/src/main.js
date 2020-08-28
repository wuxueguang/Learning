
import React from 'react';
import ReactDOM from 'react-dom';
import { registerMicroApps, start } from 'qiankun';
import { BrowserRouter as Router, Link } from 'react-router-dom';

const C = () => {

  // setTimeout(() => {
  //   import('./test/test.js')
  // }, 2000);

  return (
    <Router>
      <nav>
        <Link to="/app1">app1</Link>
        <Link to="/app2">app2</Link>
      </nav>
    </Router>
  );
};

ReactDOM.render(<C />, document.getElementById('router'));

registerMicroApps([
  {
    name: 'react app1',
    entry: {
      scripts: ['http://localhost:7778/static/main.js'],
    },
    container: '#container1',
    activeRule: location => location.pathname.startsWith('/app1'),
  },
  // {
  //   name: 'react app2',
  //   entry: { scripts: ['/dist/d.js'] },
  //   container: '#container2',
  //   activeRule: location => location.pathname.startsWith('/app2'),
  // },
]);

start();


// function add(...args){
//   let nums = [...args];
  
//   function inner(...args){
//     if(args.length === 0){
//       return nums.reduce((a, b) => a + b);
//     }
//     nums = [...nums, ...args];
//     return inner;
//   }

//   return inner;
// }

// const adder = add(1)(2)(3)(4);

// console.log( adder() );


