import React, { Component, useState, useEffect, useMemo, useCallback } from 'react';
import { render } from 'react-dom';




const Span = (props) => {
  const { info } = props;
  const [name, setName] = useState();

  useEffect(() => {
    console.log('transfer');
    setName(info.name.toUpperCase());
  }, [info]);
  
  return <span>{ name }</span>;
};

const partColumns = [
  {},
  {},
];


const Counter = () => {
  const [count, setCount] = useState(0);
  
  const o = useMemo(() => {
    return { name: 'Tom' };
  }, []);

  const [searchParams, setSearchParams] = useState();

  const fields = [
    // ...
  ];

  // const o = { name: 'Tom' };

  useEffect(() => {
    setTimeout(() => setCount(count + 1), 1000);
  }, [count]);

  return (
    <>
      <span>{count}</span><br/>
      <Span info={ o } />
    </>
  );
};

render(<Counter />, document.getElementById('root'));