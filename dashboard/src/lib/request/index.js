
import axios from 'axios';
import { message } from 'antd';
import { SUCCESS_STATUS } from './consts';


// const message = {
//   error: () => console.log('没有自定义 message.error 方法'),
//   warning: () => console.log('没有自定义 message.warning 方法')
// };

const inst = axios.create();

inst.interceptors.request.use(function (config) { // 在发送请求之前做些什么
  // eslint-disable-next-line no-undef
  if(process.env.NODE_ENV === 'development'){
    console.log('%cRequest start:', 'background-color: #000; color: #0f0; font-weight: bold;', config);
  }
  return config;

}, function (error) { // 对请求错误做些什么
  return Promise.reject(error);
});

inst.interceptors.response.use(res => { // 对响应数据做点什么
  const cfg = res.config;
  if(cfg.getResponse){
    return res;
  }else{
    if(res.data.status === SUCCESS_STATUS){
      return {
        headers: res.headers,
        ...res.data
      };
    }else{
      return res.data;
    }
  }
}, function (error) { // 对响应错误做点什么
  message.error(error.toString());
  return Promise.reject(error.toString());
});

inst.init = ({ error, warning }) => {
  message.error = error || message.error;
  message.warning = warning || message.warning;
  return inst;
};

export default inst;
