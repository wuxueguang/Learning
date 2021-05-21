

export const cleanPathname = dirtyPathname => {
  const url = new URL(dirtyPathname, location.origin);

  return url.pathname;
};

export const nestMenus = (menus = []) => {
  const ret = [];
  const temp = {};

  menus.forEach(menu => {
    menu = { ...menu, children: null };
    temp[menu.id] = menu;
  });

  Object.values(temp).forEach(menu => {
    if (!menu.parentId) {
      ret.push(menu);
    } else {
      const parentMenu = temp[menu.parentId];
      parentMenu.children = parentMenu.children || [];
      parentMenu.children.push(menu);
    }
  });

  return ret;
};
