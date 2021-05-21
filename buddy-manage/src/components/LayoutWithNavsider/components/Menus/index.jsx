import isObject from 'lodash/isObject';
import isArray from 'lodash/isArray';
import React, { useEffect, useState } from 'react';
import { array, bool } from 'prop-types';
import { useHistory, useLocation } from 'react-router-dom';
import { Menu } from 'antd';
import { Box } from './styled';
import IconFont from '../IconFont';
import { nestMenus, createMenu } from './utils';
import { cleanPathname } from '../../utils';

/**
 * type Menu {
 *  id: string,
 *  path: string,
 *  title: string,
 *  icon: string,
 *  parentId: string,
 *  children: Array<Menu>,
 * }
 */
const Menus = props => {

  const { menus, inlineCollapsed, splitTopMenu = false, /* onChange = Function() */ } = props;

  const history = useHistory();
  const location = useLocation();

  const [menuPathMap, setMenuPathMap] = useState();
  const [allMenus, setAllMenus] = useState();
  const [topIndex, setTopIndex] = useState();
  const [selectedKeys, setSelectedKeys] = useState();

  useEffect(() => {
    if (isArray(menus) && menus.length) {
      const pathMap = {};
      menus.forEach(menu => pathMap[cleanPathname(menu.path)] = menu);
      setMenuPathMap(pathMap);
      setAllMenus(nestMenus(menus));
    }
  }, [menus]);

  useEffect(() => {
    if(menuPathMap && location.pathname !== '/' && !menuPathMap[location.pathname]){
      history.push('/404');
      // if (isArray(allMenus) && allMenus.every(menu => {
      //   const reg = new RegExp(`^${menu.path}`);
      //   return !reg.test(location.pathname);
      // })) {
      //   history.push('/404');
      // }
    }

    let topIndex;
    if (isArray(allMenus) && allMenus.some((menu, idx) => {
      const reg = new RegExp(`^${menu.path}($|/)`);
      if (reg.test(location.pathname)) {
        topIndex = idx;
        return true;
      }
      return false;
    })) {
      setTopIndex(topIndex);
    }

    if(isObject(menuPathMap)){
      const inner = pathName => {
        if(pathName.length){
          if (isObject(menuPathMap) && isObject(menuPathMap[pathName])) {
            setSelectedKeys([menuPathMap[pathName].id]);
          } else {
            inner(pathName.replace(/\/[^/]*$/, ''));
          }
        }
      };
      inner(location.pathname);
    }

  }, [location.pathname, allMenus, menuPathMap]);

  if (isArray(allMenus)) {
    let menusToShow = splitTopMenu ? [] : allMenus;

    if(isFinite(topIndex)){
      menusToShow = allMenus[topIndex].children;
    }

    return (
      <Box>
        {splitTopMenu && (
          <div className="top-menus-box">
            {allMenus.map((menu, idx) => {
              return (
                <a
                  className={ `nav ${idx === topIndex ? 'active' : ''}` }
                  key={ menu.id }
                  onClick={ () => {
                    history.push(menu.path);
                  } }
                >
                  <IconFont type={ menu.icon } style={ { fontSize: 30 } } />
                  <span className="title">{ menu.title || menu.name }</span>
                </a>
              );
            }) }
          </div>
        ) }
        <div className="other-menus-box">
          <Menu
            mode="inline"
            theme="dark"
            selectedKeys={ selectedKeys }
            inlineCollapsed={ inlineCollapsed }
            onClick={ info => {
              setSelectedKeys([info.key]);
            } }
          >
            { menusToShow.map(menu => createMenu(menu)) }
          </Menu>
        </div>
      </Box>
    );
  }

  return null;
};

Menus.propTypes = {
  menus: array,
  splitTopMenu: bool,
  inlineCollapsed: bool,
};

export default Menus;
