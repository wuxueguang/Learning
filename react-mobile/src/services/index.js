import axios from 'axios';
// import logger from '@zhizhu/color-log';
// import { error } from 'Components/Toasts';

const factory = (method = 'get') => async (url = '', params = {}, cfg = {}) => {

  const arrs = ['get', 'delete'].includes(method.toLowerCase()) ? {
    url,
    method,
    params,
    ...cfg,
  } : {
    url,
    method,
    data: params,
    ...cfg
  };

  try{
    // info('准备发送请求到服务器');
    const res = await axios.request(arrs);
    // info('服务器成功返回');
    // logger('fetch data', res);

    const { data: { resultStatus, data, reason } } = res;

    if([1, 200].includes(resultStatus) || data){
      return data;
    }
    throw new Error(reason || '服务器无有效数据返回');
  }catch(err){
    // error(`请求异常：${err.message}`);
  }
};

const get = factory();
const post = factory('post');
const patch = factory('patch');
const put = factory('put');
const _delete = factory('delete');


let baseUrl = location.protocol + '//qa-lite-project.xingshulin.com';
let baseUrl2 = location.protocol + '//qa-gateway.xingshulin.com/cloud-academy-content';

let userUrl = location.protocol + '//qa-uas.xingshulin.com/profile/default/user/_profile';

if( /^webpage/.test(window.location.host) ){
  baseUrl = location.protocol + '//lite-project.xingshulin.com';
  baseUrl2 = location.protocol + '//gateway.xingshulin.com/cloud-academy-content';
  userUrl = location.protocol + '//uas.xingshulin.com/profile/default/user/_profile';
}

const urls = {
  currentUser: userUrl,

  heroList:  baseUrl + '/lbky/reward/rank',
  medalGotList: baseUrl + '/lbky/reward/record/page',

  heroStory: baseUrl2 + '/public/post/get',
  storyReaded: baseUrl2 + '/public/track/user/view',

  storyDetail: baseUrl2 + '/proxy/api/v4/gdoc/detail',
  likeStory: baseUrl2 + '/proxy/api/v4/gdoc/like/',

  isStoryLiked: baseUrl2 + '/proxy/api/v4/gdoc/has-liked',
};

const allowCrossOrign = {
  withCredentials: true,
};

export const fetchCurrentUser = () => get(urls.currentUser, null, { ...allowCrossOrign });//get(urls.currentUser, null, { withCredentials: true });

export const fetchHeroList = () => get(urls.heroList, null, { ...allowCrossOrign });


export const fetchMedalGetedRecords = params => get(urls.medalGotList, params, { ...allowCrossOrign });


export const fetchHeroStories = ({
  pageSize,
  pageIndex,
  groupUid,
  id,
}) => post(`${urls.heroStory}?pageSize=${pageSize}&pageIndex=${pageIndex}`, {
  groupUid,
  id,
}, { ...allowCrossOrign });


export const fetchStoryDetail = params => get(`${urls.storyDetail}/${params.id}`, null, { ...allowCrossOrign });
export const tellStoryReaded = params => post(urls.storyReaded, params, { ...allowCrossOrign });
export const likeStory = params => post(`${urls.likeStory}/${params.shareUid}`, null, { ...allowCrossOrign });
export const checkStoryIsLiked = params => get(`${urls.isStoryLiked}/${params.shareUid}`, null, { ...allowCrossOrign });
