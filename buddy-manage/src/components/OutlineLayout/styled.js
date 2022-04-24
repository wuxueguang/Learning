
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

  .header{
    display: flex;
    /* height: 64px; */
    box-shadow: rgb(0 21 41 / 35%) 2px 0px 6px;

    .logo-box{
      height: 100%;
      width: ${props => props.collapsed ? '80px' : '264px'};
      background-image: linear-gradient(102deg, rgb(255, 193, 35), rgb(255, 153, 0));
    }

    .collapsed-icon{
      color: #001529;
      display: inline-block;
      height: ${height64};
      line-height: ${height64};
      width: 60px;
      text-align: center;
    }

    .crumb-box{
      flex-grow: 1;
    }
    .profile-box{
      margin-right: 10px;
      width: 120px;
    }
  }



  .content{
    ${columnFlexBox};

    .left-box{
      height: 100%;
      display: inline-block;

      .menus-box{
        height: 100%;
        padding-top: 64px;
        overflow: hidden;
      }
    }


    .right-box{
      flex-grow: 1;
      height: 100%;

      .bottom-box{
        ${columnFlexBox};

        padding: 8px;
        padding-bottom: 0;

        .content{
          flex-grow: 1;
          overflow: auto;
          background-color: #fff;

          > .ant-card{
              min-height: 100%;

            > .ant-card-body{
              min-height: 100%;
            }
          }
        }

        footer{
          font-size: 12px;
          color: rgba(0,0,0,.6);
        }
      }
    }
  }
`;

export const EmptyContent = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
