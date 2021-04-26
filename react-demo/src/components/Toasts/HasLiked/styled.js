
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
  /* display: flex;
  align-items: center;
  justify-content: center; */


  span{
    display: inline-block;
    padding: 0 ${t(20)};
    background-color: #000;
    line-height: ${t(40)};
    border-radius: ${t(20)};
    font-size: ${t(14)};
    color: #fff;
  }

`;
