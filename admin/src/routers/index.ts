import _ from 'lodash';
import Loadable from 'react-loadable';
import React, { Suspense } from 'react';
import rawRouterConfig from './rawRouterConfig';
import getAllowedRoutes from './getAllowedRoutes';
import flatRoutes from './flatRoutes';
// import { injectAsyncReducer } from '@/store_old';
// import LoadingComponent from '@/components/loading'

// const loadPage = pageName => {
//   console.log(pageName, 'pageNamepageName')
//   return () => { import(`@/pages${pageName}/index.tsx`)} ;
// };

// const loader = (val) => {
//  return Loadable({
//     loading: 'loading',
//     loader: loadPage(val.component || val.path),
//   })
// }


function getRouteConfig() {
  const flatRouteConfig = flatRoutes(getAllowedRoutes(rawRouterConfig));
  return _.map(flatRouteConfig, val => {
    return {
      key: val.key || val.path,
      component: React.lazy(() => {
        console.log(val, '======')
        // let commentsReducer = require(`../reducers/${val.key}`).default;
        // injectAsyncReducer(store, val.key, commentsReducer);
        return import(`@/pages${val.component}/index.tsx`)
      }),
      // component: loader(val),
      path: val.path,
    };
  });
}

export default getRouteConfig;
