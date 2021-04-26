


import Mock from 'mockjs';


export default Mock.mock({
  total: 88,
  'result|20': [{
    userName: 'user name',
    avatar: '用户头像',   // 用户头像
    province: '省份',
    city: '城市',
    createTime: Date.now(),
    description: '获得一枚勋章',
  }],
});
