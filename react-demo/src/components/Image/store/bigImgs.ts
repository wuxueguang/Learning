
import { createStore } from 'redux';

type bigImgSrc = string;
type Payload = bigImgSrc[] | {idx: number, item: bigImgSrc};
type Action = {type: string, payload: Payload};

const reducer = (state: bigImgSrc[] = [], action: Action): bigImgSrc[] => {

  const { type, payload} = action;
  switch(type){
  case 'bigImgs/reset':
    return payload as bigImgSrc[];
  case 'bigImgs/update':
    return state.map((item, idx) => {
      if(idx === ((payload as {idx: number, item: bigImgSrc}).idx)){
        return (payload as {idx: number, item: bigImgSrc}).item;
      }
      return item;
    });
  default:
    return state;
  }
};

export default createStore(reducer);
