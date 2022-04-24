
import { lazy } from 'react';

export default [{
  path: '/auth/system/menu',
  Component: lazy(() => import('@/pages/menus-editor')),
}];
