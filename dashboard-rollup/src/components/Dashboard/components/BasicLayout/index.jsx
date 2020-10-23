
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Card, Space } from 'antd';
import { RadiusBottomrightOutlined } from '@ant-design/icons';
import { MailOutlined, MenuFoldOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import { structRoutes, type } from '@/utils';
import { rootPath } from '@/utils';

import styles from './styles.scss';
import { Breadcrumb, TopRightContent } from './components';

const { SubMenu } = Menu;

const createRoute = route => {
  if(route.children && route.children.some(({hideInMenu}) => !hideInMenu)){
    return route.hideInMenu || (
      <SubMenu key={route.path} icon={<MailOutlined />} title={route.name}>
        {route.children.map(_route => createRoute(_route))}
      </SubMenu>
    );
  }else{
    return route.hideInMenu || (
      <Menu.Item key={route.path} icon={<MailOutlined />}>
        <Link to={route.path}>{route.name}</Link>
      </Menu.Item>
    );
  }
};

const C = props => {
  const { topRoutes = [], leftRoutes = [], needStruct = true, content } = props;

  const location = useLocation();

  const sideRoutes = needStruct ? structRoutes(leftRoutes) : leftRoutes;

  // 设置顶部导航高亮项
  const [topSelectedKeys, setTopSelectedKeys] = useState(null);
  useEffect(() => {
    setTopSelectedKeys(rootPath(location.pathname));
  }, [location.pathname]);

  // 设置侧边导航高亮
  let validPath = rootPath(location.pathname);
  leftRoutes.filter(item => {
    if(item.hideInMenu){
      return false;
    }
    return true;
  }).forEach(item => {
    if(location.pathname.indexOf(item.path) > -1){
      validPath = validPath.length < item.path.length ? item.path : validPath;
    }
  });
  const sideSelectedKeys = [validPath];

  // 设置左侧导航宽度
  const [collapsed, setCollapsed] = useState(false);
  useEffect(() => {
    setCollapsed(leftRoutes.every(item => item.hideInMenu));
  }, [leftRoutes]);

  return (
    <div className={classNames(styles['basic-layout-container'])}>
      <div className={classNames(styles['top-nav-container'])}>
        <div className={classNames(styles['left-container'])}>
          <Space>
            <RadiusBottomrightOutlined />
            <b>杏树林大后台系统</b>
          </Space>
        </div>
        <Menu
          mode="horizontal"
          theme="dark"
          selectedKeys={topSelectedKeys}
          className={classNames(styles[''])}
        >
          {topRoutes.map(route => createRoute(route))}
        </Menu>
        <div className={classNames(styles['right-container'])}>
          <TopRightContent />
        </div>
      </div>
      <div className={classNames(styles['bottom-content-container'])}>
        <div className={classNames(styles['layout-with-side-nav-container'])}>
          <div style={{width: collapsed ? 80 : 192}} className={classNames(styles['side-nav-container'])}>
            <Menu
              style={{ width: collapsed ? 80 : 192 }}
              mode="inline"
              theme="dark"
              inlineCollapsed={collapsed}
              selectedKeys={sideSelectedKeys}
            >
              {sideRoutes.map(route => createRoute(route))}
            </Menu>
          </div>
          <div className={classNames(styles['side-nav-collapsed-icon-container'])}>
            <MenuFoldOutlined style={{color: '#fff'}} onClick={() => setCollapsed(!collapsed)}/>
          </div>
        </div>
        <div className={classNames(styles['right-content-container'])}>
          <Space direction="vertical" style={{width: '100%'}}>
            <Card>
              <Breadcrumb routes={leftRoutes} needStruct/>
            </Card>
            <Card>
              {type(content) === 'function' && content.call()}
              {props.children}
            </Card>
          </Space>
        </div>
      </div>
    </div>
  );
};

C.propTypes = {
  children: PropTypes.array,
  topRoutes: PropTypes.array,
  leftRoutes: PropTypes.array,
  needStruct: PropTypes.bool,
  content: PropTypes.func,
};

export default C;