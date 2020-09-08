
import React from 'react';
import ReactDOM from 'react-dom';
import { registerMicroApps, start } from 'qiankun';
import { BrowserRouter as Router, Link } from 'react-router-dom';

const C = () => {
  return (
    <Router>
      <nav>
        <Link to="/app1">app1</Link>
        <Link to="/app2">app2</Link>
      </nav>
    </Router>
  );
};

ReactDOM.render(<C />, document.getElementById('router'));

registerMicroApps([
  {
    name: 'react app1',
    entry: 'http://localhost:7778',
    container: '#container1',
    activeRule: location => location.pathname.startsWith('/app1'),
  },
  {
    name: 'vue app2',
    entry: 'http://localhost:7779',
    container: '#container2',
    activeRule: location => location.pathname.startsWith('/app2'),
  },
]);

start();
// start({sandbox: { strictStyleIsolation: true }});



