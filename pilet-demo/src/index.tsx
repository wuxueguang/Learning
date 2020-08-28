import * as React from 'react';
import { PiletApi } from 'piral-demo';


const Counter = () => {
  const [counter, setCounter] = React.useState(0);

  setTimeout(() => {
    setCounter(counter + 1);
  }, 1000);

  return (
    <span>{counter}</span>
  );
};

export function setup(app: PiletApi) {
  app.showNotification('Hello from Piral!', {
    autoClose: 20000,
  });
  app.registerMenu(() =>
    <a href="https://docs.piral.io" target="_blank">Documentation</a>
  );
  app.registerTile(() => <Counter />, {
    initialColumns: 2,
    initialRows: 1,
  });
}
