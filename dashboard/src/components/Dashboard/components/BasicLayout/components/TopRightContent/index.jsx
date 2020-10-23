
import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Menu, Dropdown, Space } from 'antd';
import { observer } from 'mobx-react';
import { UserOutlined } from '@ant-design/icons';
import { userInfo } from '@/store';

import styles from './styles.scss';

const menu = (
  <Menu theme="dark">
    <Menu.Item>
      <Link to="/logout">退出</Link>
    </Menu.Item>
  </Menu>
);

const C = () => {
  const { user } = userInfo;

  return (
    <Dropdown overlay={menu} placement="bottomRight">
      <a className={classNames(styles['user-outlined'])}>
        <Space>
          <UserOutlined />
          <span style={{color: '#fff'}}>{user.name}</span>
        </Space>
      </a>
    </Dropdown>
  );
};

export default observer(C);