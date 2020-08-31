import React from 'react';
import {Layout, Menu , Icon} from 'antd';
import { Route, Redirect, Link } from 'react-router-dom';

import './index.scss';
import rawRouterConfig from '@/routers/rawRouterConfig'
import getAllowedRoutes from '@/routers/getAllowedRoutes';

const SubMenu = Menu.SubMenu

class Sider extends React.Component {
  render() {
      return (
        <Layout>
         <Menu className='menu' selectedKeys={[location.pathname]} mode='inline' defaultOpenKeys={['/' + location.pathname.split('/')[1]]}>
            {getAllowedRoutes(rawRouterConfig).map(item => {
              if (item.hide) {
                return null;
              }

              if (item.children && item.children.some(item => !item.hide)) {
                return (
                  <SubMenu
                    key={item.path}
                    title={
                      <span>
                        {item.icon && <Icon type={item.icon} />}
                        <span>{item.title}</span>
                      </span>
                    }
                  >
                    {item.children.filter(subItem => !subItem.hide).map(subItem => {
                      return (
                        <Menu.Item key={item.path + subItem.path}>
                          <Link to={item.path + subItem.path}>
                            {subItem.title}
                          </Link>
                        </Menu.Item>
                      )
                    })}
                  </SubMenu>
                )
              } else {
                return (
                  <Menu.Item key={item.path}>
                    <Link to={item.path}>{item.title}</Link>
                  </Menu.Item>
                )
              }
            })}
          </Menu>
        </Layout>
      );
  }
}

export default Sider;
