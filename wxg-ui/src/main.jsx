
import 'antd/dist/antd.less';

import React, { Suspense } from 'react';
import { render } from 'react-dom';

const C = React.lazy(() => import('./components/Button'));

const Tick = () => {
  return (
    <Suspense fallback="Lazy component is loading ...">
      <C
        onClick={e => {
          console.log(e);
          return new Promise(resolve => {
            setTimeout(resolve, 2000);
          });
        }}
      >test</C>
    </Suspense>
  );
};

render(<Tick/>, document.getElementById('root'));


