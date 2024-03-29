import styled from 'styled-components';

export const MenusBox = styled.div`
  display: flex;
  height: 100%;
  flex-direction: row;

  .top-menus-box{
    width: 64px;
    height: 100%;
    overflow: auto;
    background-color: rgb(33, 45, 56);

    a{
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      widht: 100%;
      height: 80px;

      color: #999;
      font-size: 12px;

      text-align: center;

      > span{
        display: block;
      }

      .title{
        margin-top: 8px;
        line-height: 22px;
        display: none;
      }

      &:hover,
      &.active{
        .title{
          display: block;
        }
      }
      &.active{
        color: #f90;
        background-color: rgb(44, 58, 70);
      }

      &:hover{
        color: #fff;
        background-color: rgba(255, 153, 0, 0.1)
      }

      &.active:hover{
        color: rgb(255, 153, 0);
      }
    }
  }

  .rest-menus-box{
    background-color: #001529;
    height: 100%;
    width: ${props => props.collapsed ? '80px': '200px'};
    transition: width .2s ease;
    overflow: auto;
  }
`;
