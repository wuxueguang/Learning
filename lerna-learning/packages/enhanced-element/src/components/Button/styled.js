
import styled from 'styled-components';

import loadingImg from './loading.svg';

export const Button = styled.button`
  margin: 0;
  padding: 0;
  overflow: visible;
  text-transform: none;

  height: 32px;

  /* position: relative; */
  display: inline-block;
  font-weight: 400;
  white-space: nowrap;
  text-align: center;
  background-image: none;
  box-shadow: 0 2px 0 rgba(0,0,0,.015);
  cursor: pointer;
  transition: all .3s cubic-bezier(.645,.045,.355,1);
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  touch-action: manipulation;
  
  /* padding: 4px 15px; */
  font-size: 14px;
  border-radius: 2px;
  color: rgba(0,0,0,.85);
  background: #fff;
  border: 1px solid #d9d9d9;
  outline: 0;

  &:focus, &:hover{
    color: #40a9ff;
    background: #fff;
    border-color: #40a9ff
  }

  &.primary{
    color: #fff;
    background: #1890ff;
    border-color: #1890ff;
    text-shadow: 0 -1px 0 rgba(0,0,0,.12);
    box-shadow: 0 2px 0 rgba(0,0,0,.045);

    &:focus, &:hover{
      color: #fff;
      background: #40a9ff;
      border-color: #40a9ff
    }
  }

  .content-box{
    display: inline-block;
    height: 32px;
    line-height: 32px;
    padding: 0 15px;
  }
  &.loading{
    padding-right: 15px;
    position: relative;
    cursor: default;
  }

  @keyframes rotate {
    0%{-webkit-transform:rotate(0deg);}
    25%{-webkit-transform:rotate(90deg);}
    50%{-webkit-transform:rotate(180deg);}
    75%{-webkit-transform:rotate(270deg);}
    100%{-webkit-transform:rotate(360deg);}
  }

  &.loading::after{
    position: absolute;
    top: 0;
    right: 0;
    content: ' ';
    display: inline-block;
    height: 32px;
    width: 30px;
    background-image: url(${loadingImg});
    background-position: center;
    background-repeat: no-repeat;
    background-size: 14px 14px;

    animation: rotate 3s linear infinite;
  }
  &.disabled{
    opacity: .4;
    cursor: not-allowed;
  }
  

`;