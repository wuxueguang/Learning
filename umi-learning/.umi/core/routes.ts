import { ApplyPluginsType } from '/Users/wuxueguang/Desktop/node_modules/umi/node_modules/@umijs/runtime';
import { plugin } from './plugin';

const routes = [
  {
    "path": "/",
    "exact": true,
    "component": require('@/pages/index.js').default
  }
];

// allow user to extend routes
plugin.applyPlugins({
  key: 'patchRoutes',
  type: ApplyPluginsType.event,
  args: { routes },
});

export { routes };
