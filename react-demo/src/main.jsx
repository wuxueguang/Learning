

import React, { Suspense, useEffect, useState, lazy } from 'react';
import { Input } from 'antd';
import { render } from 'react-dom';

// const Button = React.lazy(() => import('./components/Button'));

// const Tick = props => {
//   console.log('testasdasdsdfsdf');
//   return (
//     <Suspense fallback="Lazy component is loading ...">
//       <Button
//         type="primary"
//         onClick={() => {
//           alert(1);
//         }}
//       >sdfsdfsd</Button>
//     </Suspense>
//   );
// };



// class Component{


// }




// class Ticker extends React.PureComponent{
//   constructor(props){
//     super(props);
//     this.state = {
//       list: [],
//       count: 0,
//     }
//   }

//   componentDidMount(){
//     setInterval(() => {
//       const { list, count } = this.state;
//       const item = Math.random();
//       console.log(item);
//       list.push(item);
//       this.setState({count: count + 1});
//     }, 1000);
//   }

//   render(){
//     return (
//       <ul>
//         {this.state.list.map(item => <li key={item}>{item}</li>)}
//       </ul>
//     );
//   }
// }


const Ticker = () => {
  const [list, setList] = useState([{a: {b: {c: 'c'}}}]);
  const [count, setCount] = useState(0);

  setTimeout(() => {
    list[0].a.b.c = 'cccc';
    setCount(list.length);
  }, 1000);

  return (
    <span>{list[0].a.b.c}</span>
  );
};


render(<Ticker/>, document.getElementById('root'));




