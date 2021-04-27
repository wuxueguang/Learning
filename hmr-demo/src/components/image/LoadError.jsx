

import React from 'react';
import { Box } from './styled';
import emptyImg from './assets/empty.svg';

const C = () => {
  return (
    <Box bgColor="#eee">
      <div style={{opacity: 0.6, textAlign: 'center'}}>
        <img src ={emptyImg} alt="加载失败"/>
        <span style={{display: 'block'}}>加载失败</span>
      </div>
    </Box>
  );
};

export default C;
