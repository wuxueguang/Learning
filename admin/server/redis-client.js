import { promisify } from 'util';

// require('util.promisify').shim(); // TODO: 服务器 node 版本升至 8+ 之后不需要此包

const client = global.redisClient;
const redisClient = {
  get: (key) => promisify(client.get).call(client, key)
    .catch((err) => {
      console.error(`[Redis Error]: get key: ${key} Error: ${err}`);
    }),
  set: (key, value, expire) => promisify(client.set).call(client, key, value)
    .then((res) => {
      // eslint-disable-next-line
      console.log(`[Redis] set ${key}: ${res}`);
      if (typeof expire !== 'undefined') {
        redisClient.expire(key, expire);
      }
      return res;
    })
    .catch((err) => {
      console.error(`[Redis Error]: set key: ${key}, value: ${value} Error: ${err}`);
    }),
  expire: (key, expire) => promisify(client.expire).call(client, key, expire)
    .then((res) => {
      // eslint-disable-next-line
      console.log(`[Redis]:  key: ${key} Cache Expire Set Success ${expire}`);
      return res;
    })
    .catch((err) => {
      console.error(`[Redis Error]:  key: ${key} Cache Expire Set Error: ${err}`);
    })
};

export const APIRedisCache = {
  APIKey: (url) => `API__${encodeURIComponent(url)}__${global.lang}__${global.region}`,
  get: (url) => redisClient.get(APIRedisCache.APIKey(url)),
  set: (url, value, expire) => {
    const DEFAULT_CACHE_TIME = 60 * 60 * 24;
    return redisClient.set(APIRedisCache.APIKey(url), value, expire || DEFAULT_CACHE_TIME);
  }
};

export default redisClient;
