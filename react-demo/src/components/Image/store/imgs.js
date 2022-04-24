
import { createStore } from 'redux';

const reducer = (state = [], { type, payload }) => {
  switch(type){
  case 'imgs/reset':
    return payload;
  case 'imgs/update':
    return state.map((item, idx) => {
      if(idx === (payload.idx)){
        return payload.item;
      }
      return item;
    });
  default:
    return state;
  }
};

export default createStore(reducer);
