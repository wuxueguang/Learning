import { init, login, logout } from './lib/login';
import { log } from './utils';

init(({userInfo}) => {
    log('init', JSON.stringify(userInfo));
    logout()
}, () => {
    login('wxg315699', '123123', ({token, userInfo}) => {
        log('login', token, userInfo);
        // alert(JSON.stringify(userInfo))
    })
})

