import _ from 'lodash';

import havePermission from '@/utils/permission';
import routeConfigs from './rawRouterConfig';

export default function getAllowedRoutes(routes = routeConfigs) {
  const allowRoutes = [];
  if (!routes) {
    return [];
  }

  routes.forEach(route => {
    if (!havePermission(route.rule)) {
      return [];
    }
    const currentRoute = _.omit(route, 'children');
    if (_.isArray(route.children)) {
      const children = getAllowedRoutes(route.children);
      currentRoute.children = children;
    }
    allowRoutes.push(currentRoute);
  });
  return allowRoutes;
}

