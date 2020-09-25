
import qs from 'querystring';

import { InitConfig } from './types';

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

  EMPTY_FUNC,
} from '../consts';

const _iframe = document.createElement('iframe');
const _iframeLoad = new Promise(async resolve => {
  _iframe.addEventListener('load', resolve);
});

let _iframeWin;
const init = async (cfg: InitConfig, loginedHandler: Function, logoutedHandler: Function) => {
  const _cfg = {
    ...cfg,
    sourceOrogin: location.origin,
    loginStatusPath: cfg.loginStatusPath || cfg.loginPath,
  };
  _iframe.src = `${cfg.loginOrigin}/${cfg.iframePath.replace(new RegExp('^/'), '')}?${qs.stringify(_cfg)}`;
  _iframe.style.display = 'none';
  
  window.addEventListener('DOMContentLoaded', () => {
    document.body.appendChild(_iframe);
    _iframeWin = window.frames[window.frames.length - 1];
  });
  
  window.addEventListener('message', function handler(event){
    const { data: { type, data } } = event;
    if(type === LOGIN_STATUS_REACHED){
      loginedHandler(data);
    }
    if(type === FETCH_LOGIN_STATUS_FAILED){
      logoutedHandler();
    }
    if([LOGIN_STATUS_REACHED, FETCH_LOGIN_STATUS_FAILED].includes(type)){
      window.removeEventListener('message', handler);
    }
  });

  _iframeLoad.then(() => {
    _iframeWin.postMessage({type: FETCH_LOGIN_STATUS}, location.origin);
  });
};

const login = async (data, loginedHandler: Function, loginFailedHandler: Function) => {
  window.addEventListener('message', function handler(e: MessageEvent){
    if(e.data.type === LOGINED){
      loginedHandler(e.data.data);
    }
    if(LOGIN_FAILED){
      loginFailedHandler();
    }
    if([LOGINED, LOGIN_FAILED].includes(e.data.type)){
      window.removeEventListener('message', handler);
    }
  });

  await _iframeLoad;
  _iframeWin.postMessage({
    type: DO_LOGIN,
    data,
  }, location.origin);
};

const logout = async (successHandler: Function, failHandler: Function) => {
  window.addEventListener('message', function handler(e: MessageEvent){
    if(e.data.type === LOGOUTED){
      successHandler();
    }
    if(e.data.type === LOGOUT_FAILED){
      failHandler();
    }
    if([LOGOUTED, LOGOUT_FAILED].includes(e.data.type)){
      window.removeEventListener('message', handler);
    }
  });
  await _iframeLoad;
  _iframeWin.postMessage({
    type: DO_LOGOUT
  }, location.origin);
};

export {
  init,
  login,
  logout
};


    
