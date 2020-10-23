
import React from 'react';
import { Button } from 'antd';
import classNames from 'classnames';

import styles from './styles.less';

export default () => {


  return (
    <Button className={classNames(styles['test'])}>test</Button>
  );
};
