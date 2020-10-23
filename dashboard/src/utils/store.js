
import { action, observable } from 'mobx';
import { type } from '@/utils';

export const updater = action(function(...args){
  const [key, value] = args;

  if(type(key) === 'object'){
    for(const n in key){
      this[n] = key[n];
    }
    return this;
  }else{
    if(args.length === 1){
      return action(value => {
        this[key] = value;
        return this;
      });
    }
    if(args.length > 1){
      this[key] = value;
      return this;
    }
  }
});

export const createStore = state => {
  const store = observable(state);
  store.update = updater;
  return store;
};