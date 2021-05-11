import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';

const reducer = (state = { count: 0}, action) => {
  switch(action.type){
    case 'count/increase':
      return { count: state.count + 1};
    default:
      return state;
  }
};

const store = createStore(reducer);

const mapStateToProps = (state, ownProps) => {
  return { count: state.count };
};

const connect = mapStateToProps => C => props => {
  const [state, setState] = useState();

  useEffect(() => {
    store.subscribe(() => {
      const newState = mapStateToProps(store.getState(), props);
      setState(newState);
    });
  }, []);

  return <C {...state} />;
};

const Counter = props => {
  const { count } = props;

  useEffect(() => {
    setInterval(() => {
      store.dispatch({ type: 'count/increase' });
    }, 1000);
  }, []);

  return <span>{count}</span>;
};

const App = connect(mapStateToProps)(Counter);

ReactDOM.render(<App/>, document.getElementById('root'));