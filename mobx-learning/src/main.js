
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { observer, inject, Provider } from 'mobx-react';

import store from './store';

import ProjectList from './components/ProjectList';

const Timer = inject('timer')(observer(props => {
    const { timer } = props;

    useEffect(() => {
        timer.actions.reset();
        const st = setInterval(timer.actions.increase, 1000);

        return () => {
            clearInterval(st);
        };
    }, []);

    return (
        <div>
            <h5>秒表</h5>
            <p>{timer.get()}</p>
        </div>
    );
}));

// App.js
const App = () => {
    return (
        <Provider {...store} >
            {/* <ProjectList /> */}
            <Timer />
        </Provider>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));



