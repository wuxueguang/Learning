// 子children 里面有title则在侧边栏显示，无则不显示在侧边栏里面

const routes = [
  {
    path: '/home',
    component: '/home',
    title: '首页',
  },
  {
    path: '/test',
    component: '/test',
    title: '测试菜单',
    component: '/Dashboard',
  },
  {
    title: '权限管理',
    path: '/permission',
    component: '/Permission',
    children: [{
      title: '用户管理',
      path: '/user',
      rule: 100,
      component: '/User',
    }, {
      title: '角色管理',
      path: '/role',
      rule: 200,
      component: '/Role',
    }]
  },
 {
    title: '体验区管理',
    path: '/dashboard',
    component: '/Dashboard',
    children: [{
      title: '合作方分成',
      path: '/shared',
      rule: 300,
      component: '/Shared',
    }, {
      title: '商家管理',
      path: '/settings',
      rule: 500,
      component: '/Settings',
    }]
  },
];

export default routes;
