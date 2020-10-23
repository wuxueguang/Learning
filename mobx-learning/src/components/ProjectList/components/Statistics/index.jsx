

import React from 'react';
import { observer, inject } from 'mobx-react';

export default inject('projectList')(observer(props => {
  return (
    <dl>
      <dt>总计：</dt>
      <dd>{props.projectList.length}</dd>
    </dl>
  );
}));