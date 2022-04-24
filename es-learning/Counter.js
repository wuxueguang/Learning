
import React, { useState, useEffect } from 'react';

const Counter = props => {
  const [count, setCount] = useCount(props.count || 0);

  useEffect(() => {
    const si = setInterval(() => setCount(count + 1), 1000);

    return () => clearInterval(si);
  }, []);

  return <span>{count}</span>;
}