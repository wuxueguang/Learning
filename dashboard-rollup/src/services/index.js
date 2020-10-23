
import { request } from '@/utils';

const factory = method => (...args) => new Promise((resolve, reject) => {
  request[method](...args).then(res => {
    const { status, message, data, } = res;
    if(status === 1){
      resolve(data);
    }else{
      reject(message);
    }
  }).catch(err => {
    reject(err);
  });
});

const get = factory('get');
const post = factory('post');

const c = v => `/api/${v}`;
const uris = {
  login: c('login'),
  loginStatus: c('loginStatus'),
  logout: c('logout'),
};

export const login = data => post(uris.login, data);
export const fetchLoginStatus = () => ({status: 1, data: {user: {name: 'test'}}});//get(uris.loginStatus);
export const logout = () => post(uris.logout);
