import { create } from 'axios';
import { message } from 'antd';
// import logger from '@zhizhu/color-log';

const axios = create({
  validateStatus(status){
    return (status >= 200 && status < 300) || [400, 401].includes(status);
  },
});

const factory = (method = 'get') => (url = '', params = {}, cfg = {}) => {

  const config = ['get', 'delete'].includes(method.toLowerCase()) ? { params,  ...cfg } : { data: params, ...cfg };

  return new Promise((resolve, reject) => {
    axios.request({
      url,
      method,
      ...config,
    }).then(response => {

      const { status } = response;

      if(status >= 200 && status <= 300){

        const { succeed, result, resultStatus, data, reason, } = response.data;

        if (succeed || result || [1, 200].includes(resultStatus) || data) {
          resolve(data ? data : response.data);
        }else{
          reject(reason);
          message.error(reason);
        }
      }else{
        const { error, reason } = response.data;
        message.error(error || reason);
        reject(new Error(error || reason));
      }
    });
  });
};

export const get = factory();
export const post = factory('post');
export const patch = factory('patch');
export const put = factory('put');
export const _delete = factory('delete');
