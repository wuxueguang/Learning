import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import C from './components/UseEffectTest';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

// const TT = () => {
//   let [counter, setCounter] = useState(0);

//   setTimeout(() => {
//     setCounter(counter + 1);
//   }, 1000);

//   return <C counter={counter} />
// }

ReactDOM.render(<PageHeaderWrapper><C /></PageHeaderWrapper>, document.getElementById('root'));