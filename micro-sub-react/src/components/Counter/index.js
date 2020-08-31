
import React from 'react';
import { connect } from 'react-redux'

const Counter = connect(({counter}) => ({counter}))(({ dispatch, counter }) => {
  setTimeout(() => {
    dispatch({type: 'INCREMENT'});
  }, 1000);
  return <b>{counter}</b>
});


export default Counter;