
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { observer, inject, Provider } from 'mobx-react';
import store from './store';

const Timer = inject('timer')(observer(props => {
    const { timer } = props;

    useEffect(() => {
        // timer.actions.reset();
        setTimeout(timer.actions.increase, 1000);

        // return () => {
        //     clearInterval(st);
        // };
        
    }, [timer.get()]);

    return (
        <div>
            <form>
                <input onChange={e => {
                    console.log(e.target.parentElement);
                }}/>
            </form>
            <h5>秒表</h5>
            <p>{timer.get()}</p>
        </div>
    );
}));

// App.js
const App = () => {
    return (
        <Provider {...store} >
            <Timer />
        </Provider>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));



