
import styled from 'styled-components';

export const Box = styled.div`
  width: ${({ width }) => Number.isFinite(width) ? `${width}px` : width || '100%'};
  height: ${({ height }) => Number.isFinite(height) ? `${height}px` : height || '100%'};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.bgColor};
`;
