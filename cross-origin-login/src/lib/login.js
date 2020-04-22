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

const _winDOMContentLoaded = new Promise(resolve => window.addEventListener('DOMContentLoaded', resolve));

const _targetDomain = 'http://localhost:8000';
const _iframe = document.createElement('iframe');
_iframe.src = `${_targetDomain}/iframe.html`;
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

const _handleMessageEvent = async (userInfoReachedHandler = emptyFunc, noLoginHandler = emptyFunc) => { 
    window.addEventListener('message', function handler({ data: { type, token, userInfo } }){
        const types = [USER_INFO_REACHED, NO_LOGIN];
        type === types[0] && userInfoReachedHandler({token, userInfo});
        type === types[1] && noLoginHandler();
        types.includes(type) && window.removeEventListener('message', handler);
    });
};



const init = async (cb1, cb2) => {
    _handleMessageEvent(cb1, cb2);
    await _iframeLoad;
    _iframeWin.postMessage({type: TO_FETCH_USER_INFO}, _targetDomain);
};

const login = async (name, password, cb1, cb2) => {
    _handleMessageEvent(cb1, cb2);
    await _iframeLoad;
    _iframeWin.postMessage({
        userInfo: {name, password},
        type: TO_LOGIN,
    }, _targetDomain);
};

const logout = async cb => {
    window.addEventListener('message', function handler(e){
        if(e.data.type === LOGOUT){
            cb();
            window.removeEventListener('message', handler);
        }
    });
    await _iframeLoad;
    _iframeWin.postMessage({type: TO_LOGOUT}, _targetDomain);
};

export {
    init,
    login,
    logout
};


    
