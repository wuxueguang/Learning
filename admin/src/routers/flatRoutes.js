function flatRoutes (routes, path, componentParent, number = -1) {
  number ++;
  let result = [];
  if (path) {
    routes = routes.map(item => {
      const component = item.component || item.path;
      return {
        ...item,
        path: `${path}${item.path}`,
        component: `${componentParent}${component}`,
      }
    })
  }
  routes.forEach(item => {
    if (item.children) {
      if (item.component) {
        // 第一层是侧边栏的数据，不是router
        result = [...result, item];
      }
      result = [...result, ...flatRoutes(item.children, item.path, item.component, number)];
    } else {
      result = [...result, item];
    }
  })

  return result;
}

export default flatRoutes
