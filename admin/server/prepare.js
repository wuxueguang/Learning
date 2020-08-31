const redis = require('redis');
// const assetRequireHook = require('asset-require-hook');

const config = require('./config');

const {
  NODE_ENV, CONFIG_ENV, DEFAULT_LANG, REVISION, CACHE, STATIC
} = process.env;
const appEnv = CONFIG_ENV || NODE_ENV;

global.__SERVER__ = true;
global.__CLIENT__ = false;
global.__APP_ENV__ = appEnv;
global.__DEV__ = appEnv === 'development';
global.__STAGING__ = appEnv === 'staging';
console.log(appEnv === 'production');
global.__PROD__ = appEnv === 'production';
global.__LANG__ = DEFAULT_LANG || 'en';
global.__REVISION__ = REVISION || 'dev';
// global.__CACHE_AVAILABLE__ = !__DEV__ && CACHE !== 'false';
global.__CACHE_AVAILABLE__ = false;

const LangMap = {
  'zh-CN': 'cn',
  en: 'oregon',
  jp: 'oregon'
};
console.log(`${LangMap[global.__LANG__]}_${appEnv}`)
const configString = `${LangMap[global.__LANG__]}_${appEnv}`;

global.__CONFIG__ = config[configString];

// if (global.__CACHE_AVAILABLE__) {
//   const client = redis.createClient({
//     url: global.__CONFIG__.redisUrl
//   });
//   client.on('error', (err) => {
//     console.error(`[Redis Error] redis Error: ${err}`);
//     global.__CACHE_AVAILABLE__ = false;
//   });
//   client.on('connect', () => {
//     console.log('[Redis] redis connect success!');
//   });
//   global.redisClient = client;
// }

let assetsPathPrefix;
if (__DEV__) {
  if (STATIC) {
    assetsPathPrefix = `http://localhost:${process.env.PORT || 2008}`;
  } else {
    assetsPathPrefix = `http://localhost:${process.env.PORT_DEV || 2008}`;
  }
} else if (__LANG__ === 'en') {
  assetsPathPrefix = 'https://d2df2pjg8l347k.cloudfront.net/ironman';
} else {
  assetsPathPrefix = 'https://assets.veervr.tv/ironman';
}

// assetRequireHook({
//   extensions: ['jpg', 'jpeg', 'png', 'gif', 'tif', 'tiff', 'webp'],
//   name: `${assetsPathPrefix}/images/[name]_[hash].[ext]`,
//   limit: 1024
// });
