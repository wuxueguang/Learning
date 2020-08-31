import path from 'path';
import views from 'koa-views';
import json from 'koa-json';
import convert from 'koa-convert';
import Bodyparser from 'koa-bodyparser';
import koaOnError from 'koa-onerror';
import logger from 'koa-logger';
import koaStatic from 'koa-static-plus';
import ApiService from 'common/utils/api-service';
import oauth from './oauth';

import router from './router';
import redisClient from './redis-client';

const bodyParser = Bodyparser();

const templatePath = path.join(__dirname, './templates');
const publicPath = path.join(__dirname, '..', '/dist');

const checkSearchEngine = (userAgent = null) => {
  // 'Mozilla/5.0 (compatible; Baiduspider/2.0; +http://www.baidu.com/search/spider.html)';
  // 'Sogou web spider/4.0(+http://www.sogou.com/docs/help/';
  // eslint-disable-next-line
  // 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 Safari/537.36; 360Spider';
  const searchEngineUAList = [{
    spiderName: 'baidu',
    ua: 'Baiduspider'
  }, {
    spiderName: 'sogou',
    ua: 'Sogou'
  }, {
    spiderName: '360',
    ua: '360Spider'
  }];
  let searchEngine = null;

  searchEngineUAList.every((item) => {
    const regExp = new RegExp(item.ua, 'i');
    if (regExp.test(userAgent)) {
      searchEngine = item.spiderName;
    }
  });

  return searchEngine;
};

const getLang = async (ctx) => {
  const searchEngineLangMap = {
    baidu: 'zh-CN',
    sogou: 'zh-CN',
    360: 'zh-CN'
  };
  const searchEngine = checkSearchEngine(ctx.request.header['user-agent']);
  if (searchEngine && searchEngineLangMap[searchEngine]) {
    return searchEngineLangMap[searchEngine];
  }

  let lang = ctx.cookies.get('veer-lang');
  if (!lang) {
    try {
      lang = await ApiService.invokeApi('locales-guess');
      lang = lang.data.locale;
    } catch (e) {
      lang = null;
    }
  }
  return lang || __LANG__;
};

const getRegion = async (ctx) => {
  const clientIP = ctx.ip;

  let region = null;

  if (global.__CACHE_AVAILABLE__) {
    region = await redisClient.get(`client_ip__${clientIP}_region`);
  }
  if (!region) {
    try {
      const regionRes = await ApiService.invokeApi('country-guess');
      region = regionRes.data.name;
      if (global.__CACHE_AVAILABLE__) {
        redisClient.set(`client_ip__${clientIP}_region`, region, 60 * 60);
      }
    } catch (e) {
      region = null;
    }
  }

  return region;
};

const fetchClientConfig = async () => {
  try {
    const clientConfig = await ApiService.invokeApi('client-config');
    return clientConfig.data;
  } catch (e) {
    return null;
  }
};

const register = (app) => {
  app.proxy = true;

  // 拦截不合法请求
  app.use(async (ctx, next) => {
    if (!ctx.request.header['user-agent']) {
      ctx.throw(400, 'User-Agent required');
    } else {
      await next();
    }
  });

  app.use(convert(bodyParser));
  app.use(convert(json()));
  app.use(convert(logger()));

  app.use(oauth);

  app.use(async (ctx, next) => {
    global.navigator = {
      userAgent: ctx.request.header['user-agent'],
      ip: ctx.request.ip,
    };
    global.location = {
      protocol: ctx.request.protocol,
      pathname: ctx.request.url,
      host: ctx.request.header.host,
      query: ctx.request.query,
      href: `${ctx.request.header.host}${ctx.request.url}`,
    };
    global.lang = await getLang(ctx);
    global.region = await getRegion(ctx);
    global.clientConfig = await fetchClientConfig();

    await next();
  });

  // static serve
  app.use(convert(koaStatic(publicPath)));

  app.use(views(templatePath, { extension: 'ejs' }));

  app.use(router);

  koaOnError(app);

  if (app.env === 'development') {
    app.use(async (ctx, next) => {
      const start = new Date();
      await next();
      const ms = new Date() - start;
      console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
    });
  }

  app.use(async (ctx) => {
    ctx.status = 404;
    await ctx.render('404');
  });
};

export default register;
