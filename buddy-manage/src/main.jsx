import 'antd/dist/antd.css';

import { isArray } from 'lodash';
import React, { Suspense } from 'react';
import { Card, Spin } from 'antd';
import { render } from 'react-dom';
import { Route, } from 'react-router-dom';

import './style.less';

import { get, post } from './utils/axios';
// import OutlineLayout from '@zhizhu/outline-layout';
import OutlineLayout from './components/OutlineLayout';

import routes from './routes';

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

const doLogin = values => Promise.all([
  post('/proxied/bmapi/login', {
    username: values.name,
    password: values.password,
  }),
  post('/api/auth-api/login', {
    username: values.name,
    password: values.password,
  })
]);

const doLogout = () => new Promise(resolve => setTimeout(resolve, 1000));

const App = () => {
  return (
    <OutlineLayout
      logo={null}
      checkLogin={null}
      pathDefault="/project"
      menus={fetchMenus}

      login={{doLogin}}
      logout={{doLogout}}
    >
      {/** content container start */}

      {routes.map(({ path, Component }) => {
        return (
          <Route path={path} key={path}>
            <Card bordered={false}>
              <Suspense fallback={<Spin/>}>
                <Component/>
              </Suspense>
            </Card>
          </Route>
        );
      })}

      {/** content container end */}
    </OutlineLayout>
  );
};


render(<App />, document.getElementById('root'));



