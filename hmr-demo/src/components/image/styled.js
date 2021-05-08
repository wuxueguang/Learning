
import styled, { keyframes, css } from 'styled-components';

import closeIcon from './asset/icon_close.png';
import loadingIcon from './asset/loading.svg';
import arrowLeftIcon from './asset/arrow_left.png';
import arrowRightIcon from './asset/arrow_right.png';

const morph = keyframes`
  0% { border-radius: 5px; }
  50% { border-radius: 50%; }
  100% { border-radius: 5px; }
`;

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const loading = css`
  display: inline-block;
  width: 40px;
  height: 40px;
  background-image: url(${loadingIcon});
  background-position: center;
  background-size: 40px 40px;

  animation: ${morph} 1s linear infinite, ${spin} 1s ease-in-out infinite;
`;

export const ImgBox = styled.span`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: ${({ width }) => Number.isFinite(width) ? `${width}px` : width};
  height: ${({ height }) => Number.isFinite(height) ? `${height}px` : height};
  background-color: ${({ bgColor }) => bgColor || '#000'};
  cursor: zoom-in;

  .loading{
    ${loading};
  }
`;

export const BigImgBox = styled.div`

  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: #fff;

  display: flex;
  justify-content: center;
  align-items: center;

  .loading{
    ${loading};
  }

  .close{
    position: fixed;
    top: 10px;
    right: 10px;
    display: inline-block;
    width: 40px;
    height: 40px;
    background-image: url(${closeIcon});
    background-size: 100%;
    background-position: center;
    opacity: .2;

    &:hover{
      opacity: .8;
    }
  }
  .prevous, .next{
    position: fixed;
    top: 50%;
    display: inline-block;
    width: 30px;
    height: 30px;
    border-radius: 30px;
    border: solid 2px #333;

    background-position: center;
    background-size: 30px 30px;
    transform: translate(0, -50%);

    opacity: .2;

    &:hover{
      opacity: .8;
    }
  }

  .prevous{
    left: 5px;
    background-image: url(${arrowLeftIcon});
  }
  .next{
    right: 5px;
    background-image: url(${arrowRightIcon});
  }
`;
