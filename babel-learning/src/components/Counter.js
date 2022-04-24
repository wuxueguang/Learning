
import React, { useState, useEffect } from 'react';


const Counter = () => {

  const [count, setCount] = useState(0);

  useEffect(() => setTimeout(() => {
    setCount(count + 1);
  }, 1000), [count]);

  return React.createContext({
    type: 'span',
    children: count,
  });
};


export default Counter;
