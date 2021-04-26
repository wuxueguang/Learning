
import styled from 'styled-components';


import imgs from './imgs';

import { transferSize } from 'Utils';
const t = transferSize(375);

export const Main = styled.div`
  padding-top: ${t(182)};
  min-height: 100%;
  background: url(${imgs('topBg')}) top center no-repeat;
  background-size: 100%;

  font-size: ${t(14)};
  font-weight: 400;
  color: rgba(0,0,0,.8);

  > .content-box{
    padding-top: ${t(20)};
    border-top-left-radius: ${t(36)};
    border-top-right-radius: ${t(36)};
    background-color: #fff;
  }
`;

export const SelfInfo =  styled.div`
  margin: auto;
  background-color: rgba(0,0,0,.03);
  border-radius: ${t(20)};
  width: ${t(335)};
  height: ${t(78)};
  padding: ${t(12)};

  > div{
    position: relative;
    height: ${t(54)};
    padding: ${t(4)} 0 ${t(4)} ${t(66)};

    > img{
      position: absolute;
      top: 0;
      left: 0;
      width: ${t(54)};
      height: ${t(54)};
      border-radius: ${t(27)};
      border: ${t(3)} solid #fff;
    }

    > div{
      line-height: ${t(20)};
      color: rgba(0, 0, 0, 0.3);
    }
    > div + div{
      margin-top: ${t(6)};
    }

    .title,
    .num{
      font-size: ${t(16)};
      font-weight: 500;
    }

    .title{
      color: rgba(0, 0, 0, 0.8);
    }
    .num{
      color: #F90;
      padding-left: ${t(6)};
    }
  }
`;

export const Table = styled.table`
  margin-top: ${t(30)};
  width: 100%;
  border: none;

  .ranking{
    padding-left: ${t(20)};
    width: ${t(68)};
  }
  .hero-info{
    width: ${t(245)};
  }
  .num{
    width: ${t(62)};
    padding-right: ${t(20)};
    text-align: right;
  }

  th{
    padding-bottom: ${t(12)};
    color: rgba(0, 0, 0, 0.3);
    line-height: ${t(20)};
  }
  th.hero-info{
    padding-left: ${t(5)};
  }

  tbody tr{
    &.active{
      background: #FFF9F0;
    }

    td{
      height: ${t(56)};
      padding: ${t(8)} 0 ${t(12)} 0;
    }

    > td.ranking > div{
      width: ${t(28)};
      line-height: ${t(40)};
      text-align: center;

      &.ranked-1, &.ranked-2, &.ranked-3{
        color: transparent;
        background-position: top center no-repeat;
        background-size: 100%;
      }
      &.ranked-1{
        background-image: url(${imgs('rankedOne')});
      }
      &.ranked-2{
        background-image: url(${imgs('rankedTwo')});
      }
      &.ranked-3{
        background-image: url(${imgs('rankedThree')});
      }
    }

    > .hero-info > div{
      position: relative;
      line-height: ${t(40)};
      padding-left: ${t(48)};
      /* background-color: green; */

      .address-name{
        width: ${t(197)};
        line-height: ${t(40)};
        /* background-color: red; */
      }

      > img{
        position: absolute;
        top: 0;
        left: 0;
        width: ${t(40)};
        height: ${t(40)};
        border-radius: ${t(20)};
      }
    }

    > .num > div{
      width: ${t(42)};
      font-size: ${t(16)};
      line-height: ${t(40)};
      font-family: 'PingFangSC-Medium, PingFang SC';
      font-weight: 500;
      color: #F90;
    }

  }
`;


export const NoData = styled.div`
  margin: auto;
  margin-top: 10vh;
  text-align: center;

  > img{
    display: block;
    margin: auto;
    margin-bottom: ${t(20)};
    width: ${t(200)};
    height: ${t(148)};
  }

  > div{
    font-size: ${t(16)};
  }
`;
