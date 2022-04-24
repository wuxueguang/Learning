
import styled, { keyframes } from 'styled-components';

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

export default styled.i`
  display: inline-block;
  width: 40px;
  height: 40px;
  background-image: url(${loadingIcon});
  background-position: center;
  background-size: 40px 40px;

  animation: ${morph} 1s linear infinite, ${spin} 1s ease-in-out infinite;
`;
