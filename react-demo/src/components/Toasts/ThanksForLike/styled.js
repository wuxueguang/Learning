
import styled from 'styled-components';

import { transferSize } from 'Utils';
const t = transferSize(375);

export const Box = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 100%;
  text-align: center;
  padding-top: 38.2vh;

  img{
    width: ${t(160)};
    height: ${t(160)};
  }

`;
