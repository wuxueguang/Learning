
import styled from 'styled-components';

import { transferSize } from 'Utils';
const t = transferSize(375);

export const Box = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 100%;

  div{
    background-color: ${props => props.bgColor};
    color: #fff;
    font-size: 1rem;
    line-height: 1.2rem;
    text-align: center;
  }
`;
