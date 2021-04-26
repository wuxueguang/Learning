
import styled from 'styled-components';

import { transferSize } from 'Utils';
const t = transferSize(375);

export const Loading = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${t(14)};
  font-weight: 400;
  color: rgba(0,0,0,.3);
`;
