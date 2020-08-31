// redis config
const cn_development = {
  redisUrl: 'redis://127.0.0.1:6379'
};

const cn_staging = {
  redisUrl: 'redis://stg-redis-1.rksoaa.ng.0001.cnn1.cache.amazonaws.com.cn:6379/9'
};

const cn_production = {
  redisUrl: 'redis://:W09ize6tt7MGcA@r-2zebdb5dbb3c2b54.redis.rds.aliyuncs.com:6379/9'
};

const oregon_staging = {
  redisUrl: 'redis://stg-redis-2.ywevqj.ng.0001.usw2.cache.amazonaws.com:6379/9'
};

const oregon_production = {
  redisUrl: 'redis://prd-redis-2.ywevqj.ng.0001.usw2.cache.amazonaws.com:6379/9'
};

export default {
  cn_development,
  cn_staging,
  cn_production,
  oregon_staging,
  oregon_production
};
