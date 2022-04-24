
import { isFunction, isArray, isObject } from 'lodash';
import React, { useEffect, useState } from 'react';
import { string, object, array, func, arrayOf, element, oneOfType } from 'prop-types';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { BrowserRouter as Router, Switch, Route, useHistory, useLocation, Redirect } from 'react-router-dom';
import PathCrumb from '@zhizhu/path-crumb';
// import Menus from '@zhizhu/menus';
import Menus from '../Menus';

import { Layout, Spin, Card } from 'antd';

import ProfileOps from './components/TopBarRightContent';
import Logo from './components/Logo';
import Login from './components/Login';
import Logout from './components/Logout';

import { GlobalStyle, Box, EmptyContent } from './styled';

import logoBg from './assets/content_bg.png';

const loginSs = {
  NOT_CHECKED: 'not checked',
  LOGINED: 'logined',
  LOGOUTED: 'logouted',
};

const { Header, Content, Footer } = Layout;

const LayoutWithNavsider = props => {
  const history = useHistory();
  const location = useLocation();

  const { pathDefault, logo, checkLogin, menus, children } = props;

  const [_menus, setMenus] = useState();
  const [collapsed, setCollapsed] = useState(false);
  const [loginStatus, setLoginStatus] = useState(isArray(menus) ? loginSs.LOGINED : loginSs.NOT_CHECKED);

  useEffect(() => {
    if(isArray(menus)){
      setMenus(menus);
    }else if(isFunction(menus)){
      if (isFunction(checkLogin)) {
        checkLogin().then(() => {
          setLoginStatus(loginSs.LOGINED);
          menus().then(menus => setMenus(menus));
        }).catch(() => {
          setLoginStatus(loginSs.LOGOUTED);
        });
      } else {
        // 无效checkLogin 用fetchMenus是否获取到有效数据来判断是否已登录
        menus().then(menus => {
          setMenus(menus);
          setLoginStatus(loginSs.LOGINED);
        }).catch(() => {
          setLoginStatus(loginSs.LOGOUTED);
        });
      }
    }
  }, []);

  useEffect(() => {
    if(location.pathname === '/' && pathDefault){
      history.push(pathDefault);
    }
  }, [location.pathname, pathDefault]);

  let logoEle = <Logo/>;
  if(React.isValidElement(logo)){
    logoEle = logo;
  }else if(isFunction(logo)){
    logoEle = logo(collapsed);
  }else if(isObject(logo) && isFunction(logo.render)){
    logoEle = logo.render(collapsed);
  }

  switch(loginStatus){
  case loginSs.NOT_CHECKED:
    return <Spin />;
  case loginSs.LOGOUTED:
    return <Redirect to="/login"/>;
  default:

    return isArray(_menus) && _menus.length && (
      <Box vollapced={collapsed}>
        <GlobalStyle />
        <Layout>
          <Header className="header" style={{padding: 0, backgroundColor: '#fff'}}>
            <div className="logo-box">{logoEle}</div>
            <a
              className="collapsed-icon"
              onClick={ () => setCollapsed(!collapsed) }
            >{ collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined /> }</a>
            <div className="crumb-box">
              <PathCrumb menus={ _menus } path={location.pathname} />
            </div>
            <div className="profile-box"><ProfileOps user={{userName: '龙傲天'}}/></div>
          </Header>
          <Content className="content">
            <div className="left-box">
              <Menus menus={ _menus } path={location.pathname} history={history} splitTopMenu={true} collapsed={collapsed} />
            </div>
            <div className="right-box">
              <div className="content">{children}</div>
              <Footer style={{textAlign: 'center'}}>杏树林「伙伴」系统 ©2018 Created by Xsl UED</Footer>
            </div>
          </Content>
        </Layout>
      </Box>
    );
  }
};

const OutlineLayout = props => {
  const { login, logout, children, ...others } = props;

  const [flag] = useState(Math.random().toString(16).substring(2));
  const [loginEle, setLoginEle] = useState(null);
  const [logoutEle, setLogoutEle] = useState(null);

  window.__GLOBAL_LAYOUT__ = window.__GLOBAL_LAYOUT__ || flag;

  useEffect(() => {
    if(React.isValidElement(login)){
      setLoginEle(login);
    }else if(isFunction(login)){
      setLoginEle(login());
    }else if(isObject(login) && isFunction(login.render)){
      setLoginEle(login.render());
    }else if(isObject(login)){
      setLoginEle(<Login doLogin={login.doLogin}/>);
    }
  }, [login]);

  useEffect(() => {
    if(React.isValidElement(logout)){
      setLogoutEle(logout);
    }else if(isFunction(logout)){
      setLogoutEle(logout());
    }else if(isObject(logout) && isFunction(logout.render)){
      setLogoutEle(logout.render());
    }else if(isObject(logout)){
      setLogoutEle(<Logout doLogout={logout.doLogout}/>);
    }
  }, [logout]);

  if(window.__GLOBAL_LAYOUT__ === undefined || window.__GLOBAL_LAYOUT__ === flag){
    return (
      <Router>
        <Switch>
          <Route path="/login">{loginEle}</Route>
          <Route path="/logout">{logoutEle}</Route>
          <Route path="/">
            <LayoutWithNavsider {...others}>
              <Switch>
                <Route path="/404">
                  <Card bordered={false}><span>页面不存在或者没有权限访问此页面</span></Card>
                </Route>

                {children}

                <Route path="/"><EmptyContent><img src={logoBg}/></EmptyContent></Route>
              </Switch>
            </LayoutWithNavsider>
          </Route>
        </Switch>
      </Router>
    );
  }

  return children;
};

OutlineLayout.propTypes = LayoutWithNavsider.propTypes = {
  checkLogin: func,
  pathDefault: string,
  menus: oneOfType([array, func]),

  children: oneOfType([string, element, arrayOf(element)]),

  logo: oneOfType([element, func, object]),
  login: oneOfType([element, func, object]),
  logout: oneOfType([element, func, object]),
};

export default OutlineLayout;
