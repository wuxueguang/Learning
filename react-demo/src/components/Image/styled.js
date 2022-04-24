
import styled, { keyframes, css } from 'styled-components';

import loadingIcon from './asset/loading.svg';

const morph = keyframes`
  0% { border-radius: 5px; }
  50% { border-radius: 50%; }
  100% { border-radius: 5px; }
`;

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

export const loading = css`
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
  /* text-align: center;
  line-height: ${({ height }) => Number.isFinite(height) ? `${height}px` : height}; */
  width: ${({ width }) => Number.isFinite(width) ? `${width}px` : width};
  height: ${({ height }) => Number.isFinite(height) ? `${height}px` : height};
  background-color: ${({ bgColor }) => bgColor || '#000'};
  cursor: zoom-in;
  overflow: hidden;

  .loading{
    ${loading};
  }
`;
