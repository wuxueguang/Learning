
import isFunc from 'lodash/isFunction';
import isArray from 'lodash/isArray';
import isFunction from 'lodash/isFunction';
import React, { useEffect, useState } from 'react';
import { Spin } from 'antd';
import { string, object, func, array, element, oneOfType } from 'prop-types';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import PathCrumb from './components/PathCrumb';
import Menus from './components/Menus';

import { GlobalStyle, Box } from './styled';

const LayoutWithNavsider = props => {
  const { logo, checkLogin, fetchMenus, children } = props;
  const [menus, setMenus] = useState();
  const [inlineCollapsed, setInlineCollapsed] = useState(false);

  const [logined, setLogined] = useState(null);

  useEffect(() => {
    if (isFunction(checkLogin)) {
      checkLogin().then(() => {
        setLogined(true);
      }).catch(() => {
        setLogined(false);
      });
    } else {
      fetchMenus().then(menus => {
        setMenus(menus);
        setLogined(true);
      }).catch(() => {
        setLogined(false);
      });
    }
  }, []);

  useEffect(() => {
    if (logined && !isArray(menus)) {
      fetchMenus().then(menus => setMenus(menus));
    }
  }, [logined, menus]);

  if (logined === null) {
    return <Spin />;
  }

  if (!logined) {
    return <Redirect to="/login" />;
  }

  return isArray(menus) && (
    <Box>
      <GlobalStyle />
      <div className="left-box expanded">
        <div className="logo-box">{ isFunc(logo) ? logo(inlineCollapsed) : logo }</div>
        <div className="menus-box">
          <Menus menus={ menus } splitTopMenu={ true } inlineCollapsed={ inlineCollapsed } />
        </div>
      </div>
      <div className="right-box">
        <div className="top-box">
          <a
            className="collapsed-icon"
            onClick={ () => setInlineCollapsed(!inlineCollapsed) }
          >{ inlineCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined /> }</a>
          <PathCrumb menus={ menus } />
        </div>
        <div className="bottom-box">
          { children }
        </div>
      </div>
    </Box>
  );
};

const App = props => {
  const { children, ...others } = props;

  return (
    <Router>
      <Switch>
        <Route path="/login">
          <span>login</span>
        </Route>
        <Route path="/">
          <LayoutWithNavsider { ...others }>
            <Route path="/404">
              <span>页面不存在或者没有权限访问此页面</span>
            </Route>
            {children}
          </LayoutWithNavsider>
        </Route>
      </Switch>
    </Router>
  );
};

App.propTypes = LayoutWithNavsider.propTypes = {
  checkLogin: func,
  fetchMenus: func,
  children: oneOfType([string, object, array]),
  logo: oneOfType([element, func])
};

export default App;
