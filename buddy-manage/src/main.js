import 'antd/dist/antd.less';

import React, { useEffect, useState } from 'react';
import { render } from 'react-dom';
import { Card } from 'antd';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// import Image from '@zhizhu/image';

// import { Pagination } from 'antd';
import { get, post, patch, _delete } from './utils/axios';
import LayoutWithNavsider from './components/LayoutWithNavsider';

import isArray from 'lodash/isArray';

import MenusEidt from './components/MenusEdit';

const flatMenus = menus => {
  const ret = [];

  const inner = (item, parentId) => {
    if (isArray(item.subMenus)) {
      item.subMenus.forEach(subitem => inner(subitem, item.key));
    }
    item.id = item.key;
    item.title = item.name;
    item.parentId = parentId;
    item.subMenus = null;
    ret.push(item);
  };

  menus.forEach(item => inner(item, null));

  return ret;
};

const fetchMenus = () => new Promise((resolve, reject) => {
  get('/proxied/bmapi/users/current').then(data => {
    resolve(flatMenus(data.menus));
  }).catch(err => reject(err));
});

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

const App = () => {

  return (
    <Router>
      <LayoutWithNavsider
        fetchMenus={ fetchMenus }
      >
        <Card bordered={ false }>
          <Switch>
            <Route path="/auth/system/menu">
              <MenusEidt
                addMenu={ addMenu }
                updateMenu={ updateMenu }
                deleteMenu={ deleteMenu }
                fetchMenus={ fetchAllMenus }
              />
            </Route>
          </Switch>

        </Card>
      </LayoutWithNavsider>
    </Router>

  );
};


render(<App />, document.getElementById('root'));



