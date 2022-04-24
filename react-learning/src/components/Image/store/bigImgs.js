
import { createStore } from 'redux';

export default createStore((state = [], { type, payload }) => {
  switch(type){
  case 'bigImgs/reset':
    return payload;
  case 'bigImgs/update':
    return state.map((item, idx) => {
      if(idx === (payload.idx)){
        return payload.item;
      }
      return item;
    });
  default:
    return state;
  }
});
