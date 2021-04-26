
import styled from 'styled-components';

import { transferSize } from 'Utils';
import imgs from './imgs';

const t = transferSize(375);

export const Ul = styled.ul`
  margin: 0 auto;
  padding: 0;
  width: ${t(335)};
  list-style: none;

  font-size: ${t(14)};
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.8);
  line-height: ${t(16)};

  li{
    padding: ${t(16)} 0;
    border-bottom: solid ${t(1)} rgba(0,0,0,.04);

    > div{
      height: ${t(40)};
      padding-left: ${t(52)};
      background-image: url(${imgs('iconMedal')});
      background-repeat: no-repeat;
      background-position: left center;
      background-size: auto 100%;

      > div:nth-child(1){
        font-weight: 500;
      }

      > div:nth-child(2){
        margin-top: ${t(8)};
        > span:nth-child(1){
          color: #f90;
        }
        > .date{
          color: rgba(0, 0, 0, 0.3);
          font-size: ${t(12)};
          font-weight: 400;
          float: right;
        }
      }
    }
  }

`;
