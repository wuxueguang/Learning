
import isArray from 'lodash/isArray';
import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import * as Icons from '@ant-design/icons';

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

export const createMenu = menu => {
  if(menu.hideInMenu){
    return null;
  }
  const Icon = Icons['ProfileOutlined'];
  if (isArray(menu.children) && menu.children.some(({ hideInMenu }) => !hideInMenu)) {
    return (
      <Menu.SubMenu key={ menu.id } icon={ <Icon /> } title={ menu.title }>
        {menu.children.map(_menu => createMenu(_menu)) }
      </Menu.SubMenu>
    );
  } else {
    return (
      <Menu.Item key={ menu.id } icon={ <Icon /> }>
        <Link to={ menu.path }>{ menu.title }</Link>
      </Menu.Item>
    );
  }
};
