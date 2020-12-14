

import React, { Suspense, useEffect, useState, lazy } from 'react';
import { Input } from 'antd';
import { render } from 'react-dom';

const Button = React.lazy(() => import('./components/Button'));

const Tick = props => {
  console.log('testasdasdsdfsdf');
  return (
    <Suspense fallback="Lazy component is loading ...">
      <Button
        type="primary"
        onClick={() => {
          alert(1);
        }}
      >sdfsdfsd</Button>
    </Suspense>
  );
};

render(<Tick/>, document.getElementById('root'));


