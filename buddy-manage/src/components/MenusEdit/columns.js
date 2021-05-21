
import React from 'react';
import * as icons from '@ant-design/icons';

const columns = [{
  title: '菜单名称',
  dataIndex: 'name',
  key: 'name',
  render: (name, row) => name || row.title,
}, {
  title: '菜单路径',
  dataIndex: 'path',
  key: 'menuPath',
}, {
  title: '图标',
  dataIndex: 'icon',
  key: 'icon',
  // eslint-disable-next-line react/display-name
  render: icon => {
    const Icon = icons[icon];
    return Icon ? <Icon /> : icon;
  },
}];

export default columns;
