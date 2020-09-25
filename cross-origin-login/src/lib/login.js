
import axios from 'axios';

import {
    LOGOUT,
    TO_LOGIN,
    NO_LOGIN,
    TO_LOGOUT,
    TO_FETCH_USER_INFO,
    USER_INFO_REACHED
} from '../consts';

import {
    emptyFunc
} from '../utils';

import { loginSystemOrigin, loginUrl, logoutUrl } from './consts';

const _winDOMContentLoaded = new Promise(resolve => window.addEventListener('DOMContentLoaded', resolve));

const _iframe = document.createElement('iframe');
_iframe.style.display = 'none';

let _iframeWin;
(async () => {
    await _winDOMContentLoaded;
    document.body.appendChild(_iframe);
    _iframeWin = window.frames[window.frames.length - 1];
})();

const _iframeLoad = new Promise(async resolve => {
    await _winDOMContentLoaded;
    _iframe.addEventListener('load', resolve);
});

let userInfoReachedHandler = emptyFunc;
let noUserInfoReachedhandler = emptyFunc;
const _handleMessageEvent = async () => { 
    window.addEventListener('message', function handler({ data: { type, token, userInfo } }){
        const types = [USER_INFO_REACHED, NO_LOGIN];
        type === types[0] && userInfoReachedHandler({token, userInfo});
        type === types[1] && noUserInfoReachedhandler();
        types.includes(type) && window.removeEventListener('message', handler);
    });
};


const init = async (cfg, cb1, cb2) => {
    _iframe.src = `${cfg.loginSystemOrigin}/iframe.html?from=${escape(location.origin)}`;





    userInfoReachedHandler = cb1;
    noUserInfoReachedhandler = cb2;
    _handleMessageEvent();
    await _iframeLoad;
    _iframeWin.postMessage({type: TO_FETCH_USER_INFO}, loginSystemOrigin);
};


const login = async (name, password, cb1, cb2) => {
    userInfoReachedHandler = userInfoReachedHandler || cb1;
    noUserInfoReachedhandler = noUserInfoReachedhandler || cb2;
    _handleMessageEvent();
    await _iframeLoad;
    _iframeWin.postMessage({
        userInfo: {name, password},
        type: TO_LOGIN,
    }, loginSystemOrigin);
};


let _logoutHandler;
const logout = async cb => {
    window.removeEventListener('message', _logoutHandler);
    _logoutHandler = e => {
        if(e.data.type === LOGOUT){
            cb();
            window.removeEventListener('message', handler);
        }
    };
    window.addEventListener('message', _logoutHandler);
    await _iframeLoad;
    _iframeWin.postMessage({type: TO_LOGOUT}, loginSystemOrigin);
};

export {
    init,
    login,
    logout
};


    
