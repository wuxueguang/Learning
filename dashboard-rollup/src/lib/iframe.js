
import axios from 'axios';
import qs from 'querystring';

import {
  DO_LOGIN,
  LOGINED,
  LOGIN_FAILED,

  DO_LOGOUT,
  LOGOUTED,
  LOGOUT_FAILED,
    
  FETCH_LOGIN_STATUS,
  LOGIN_STATUS_REACHED,
  FETCH_LOGIN_STATUS_FAILED,
} from './consts';

const loginOrigin = location.origin;

const {
  sourceOrigin,
  loginPath,
  loginStatusPath,
  logoutPath
} = qs.parse(location.search.slice(1));

window.addEventListener('message', async e => {
  const { data: { type, data }} = e;
  switch(type){
  case DO_LOGIN: 
    var loginUrl = `${loginOrigin}/${loginPath.replace(new RegExp('^/'), '')}`;
    try{
      const res = await axios.post(loginUrl, data);
      if(res.status === 200 && res.data.status === 1){
        top.postMessage({
          type: LOGINED,
          data: res.data.data,
        }, sourceOrigin);
      }else{
        throw new Error;
      }
    }catch(err){
      top.window.postMessage({
        type: LOGIN_FAILED,
      }, sourceOrigin);
    }
    break;
  case FETCH_LOGIN_STATUS:
    var loginStatusUrl = `${loginOrigin}/${loginStatusPath.replace(new RegExp('^/'), '')}`;
    try{
      const res = await axios.get(loginStatusUrl);
      if(res.status === 200 && res.data.status === 1){
        top.postMessage({
          type: LOGIN_STATUS_REACHED,
          data: res.data.data,
        }, sourceOrigin);
      }else{
        throw new Error;
      }
    }catch(err){
      top.postMessage({
        type: FETCH_LOGIN_STATUS_FAILED,
      }, sourceOrigin);
    }
    break;
  case DO_LOGOUT:
    var logoutUrl = `${loginOrigin}/${logoutPath.replace(new RegExp('^/'), '')}`;
    try{
      const res = await axios.post(logoutUrl);
      if(res.status === 200 && res.data.status === 1){
        top.postMessage({
          type: LOGOUTED,
        }, sourceOrigin);
      }else{
        throw new Error;
      }
    }catch(err){
      top.postMessage({
        type: LOGOUT_FAILED,
      }, sourceOrigin);
    }
    break;
  }
});

