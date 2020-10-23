import React, { useEffect} from 'react';
import { func, array } from 'prop-types';
import { BrowserRouter as Router, Route, Redirect, useLocation } from 'react-router-dom';
import { Spin } from 'antd';
import { observer } from 'mobx-react';
import { Login, Logout, BasicLayout } from './components';
import { userInfo } from '@/store';

export const Context = React.createContext({userInfo: {}});

const Inner = props => {
  const { topRoutes, leftRoutes, content } = props;
  const location = useLocation();

  useEffect(() => {
    userInfo.fetchLoginStatus();
  }, []);

  if(!['/login', '/logout'].includes(location.pathname)){
    switch(userInfo.logined){
    case undefined:
      return (
        <Spin spinning style={{width: '100vw', height: '100vh'}} />
      );
    case false:
      return (
        <Redirect to="/login" />
      );
    case true:
      return (
        <Context.Provider value={{user: userInfo.user}}>
          <BasicLayout
            topRoutes={topRoutes}
            leftRoutes={leftRoutes}
            content={content}
          />
        </Context.Provider>
      );
    }
  }
  return null;
};

Inner.propTypes = {
  topRoutes: array,
  leftRoutes: array,
  content: func,
};

const C = observer(Inner);

export default observer(props => {
  const { leftRoutes = [], topRoutes = [], content = () => {} } = props;

  return (
    <Router base="/">
    
      <Route path="/">
        <C {...{topRoutes, leftRoutes, content}} />
      </Route>

      <Route path="/login" exact>
        <Login userInfo={userInfo} />
      </Route>

      <Route path="/logout" exact>
        <Logout userInfo={userInfo} />
      </Route>

    </Router>
  );
});



