import store from 'store2';

import {
    TO_LOGIN,
    NO_LOGIN,
    TO_LOGOUT,
    TO_FETCH_USER_INFO,
    USER_INFO_REACHED
} from './consts';

import { login, logout } from './services';

const targetDomain = 'http://localhost:3000';

// store('logined', false);

window.addEventListener('message', async ({ data = {} }) => {
    switch(data.type){
        case TO_LOGIN: 
            const { userInfo, token } = await login(data.userInfo);

            store('logined', true);
            store('token', token);
            store('userInfo', userInfo);

            top.postMessage({
                type: USER_INFO_REACHED,
                token: store('token'),
                userInfo: store('userInfo')
            }, targetDomain);
            break;
        case TO_FETCH_USER_INFO:
            store('logined') ? top.postMessage({
                type: USER_INFO_REACHED,
                token: store('token'),
                userInfo: store('userInfo')
            }, targetDomain) : top.postMessage({
                type: NO_LOGIN
            }, targetDomain);
            break;
        case TO_LOGOUT:
            store.clear();
            logout();
            break;
    }
});

