

import React, { useState, useEffect } from 'react';

const C = () => {
  const [counter, setCounter] = useState(0);

  setTimeout(() => {
    setCounter(counter + 1);
  }, 1000);

  useEffect(() => {
    console.log(counter);
  });

  return (<span>{counter}</span>);
};

export default C;