

import { message } from 'antd';

import request from '@/lib/request';

request.init({
  error: message.error.bind(message),
  warning: message.warning.bind(message),
});

export default request;