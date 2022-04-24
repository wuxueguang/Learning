import { isFunction, isObject } from 'lodash';
import React, { useState, useEffect } from 'react';
import { oneOfType, object, func } from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Menu, Dropdown } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import Space from '../Space';
import styles from './styles.scss';

const ProfileOps = props => {
  const { user } = props;
  const [userInfo, setUserInfo] = useState();

  useEffect(() => {
    if(isFunction(user)){
      user().then(data => setUserInfo(data));
    }else{
      setUserInfo(user);
    }
  }, []);

  const menu = (
    <Menu>
      <Menu.Item key="profile">
        <Link to={`/profile/${user.userId}`} className={classNames(styles['menu'])}>
          <Space>
            <UserOutlined />
            <span>个人信息</span>
          </Space>
        </Link>
      </Menu.Item>
      <Menu.Item key="logout">
        <Link to="/logout" className={classNames(styles['menu'])}>
          <Space>
            <LogoutOutlined />
            <span>退出登录</span>
          </Space>
        </Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} placement="bottomRight">
      <a className={classNames(styles['user-outlined'])}>
        <Space>
          <UserOutlined />
          {isObject(userInfo) && <span>{userInfo.userName}</span>}
        </Space>
      </a>
    </Dropdown>
  );
};

ProfileOps.propTypes = {
  user: oneOfType([object, func]),
};

export default ProfileOps;
