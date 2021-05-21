
import isArray from 'lodash/isArray';

export const flatMenus = menus => {
  const ret = {};

  const inner = item => {
    if(isArray(item.subMenus)){
      item.subMenus.forEach(item => inner(item));
    }
    ret[item.path] = item;
  };

  (isArray(menus) ? menus : []).forEach(item => inner(item));

  return ret;
};
