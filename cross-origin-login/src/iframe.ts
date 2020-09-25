
import qs from 'querystring';

import axios from 'axios';

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

window.addEventListener('message', async (e) => {
    const { data: { type, data }} = e;
    switch(type){
        case DO_LOGIN: 
            const loginUrl = `${loginOrigin}/${loginPath.replace(new RegExp('^/'), '')}`;
            try{
                const res = await axios.post(loginUrl, data);

                top.postMessage({
                    type: LOGINED,
                    userInfo: res.data.userInfo,
                }, sourceOrigin);
            }catch(err){
                top.postMessage({
                    type: LOGIN_FAILED,
                }, sourceOrigin);
            }
            
            break;
        case FETCH_LOGIN_STATUS:
            const loginStatusUrl = `${loginOrigin}/${loginStatusPath.replace(new RegExp('^/'), '')}`;

            try{
                const res = await axios.post(loginStatusUrl);

                top.postMessage({
                    type: LOGIN_STATUS_REACHED,
                    userInfo: res.data.userInfo,
                }, sourceOrigin);
            }catch(err){
                top.postMessage({
                    type: FETCH_LOGIN_STATUS_FAILED,
                }, sourceOrigin);
            }
            
            break;
        case DO_LOGOUT:
            const logoutUrl = `${loginOrigin}/${logoutPath.replace(new RegExp('^/'), '')}`;
            try{
                const res = await axios.post(logoutUrl);

                top.postMessage({
                    type: LOGOUTED,
                }, sourceOrigin);
            }catch(err){
                top.postMessage({
                    type: LOGOUT_FAILED,
                }, sourceOrigin);
            }
            
            break;
    }
});

