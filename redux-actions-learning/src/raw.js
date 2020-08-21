
import { createStore } from 'redux';
import { createAction } from './utils';
import reducers from './reducers';

const store = createStore(reducers);

store.subscribe(() => {
  console.log(store.getState());
});

const increment = createAction('INCREMENT');
store.dispatch(increment(2));
store.dispatch(increment(4));
store.dispatch(increment(6));