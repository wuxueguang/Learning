import fs from 'fs';
import path from 'path';
import React from 'react';
// import { RouterContext } from 'react-router';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import Loadable from 'react-loadable';
import appWrapper from '../../app/entry/wrapper';
import SEO from '../../app/common/utils/seo';
import Util from '../../app/common/utils/util';
import _ from '../../app/common/utils/underscore';
import webpackAssets from '../../dist/webpack-assets.json';

const assets = {
  js: [],
  css: [],
};

if (!__DEV__) {
  // webpack assets
  assets.js.push(webpackAssets['vendor-mobile'].js);
  assets.js.push(webpackAssets.app.js);
  assets.css.push(webpackAssets.app.css);
}

let favicon;
if (__LANG__ === 'en') {
  favicon = 'https://d2pc4fqtiutuso.cloudfront.net/www-app/favicon_72cade8914acc7de84197b2b8ce38ec0.png';
} else {
  favicon = 'https://assets.veervr.tv/www-app/favicon_72cade8914acc7de84197b2b8ce38ec0.png';
}

const makeHreflang = (ctx) => {
  const hrefLangTags = [
    `<link rel="alternate" href="https://veer.tv${ctx.url}" hreflang="en" />`,
    `<link rel="alternate" href="https://veervr.tv${ctx.url}" hreflang="zh-Hans" />`,
  ];

  return hrefLangTags.join('\n');
};

const getPageTitle = (firstComp) => {
  let title = 'VeeR VR';
  let getPageTitleFunc = null;

  if (!firstComp) return title;

  if (firstComp.getPageTitle) {
    getPageTitleFunc = firstComp.getPageTitle;
  } else if (firstComp.WrappedComponent && firstComp.WrappedComponent.getPageTitle) {
    getPageTitleFunc = firstComp.WrappedComponent.getPageTitle();
  }

  if (getPageTitleFunc) {
    title = getPageTitleFunc();
  }

  return title;
};

const handler = async (ctx, next, renderProps, store) => {
  // const route = renderProps.routes[renderProps.routes.length - 1];

  let prefetchTasks = [];
  let firstComp = null;

  const App = appWrapper({ renderProps });
  for (const component of renderProps.components) {
    const page = (await component.preload()).default;
    if (!firstComp) {
      firstComp = page;
    }
    if (page && page && page.fetchData) {
      const params = _.assign({ init: true }, renderProps.params);
      const _tasks = page.fetchData(
        store.dispatch, params, location.href
      );

      if (Array.isArray(_tasks)) {
        prefetchTasks = prefetchTasks.concat(_tasks);
      } else if (_tasks.then) {
        prefetchTasks.push(_tasks);
      }
    }
  }

  await Promise.all(prefetchTasks);

  // 使用connect等HOC会把实际的component放到WrappedComponent中
  const firstWrapComp = firstComp.WrappedComponent || firstComp;

  // add meta
  let extraMeta = '';
  if (firstWrapComp && firstWrapComp.getExtraMeta) {
    extraMeta = firstWrapComp.getExtraMeta(ctx.url);
  }

  // merge seo
  let seo = SEO.DEFAULT_CONTENT;
  if (firstWrapComp && firstWrapComp.getSEO) {
    const extraSEO = firstWrapComp.getSEO();
    seo = _.assign({}, SEO.DEFAULT_CONTENT, _.omitBy(extraSEO, _.isNil, _.isEmpty));
  }

  const useHotjar = firstWrapComp ? firstWrapComp.useHotjar : false;

  const title = seo.title || getPageTitle(firstComp);
  await ctx.render('index', {
    title,
    reduxData: store.getState(),
    app: renderToString(
      <Provider store={store}>
        <Loadable.Capture report={(moduleName) => {console.log(moduleName)}}>
          <App />
        </Loadable.Capture>
      </Provider>
    ),
    assets,
    seo,
    favicon,
    isDomestic: Util.isDomestic,
    isServer: true,
    isIOS: Util.isIOS(),
    isWechat: Util.isWeChat() && Util.isDomestic,
    // eslint-disable-next-line
    isProd: __PROD__,
    env: __APP_ENV__,
    extraMeta,
    useHotjar,
    hrefLangTag: makeHreflang(ctx),
  });
};

export default handler;
