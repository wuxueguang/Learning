

import React, { useState, useEffect } from 'react';
import { Breadcrumb } from 'antd';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import { structRoutes } from '@/utils';

const tileRoute = ({name, path, children}, ret) => {
  ret = ret || {};
  const hasChildren = Array.isArray(children) &&
    children.length > 0 &&
    children.some(({hideInMenu}) => !hideInMenu);
  
  ret[path] = {name, path, hasChildren};
  if(Array.isArray(children)){
    children.forEach(route => {
      tileRoute(route, ret);
    });
  }
  return ret;
};

const C = props => {
  const { routes = [], needStruct = false } = props;
  const location = useLocation();
  
  const [sideRoutes, setSideRoutes] = useState([]);
  useEffect(() => {
    let tmp = {};
    (needStruct ? structRoutes(routes) : routes).forEach(route => {
      tmp = Object.assign({}, tmp, tileRoute(route));
    });
    setSideRoutes(tmp);
  }, [routes]);

  const [crumbs, setCrumbs] = useState([]);
  useEffect(() => {
    const crumbs = [];
    const paths = location.pathname.replace(/^\//, '').split('/');
    let tmpPath = '';
    let tmpRoute;
    paths.forEach(path => {
      tmpPath += `/${path}`;
      tmpRoute = sideRoutes[tmpPath];
      if(tmpRoute){
        crumbs.push({
          path: tmpPath,
          name: tmpRoute.name,
          hasChildren: tmpRoute.hasChildren,
        });
      }
    });
    setCrumbs(crumbs);
  }, [sideRoutes, location.pathname]);

  return (
    <Breadcrumb>
      {
        crumbs.map((item, idx) => {
          return (
            <Breadcrumb.Item key={item.path}>
              {
                item.hasChildren || (idx + 1) === crumbs.length ? (
                  <span>{item.name}</span>
                ) : (
                  <Link to={item.path}>{item.name}</Link>
                )
              }
            </Breadcrumb.Item>
          );
        })
      }
    </Breadcrumb>
  );
};

C.propTypes = {
  routes: PropTypes.array,
  needStruct: PropTypes.bool,
};

export default C;