

import Mock from 'mockjs';


export default Mock.mock({
  userId: 234,
  title: '主题',
  viewCount: 999,
  serverUpdateTime:  Date.now(), // 更新时间
  serverCreateTime: Date.now(), // 创建时间
  data: '<p>test</p>',
  likeCount: 78, // 点赞数量
  isLiked: false,
});
