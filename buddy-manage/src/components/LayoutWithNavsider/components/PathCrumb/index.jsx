
import isObject from 'lodash/isObject';
import isArray from 'lodash/isArray';
import React, { useEffect, useState } from 'react';
import { array } from 'prop-types';
import { useLocation } from 'react-router-dom';
import { Breadcrumb } from 'antd';
import { cleanPathname } from '../../utils';

const PathCrumb = props => {
  const { menus } = props;
  const location = useLocation();
  const [crumbs, setCrumbs] = useState();
  const [menuPathMap, setMenuPathMap] = useState();
  const [menuIdMap, setMenuIdMap] = useState();

  useEffect(() => {

    if (isArray(menus) && menus.length > 0) {
      const pathMap = {};
      const idMap = {};
      menus.forEach(menu => {
        pathMap[cleanPathname(menu.path)] = menu;
        idMap[menu.id] = menu;
      });
      setMenuPathMap(pathMap);
      setMenuIdMap(idMap);
    }

  }, [menus]);

  useEffect(() => {

    const inner = pathName => {
      if(pathName.length){
        let menu = menuPathMap[pathName];
        if (isObject(menu)) {
          if (menuPathMap) {
            const titles = [];
            const inner = menu => {
              titles.push(menu.title);
              if (menu.parentId) {
                inner(menuIdMap[menu.parentId]);
              }
            };
            inner(menu);
            setCrumbs(titles.reverse());
          } else {
            setCrumbs([menu.title]);
          }
        } else {
          inner(pathName.replace(/\/[^/]*$/, ''));
        }
      }
    };

    if (isObject(menuPathMap) && isObject(menuIdMap)) {
      inner(location.pathname);
    }

  }, [location.pathname, menuPathMap, menuIdMap]);

  if(isArray(crumbs) && crumbs.length > 0){
    return (
      <Breadcrumb style={ { display: 'inline-block' } }>
        {crumbs.map((item, idx) => (
          <Breadcrumb.Item key={ idx }>{ item }</Breadcrumb.Item>
        )) }
      </Breadcrumb>
    );
  }

  return null;
};

PathCrumb.propTypes = {
  menus: array,
};

export default PathCrumb;
