

import { action } from 'mobx';

export default {
  increase: action(function(){
    this.set(this.get() + 1);
  }),
  reset: action(function(){
    this.set(0);
  }),
};