import { match } from 'react-router';
import renderCtrl from '../controllers/render';
import SEO from 'common/utils/seo';
import ApiService from 'common/utils/api-service';

import makeStore from '../store-maker';

import { getRoutes } from '../../app/entry/www-app/routes';

const _match = (location) => new Promise((resolve, reject) => {
  match(location, (err, redirect, renderProps) => {
    if (err) {
      return reject(err);
    }

    return resolve({ redirect, renderProps });
  });
});


/**
 * 处理旧的url
 * /videos/1140 -> /videos/video-name-1140
 * /photos/1234 -> /photos/photo-name-1234
 * /playlists/2345 -> /playlists/playlist-name-2345
 * /share/videos/1234 -> /videos/video-name-1234
 * /share/videos/video-name-1234 -> /videos/video-name-1234
 * /share/playlists/2334 -> /playlists/playlist-name-2334
 * /share/playlists/playlist-name-2334 -> /playlists/playlist-name-2234
 * /vr/:identifier/photos -> /vr/:identifier/uploads/photos
 * /vr/:identifier/videos -> /vr/:identifier/uploads/videos
 * /vr/:identifier -> /vr/:identifier/home
 * /photos/untitled-66 -> /photos/linkedin-s-photo-66
 * remove m|www
 **/
const handleOldUrl = async (ctx, next, routes, store) => {
  // SEO 兼容之前的旧url
  const location = ctx.url;

  // 处理id like url
  const m = location.match(/^(\/share)?(\/videos|\/playlists|\/photos)\/(\d+)$/);
  // 处理原/photos|/videos -> /uploads/photos|/uploads/videos
  const n = location.match(/^(\/vr)(\/.*)(\/videos|\/photos)$/);
  // 处理原 /vr/:identifier -> /vr/:identifier/home
  const l = location.match(/^(\/vr)(\/.*)$/);

  // 处理之前untitled的/photos/untitled-66 -> /photos/linkedin-s-photo-66
  const untitledPhotoReg = /^\/photos(\/\u672a\u547d\u540d|\/untitled)\-(\d+)$/;

  const matchUntitledPhoto = decodeURIComponent(location).match(untitledPhotoReg);

  const { subdomains, protocol, querystring } = ctx;

  let newPath = null;
  let newUrl = null;

  if (m) {
    const type = m[2];
    const id = m[3];
    let apiKey;
    let params;

    if (type === '/videos') {
      apiKey = 'video-fetch-info';
      params = { video_id: id };
    } else if (type === '/photos') {
      apiKey = 'photo-fetch-info';
      params = { photo_id: id };
    } else {
      apiKey = 'playlist-fetch-detail';
      params = { playlist_id: id };
    }

    let item;

    try {
      item = await ApiService.invokeApi(apiKey, params);
      console.log(item);
    } catch (e) {
      const { code } = e;
      ctx.status = code;

      const { renderProps } = await _match({
        routes,
        location: `/${code}`,
      });

      return await renderCtrl(ctx, next, renderProps, store);
    }

    newPath = `${type}/${encodeURIComponent(SEO.buildSEOLink(item.data))}`;
  } else if (n) {
    const n2 = n[2];
    const type = n[3];

    const needRedirect = n2.indexOf('/uploads') === -1;

    if (needRedirect) {
      if (type === '/videos') {
        newPath = location.replace('/videos', '/uploads/videos');
      } else if (type === '/photos') {
        newPath = location.replace('/photos', '/uploads/photos');
      }
    }
  } else if (l) {
    const l2 = l[2];

    const needRedirect = l2.split('/').length === 2;

    if (needRedirect) {
      newPath = `${location}/home`;
    }
  } else if (matchUntitledPhoto) {
    const photoId = matchUntitledPhoto[2];

    const params = { photo_id: photoId };

    let item;

    try {
      item = await ApiService.invokeApi('photo-fetch-info', params);
      console.log(item);
    } catch (e) {
      const { code } = e;
      ctx.status = code;

      const { renderProps } = await _match({
        routes,
        location: `/${code}`,
      });

      return await renderCtrl(ctx, next, renderProps, store);
    }

    newPath = `/photos/${encodeURIComponent(SEO.buildSEOLink(item.data))}`;
  } else {
    // 新的share链接
    const m = location.match(/^\/share\/(videos|playlists)\/(.*)$/);

    if (m) {
      newPath = location.replace('/share', '');
    }
  }

  if (newPath) {
    let host = ctx.host;

    newUrl = `${newPath}${querystring}`;

    // 有subdomain
    if (subdomains.length > 0) {
      const subdomain = subdomains[0];

      if (subdomain === 'stgm') {
        host = host.replace('stgm', 'stg');
      } else if (/(m|www)/.test(subdomain) && !__DEV__) {
        host = host.replace(`${subdomain}.`, '');
      }

      newUrl = `${protocol}://${host}${newPath}${querystring}`;
    }
  }

  return newUrl;
};

// 访问veer.tv如果是国内IP，重定向到veervr.tv
// 访问veervr.tv如果是海外IP，重定向到veer.tv
const redirectToRightDomainUrl = () => {
  const { protocol, host, pathname } = global.location;

  let newUrl;
  const region = global.region;

  const subDomain = /^stg/.test(host) ? 'stg.' : '';

  if (region === 'China' && (host === 'veer.tv' || host === 'stg.veer.tv')) {
    newUrl = `${protocol}://${subDomain}veervr.tv${pathname}`;
  } else if (region !== 'China' && (host === 'veervr.tv' || host === 'stg.veervr.tv')) {
    newUrl = `${protocol}://${subDomain}veer.tv${pathname}`;
  }

  return newUrl;
}

const handler = async (ctx, next) => {
  const store = makeStore();
  const routes = getRoutes(store);

  //await handleOldUrl(ctx, next, routes, store);

  // if (newUrl) {
  //   ctx.status = 301;
  //   return await ctx.redirect(newUrl);
  // }

  const rightDomainUrl = redirectToRightDomainUrl();

  if (rightDomainUrl) {
    ctx.status = 302;
    return await ctx.redirect(rightDomainUrl);
  }

  // 正常的url处理
  try {
    const { redirect, renderProps } = await _match({ routes, location: ctx.url });
    if (redirect) {
      ctx.redirect(redirect.pathname + redirect.search);
    } else if (renderProps) {
      const isNotFound = renderProps.routes.filter(
        (route) => route.status === 404
      ).length > 0;

      if (isNotFound) throw ({ code: 404 });

      await renderCtrl(ctx, next, renderProps, store);
    } else {
      await next();
    }
  } catch (e) {
    // console.log('Server-Render Catch Error:');
    // console.log(e);
    const { code, stack, apiUrl } = e;

    const href = `Error @ ${location.href}`;

    if (stack) {
      console.error('%s\nServer-Render Error Occurs: %s', href, stack);
    }

    if (apiUrl) {
      const errMsg = `Invoke Api Error, apiUrl: ${apiUrl}`;
      console.error('%s\nServer-Render Error Occurs: %s', href, errMsg);
    }

    ctx.status = Number(code) || 500;

    const { renderProps } = await _match({
      routes,
      location: `/${code}`,
    });

    const useKoaTmplOnErr = renderProps.routes.filter(
      (route) => route.useKoaTmplOnErr
    ).length > 0;

    if (useKoaTmplOnErr) {
      ctx.throw(ctx.status, 'Unhandled status in react-router');
    } else {
      await renderCtrl(ctx, next, renderProps, store);
    }
  }
};

export default handler;
