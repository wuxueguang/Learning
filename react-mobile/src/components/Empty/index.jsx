
import React from 'react';

import { Empty } from './styled';
import imgs from './imgs';

const C = () => {
  return (
      <Empty>
        <img src={imgs('empty')}/>
        <div>暂无内容</div>
      </Empty>
  );
};


export default C;
