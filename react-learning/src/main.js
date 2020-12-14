import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

const Container = styled.div`
  background-color: ${props => props.bgColor};

  & .test{
    color: green;
  }
`;

Container.defaultProps = {
  bgColor: 'yellow',
};

const App = () => (
  <Container>
    <span className="test">test</span>
  </Container>
);

ReactDOM.render(<App/>, document.getElementById('root'));