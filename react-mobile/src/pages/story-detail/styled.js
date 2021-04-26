
import styled from 'styled-components';

import imgs from './imgs';

import { transferSize } from 'Utils';
const t = transferSize(375);


export const Box = styled.div`
  padding-top: ${t(8)};
  padding-bottom: ${t(68)};
  > div:nth-child(1){
    padding: 0 ${t(20)};

    font-size: ${t(16)};
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.8);
    line-height: ${t(24)};

    h2{
      margin-top: ${t(20)};
      padding: 0;
      font-size: ${t(20)};
      font-weight: 500;
      line-height: ${t(28)};
    }

    .user{
      line-height: ${t(28)};
      padding-left: ${t(36)};
      position: relative;

      img{
        position: absolute;
        top: 0;
        left: 0;
        width: ${t(28)};
        height: ${t(28)};
        border-radius: ${t(14)};
      }
      span{
        font-size: ${t(14)};
        font-weight: 500;
        color: rgba(0, 0, 0, 0.8);
      }
    }

    .content{
      padding: ${t(12)} 0 ${t(20)} 0;
      overflow-x: hidden;

      font-size: ${t(16)};
      font-family: 'PingFangSC-Regular, PingFang SC';
      font-weight: 400;
      color: rgba(0, 0, 0, 0.8);
      line-height: ${t(24)};

      img{
        width: ${t(335)};
      }
    }

    .footer{
      height: ${t(16)};
      font-size: ${t(12)};
      font-weight: 400;
      color: rgba(0,0,0,.3);
      line-height: ${t(16)};

      span:nth-child(1){
        float: left;
        background-image: url(${imgs('iconEye')});
        background-position: left center;
        background-size: auto 100%;
        background-repeat: no-repeat;
        padding-left: ${t(17)};
      }
      span:nth-child(2){
        float: right;
      }
    }
  }


  .like-box{
    position: fixed;
    bottom: 0;
    width: 100%;
    background-color: #fff;
    /* margin-top: ${t(40)}; */
    text-align: center;
    line-height: ${t(52)};
    color: #000;

    box-shadow: 0 ${t(-5)} ${t(5)} 0 rgba(0, 0, 0, 0.05);

    span{
      font-size: ${t(14)};
      line-height: ${t(24)};
      padding-left: ${t(30)};

      background-image: url(${imgs('iconLike')});
      background-position: left center;
      background-size: auto ${t(24)};
      background-repeat: no-repeat;
    }

    .liked{
      background-image: url(${imgs('iconLiked')});
    }
  }
`;
