
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

let loginOrigin;
const docLoaded = new Promise(resolve => {
  document.addEventListener('DOMContentLoaded', resolve);
});
const _iframe = document.createElement('iframe');
const _iframeLoad = new Promise(resolve => {
  _iframe.addEventListener('load', resolve);
});

const init = async (cfg, loginedHandler, otherCasesHandler) => {
  const _cfg = {
    loginPath: cfg.loginPath,
    logoutPath: cfg.logoutPath,
    sourceOrigin: location.origin,
    loginStatusPath: cfg.loginStatusPath || cfg.loginPath,
  };
  loginOrigin = cfg.loginOrigin;

  _iframe.src = `${cfg.loginOrigin}/${cfg.iframePath.replace(new RegExp('^/'), '')}?${qs.stringify(_cfg)}`;
  _iframe.style.display = 'none';
  
  docLoaded.then(() => {
    document.body.appendChild(_iframe);
  });
  
  window.addEventListener('message', function handler(event){
    const { data: { type, data } } = event;
    if(type === LOGIN_STATUS_REACHED){
      loginedHandler(data);
    }
    if(type === FETCH_LOGIN_STATUS_FAILED){
      otherCasesHandler();
    }
    if([LOGIN_STATUS_REACHED, FETCH_LOGIN_STATUS_FAILED].includes(type)){
      window.removeEventListener('message', handler);
    }
  });

  _iframeLoad.then(() => {
    _iframe.contentWindow?.postMessage({type: FETCH_LOGIN_STATUS}, '*');
  });
};

const login = async (data, loginedHandler, loginFailedHandler) => {
  window.addEventListener('message', function handler(e){
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
  _iframe.contentWindow?.postMessage({
    data,
    type: DO_LOGIN,
  }, '*');
};

const logout = async (successHandler, failHandler) => {
  window.addEventListener('message', function handler(e){
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
  _iframe.contentWindow?.postMessage({
    type: DO_LOGOUT
  }, '*');
};

export {
  init,
  login,
  logout
};


    
