
import { createStore } from 'redux';
import { createAction, handleAction } from 'redux-actions';

const defaultState = {counter: 12};

const increment = createAction('INCREMENT');

const reducer = handleAction(
  increment,
  (state, action) => ({
    ...state,
    counter: state.counter + action.payload || 1,
  }),
  defaultState,
);

const store = createStore(reducer);

const render = () => {
  console.log(store.getState())
};

store.subscribe(render);

store.dispatch(increment(1213));
store.dispatch(increment(1213));
store.dispatch(increment(1213));

