
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { observer, inject, Provider } from 'mobx-react';
import store from './store';
import { Image } from '@/components';
import Zmage from 'react-zmage';

const imgUrl = 'https://qa-feedback.xingshulinimg.com/1619323948925?e=4211517793&token=a0h5P_uSX_opuu0veh0W3gBYxunaVmIjpgQur9BM:A8Pn0p4yA2j6HI-4odiGCy5PLu8=';

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
      {/* <Image
        width={200}
        height={200}
        src={imgUrl}
      /> */}
      <p>{timer.get()}</p>
      <Zmage src={imgUrl}/>
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
};

ReactDOM.render(<App />, document.getElementById('root'));



