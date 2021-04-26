
import styled from 'styled-components';

import { transferSize } from 'Utils';
const t = transferSize(375);

export const Empty = styled.div`
  padding-top: ${t(135)};
  text-align: center;

  img{
    width: ${t(280)};
    height: ${t(280)};
  }

  div{
    padding-top: ${t(20)};
    font-size: ${t(16)};
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #2E2E2E;
    line-height: ${t(24)};
  }
`;
