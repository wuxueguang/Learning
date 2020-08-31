import React from 'react';
import { Spin, Icon } from 'antd';

import './index.scss';


export default function Loading() {
  const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
  return (
    <div className="offline-loading">
      <Spin indicator={antIcon} />
    </div>
  );
};
