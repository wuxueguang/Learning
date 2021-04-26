
import styled from 'styled-components';

import { transferSize } from 'Utils';
import imgs from './imgs';

const t = transferSize(375);

export const Ul = styled.ul`
  font-size: ${t(16)};
  font-family: 'PingFangSC-Medium, PingFang SC';
  font-weight: 500;
  color: rgba(0, 0, 0, 0.8);
  line-height: ${t(22)};

  margin: 0 auto;
  padding: 0;
  width: ${t(335)};
  list-style: none;

  li{
    border-bottom: solid 1px rgba(0,0,0,.2);

    > a{
      display: block;
      text-decoration: none;
      color: inherit;

      position: relative;
      height: ${t(94)};
      margin: ${t(16)} 0;
      padding-left: ${t(137)};

      > img{
        position: absolute;
        top: 0;
        left: 0;
        width: ${t(125)};
        height: ${t(94)};
        background: #F8F8F8;
        border-radius: ${t(12)};
      }
      > .title{
        padding-top: ${t(12)};

        min-height: ${t(56)};
        display: -webkit-box;
        overflow : hidden;
        text-overflow: ellipsis;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;

        &.readed{
          color: rgba(0,0,0,.3);
        }
      }
      > div:nth-child(3){
        margin-top: ${t(8)};
        font-size: ${t(12)};
        font-family: 'PingFangSC-Regular, PingFang SC';
        font-weight: 400;
        color: rgba(0,0,0,.3);
        line-height: ${t(16)};

        > i{
          padding: ${t(8)};
          background-size: 100% auto;
          background-position: center;
          background-repeat: no-repeat;

          position: relative;
        }

        > i:nth-child(1){
          background-image: url(${imgs('iconEye')});
        }
        > i:nth-child(3){
          margin-left: ${t(10)};
          background-image: url(${imgs('iconLike')});
        }
        span:nth-child(5){
          float: right;
          display: inline-block;
          width: ${t(38)};
          line-height: ${t(16)};
          background-color: rgba(0, 0, 0, 0.03);
          border-radius: ${t(10)};
          text-align: center;
          color: rgba(0,0,0,.3);
        }
      }
    }
  }
`;
