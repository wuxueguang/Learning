
import "antd/dist/antd.less";

import React from 'react';

import ReactDOM from 'react-dom';
import { Button } from 'antd';

const App = () => <Button type="primary">test</Button>;

ReactDOM.render(<App />, document.getElementById('root'));