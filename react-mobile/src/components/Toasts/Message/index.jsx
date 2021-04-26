

import React from 'react';
import { string } from 'prop-types';

import { Box } from './styled';

const C = props => {
  return (
    <Box bgColor={props.bgColor}>
      <div>{props.msg}</div>
    </Box>
  );
};

C.propTypes = {
  msg: string,
  bgColor: string,
};

export default C;
