
import React, { useState, useEffect, Suspense } from 'react';
import classNames from 'classnames';
import { Card, Button, DatePicker } from 'antd';
import styles from './styles.less';



import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom';

function Home() {
  return <h2 className={classNames(styles['red-font'])}>Home</h2>;
}

function About() {
  const Counter = React.lazy(() => import('../Counter'));
  const [showCounter, setShowCounter] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowCounter(true);
    }, 2000);
  }, []);

  const p = {name: 'Tom'};

  return (
    <Card {...p}>
      <Suspense fallback={<div>Loading...</div>}>
        {showCounter && <Counter />}
      </Suspense>
      <Button type="primary">About</Button>
      <DatePicker />
    </Card>
  );
}

function Users() {
  return <h2>Users</h2>;
}


const App = () => {
  return (
    <Router basename={location.pathname}>
      <div className="test">
        <nav>
          <ul>
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
          </ul>
        </nav>
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/users">
          <Users />
        </Route>
      </div>
    </Router>
  );
};

export default App;
