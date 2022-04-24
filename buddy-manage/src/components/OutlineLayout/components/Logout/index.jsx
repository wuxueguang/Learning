
import React, { useEffect, useState } from 'react';
import { func } from 'prop-types';
import { Redirect } from 'react-router-dom';
import { Spin } from 'antd';

const Logout = props => {
  const [loading, setLoading] = useState(true);

  const { doLogout } = props;

  useEffect(() => {
    doLogout().then(() => setLoading(false));
  }, []);

  return loading ? <Spin /> : <Redirect to="/login"/>;
};

Logout.propTypes = {
  doLogout: func,
};

export default Logout;
