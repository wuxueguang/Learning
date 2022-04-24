import { isObject, isArray } from 'lodash';
import React, { useEffect, useState } from 'react';
import { array, bool, string, object } from 'prop-types';
import { Menu, Icon } from 'antd';

import { MenusBox } from './styled';
import IconFont from './components/IconFont';
import { nestMenus, cleanPathname } from './utils';

/**
 * type Menu {
 *  id: string,
 *  path: string,
 *  title: string,
 *  icon: string,
 *  parentId: string,
 *  hideInMenus: boolean,
 *  children: Array<Menu>,
 * }
 */

const Menus = props => {
  const { menus, path, history, collapsed, splitTopMenu = false, } = props;

  const [menusPathMap, setMenusPathMap] = useState();
  const [allMenus, setAllMenus] = useState();
  const [topIndex, setTopIndex] = useState();
  const [selectedKeys, setSelectedKeys] = useState();

  const createMenu = menu => {
    if(menu.hideInMenu){
      return null;
    }
    if (isArray(menu.children) && menu.children.some(item => !item.hideInMenu)) {
      return (
        <Menu.SubMenu
          key={menu.id}
          title={(
            <span>
              <Icon type={menu.icon}/>
              <span>{menu.title}</span>
            </span>
          )}
        >
          {menu.children.map(_menu => createMenu(_menu))}
        </Menu.SubMenu>
      );
    } else {
      return (
        <Menu.Item key={menu.id} onClick={() => history.push(menu.path)}>
          <Icon type="folder"/>
          <span>{menu.title}</span>
        </Menu.Item>
      );
    }
  };

  useEffect(() => {
    if (isArray(menus) && menus.length) {
      const pathMap = {};
      menus.forEach(menu => pathMap[cleanPathname(menu.path)] = menu);
      setMenusPathMap(pathMap);
      setAllMenus(nestMenus(menus));
    }
  }, [menus]);

  useEffect(() => {
    if(menusPathMap && path !== '/' && !menusPathMap[path]){
      history.push('/404');
    }

    let topIndex;
    if(isArray(allMenus)){
      for(let idx = 0; idx < allMenus.length; idx++){
        const menu = allMenus[idx];
        const reg = new RegExp(`^${menu.path}($|/)`);
        if (reg.test(path)) {
          topIndex = idx;
          break;
        }
      }
    }
    setTopIndex(topIndex);

    if(isObject(menusPathMap)){
      const inner = pathName => {
        if(pathName.length){
          if (isObject(menusPathMap) && isObject(menusPathMap[pathName])) {
            setSelectedKeys([menusPathMap[pathName].id]);
          } else {
            inner(pathName.replace(/\/[^/]*$/, ''));
          }
        }
      };
      inner(path);
    }

  }, [path, allMenus, menusPathMap]);

  if (isArray(allMenus) && allMenus.length) {
    let menusToShow = splitTopMenu ? [] : allMenus;

    if(isFinite(topIndex) && topIndex < allMenus.length){
      menusToShow = allMenus[topIndex].children;
    }

    return (
      <MenusBox collapsed={collapsed}>
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
        )}
        <div className="rest-menus-box">
          <Menu
            mode="inline"
            theme="dark"
            selectedKeys={selectedKeys}
            inlineCollapsed={collapsed}
            onClick={info => {
              setSelectedKeys([info.key]);
            }}
          >{menusToShow.map(menu => createMenu(menu))}</Menu>
        </div>
      </MenusBox>
    );
  }

  return null;
};

Menus.propTypes = {
  menus: array,
  path: string,
  history: object,
  collapsed: bool,
  splitTopMenu: bool,
  // inlineCollapsed: bool,
};

export default Menus;
