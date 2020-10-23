
import * as services from '@/services';
import { deepClone } from '@/utils';
import { createStore } from '@/utils/store';

const defaultState = {
  logined: undefined,
  user: null,
};

const userInfo = createStore(deepClone(defaultState));

userInfo.reset = function(){
  this.update({
    logined: false,
    user: null,
  });
};

userInfo.fetchLoginStatus = async function(){
  const ret = await services.fetchLoginStatus();
  if(ret){
    this.update({
      user: ret,
      logined: true
    });
  }else{
    this.update('logined')(false);
  }
};

userInfo.doLogin = async function(){
  const ret = await services.login();
  if(ret){
    this
      .update('user')(ret)
      .update('logined')(true);
  }
};

userInfo.doLogout = async function(){
  await services.logout();
  this.reset();
};

export default userInfo;