import { isArray } from 'lodash';
import React from 'react';
import MenusEidt from '@zhizhu/menus-edit';

import { get, post, patch, _delete } from '@/utils/axios';

const fetchAllMenus = () => new Promise((resolve, reject) => {
  get('/proxied/bmapi/menus').then(menus => {
    const inner = menus => {
      menus.forEach(menu => {
        menu.id = menu.uid;
        menu.parentId = menu.parentUid;
        if (isArray(menu.children)) {
          inner(menu.children);
        }
      });
    };
    if (isArray(menus)) {
      inner(menus);
      resolve(menus);
    } else {
      reject();
    }
  }).catch(err => {
    reject(err);
  });
});

const addMenu = menu => new Promise((resolve, reject) => {
  const { name, path, icon, parentId } = menu;

  post('/proxied/bmapi/menus', {
    name,
    path,
    icon,
    // hideInMenus,
    parent_uid: parentId,
  }).then(() => {
    resolve();
  }).catch(err => {
    reject(err);
  });
});

const updateMenu = (menu) => new Promise((resolve, reject) => {
  const { id, name, path, icon, parentId } = menu;

  patch(`/proxied/bmapi/menus/${menu.id}`, {
    name,
    path,
    icon,
    uid: id,
    // hideInMenus,
    parent_uid: parentId,
  }).then(() => {
    resolve();
  }).catch(err => {
    reject(err);
  });
});

const deleteMenu = (menu) => new Promise((resolve, reject) => {
  _delete(`/proxied/bmapi/menus/${menu.id}`).then(() => {
    resolve();
  }).catch(err => {
    reject(err);
  });
});

const MenusEditor = () => {
  return (
    <MenusEidt
      addMenu={addMenu}
      updateMenu={updateMenu}
      deleteMenu={deleteMenu}
      fetchMenus={fetchAllMenus}
    />
  );
};

export default MenusEditor;


