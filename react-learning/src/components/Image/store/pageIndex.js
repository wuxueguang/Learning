
import { createStore } from 'redux';

export default createStore((state = 0, { type, payload }) => {
  switch(type){
  case 'pageIndex/increase':
    return state + 1;
  case 'pageIndex/decrease':
    return state - 1;
  case 'pageIndex/update':
    return payload;
  default:
    return state;
  }
});
