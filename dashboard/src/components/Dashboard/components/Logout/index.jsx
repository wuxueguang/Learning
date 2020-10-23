
import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { observer, PropTypes } from 'mobx-react';
import { Spin } from '@/components';

const styles = {
  width: '100wh',
  height: '100vh',
  lineHeight: '100vh',
  textAlign: 'center',
};

const C = props => {
  const { userInfo } = props;

  useEffect(() => {
    if(userInfo.logined){
      userInfo.doLogout();
    }
  }, [userInfo.logined]);

  return userInfo.logined ? (
    <div style={styles}>
      <b>doing logout...</b>
    </div>
  ) : (
    <Redirect to="/login" />
  );
};

C.propTypes = {
  userInfo: PropTypes.observableObject,
};

export default observer(C);