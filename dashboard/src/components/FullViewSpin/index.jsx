
import React from 'react';
import { Spin } from 'antd';
import classNames from 'classnames';

import styles from './styles.scss';

export default () => {
  console.log(Spin, '--------')
  return (
    <div className={classNames(styles['full-view-spin'])}>
      <Spin spinning />
    </div>
  );
};