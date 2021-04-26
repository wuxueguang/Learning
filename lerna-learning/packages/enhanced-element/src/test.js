
import React from 'react';
import { render } from 'react-dom';

import { Button } from './components';

render((
  <Button
    disabled
    type="primary"
    className="t1 t2"
    onClick={() => new Promise(resolve => {
      console.log('1231231');
      setTimeout(resolve, 5000);
    })}
  >确认</Button>
), document.getElementById('root'));
