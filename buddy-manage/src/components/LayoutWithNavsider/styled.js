
import styled, { createGlobalStyle, css } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
  }

  #root{
    height: 100%;
  }
`;

const rowFlexBox = css`
  display: flex;
  flex-direction: row;
`;

const columnFlexBox = css`
  display: flex;
  flex-direction: column;
`;

const height64 = '64px';

export const Box = styled.div`
  ${rowFlexBox};

  height: 100%;


  .left-box{
    ${columnFlexBox};

    height: 100%;
    background: rgb(0, 12, 23);
    position: relative;

    .logo-box{
      position: absolute;
      top: 0;
      left: 0;
      height: 64px;
      width: 100%;
      background-image: linear-gradient(102deg, rgb(255, 193, 35), rgb(255, 153, 0));
    }

    .menus-box{
      height: 100%;
      padding-top: 64px;
      overflow: hidden;
    }
  }

  .right-box{
    flex-grow: 1;
    height: 100%;

    .top-box{
      height: 64px;
      box-shadow: rgb(0 21 41 / 35%) 2px 0px 6px;

      .collapsed-icon{
        color: #001529;
        display: inline-block;
        height: ${height64};
        line-height: ${height64};
        width: 60px;
        text-align: center;
      }
    }

    .bottom-box{
      padding-top: 10px;
    }
  }
`;
