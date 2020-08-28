
import './style.less';

import React, { useState, useEffect } from 'react';

const C = props => {
  const [counter, setCounter] = useState(props.start || 0);

  setTimeout(() => {
    setCounter(counter + 1);
  }, 1000);

  useEffect(() => {
    const handler = e => console.log(e.detail);
    document.body.addEventListener('test', handler);

    return () => {
      document.body.removeEventListener('test', handler);
    };
  }, []);

  // useEffect(() => {
  //   setTimeout(() => {
  //     import('../../alerter').then(m => m.default());
  //   }, 5000);
  // }, []);

  return (
    <div>
      <span>Counter: </span>
      <span className="counter">{counter}</span>
    </div>
  )
};

export default C;