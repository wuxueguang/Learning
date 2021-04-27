
import { observable, action } from "mobx";

class userStore{

  @observable num = 0;

  @action
  increaseNum(){
    this.num++;
  }

  @action
  decreaseNum(){
    if(this.num!==0){
      this.num--;
    }
  }
}

export default userStore;