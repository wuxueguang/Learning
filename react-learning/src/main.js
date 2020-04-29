import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Test = props => {
  console.log(props)
  return <span>{props.value}</span>
}

const T = props => {

  const restProps = {...props};

  return <Test {...restProps} />
};


ReactDOM.render(<T value="dfsdf" />, document.getElementById('root'));