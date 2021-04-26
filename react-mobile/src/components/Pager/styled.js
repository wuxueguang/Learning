import styled from 'styled-components';

import { transferSize } from 'Utils';
// import imgs from './imgs';

const t = transferSize(375);

export const Box = styled.div`
  text-align: center;
  height: ${t(20)};
  line-height: ${t(20)};
  font-size: ${t(14)};
  color: rgba(0,0,0,.3);
`;
