
import React, { useState, useEffect } from 'react';
import { Button, DatePicker } from 'antd';
import classNames from 'classnames';

import styles from './styles.less';

export default () => {

  const [flag, setFlag] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setFlag(!flag);
    }, 1000);
  }, [flag]);

  return (
    flag ? <Button className={classNames(styles['test'])}>test</Button> : <DatePicker/>
  );
};
