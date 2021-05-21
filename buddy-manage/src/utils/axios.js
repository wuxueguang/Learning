import { create } from 'axios';
import { message } from 'antd';
import logger from '@zhizhu/color-log';

const axios = create({
  validateStatus(status){
    return (status >= 200 && status < 300) || [400].includes(status);
  },
});

const factory = (method = 'get') => (url = '', params = {}) => {

  const arrs = ['get', 'delete'].includes(method.toLowerCase()) ? { params } : params;

  return new Promise((resolve, reject) => {
    axios[method](url, arrs).then(response => {

      logger(url, response);

      const { status } = response;

      if(status >= 200 && status <= 300){

        const { result, resultStatus, data, reason, } = response.data;

        if (result || [1, 200].includes(resultStatus) || data) {
          resolve(data);
        }else{
          reject(reason);
          message.error(reason);
        }
      }else{
        const { error } = response.data;
        message.error(error);
        reject(new Error(error));
      }
    });
  });
};

export const get = factory();
export const post = factory('post');
export const patch = factory('patch');
export const put = factory('put');
export const _delete = factory('delete');
