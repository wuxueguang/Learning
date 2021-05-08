import 'antd/dist/antd.css';

import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
// import { Modal } from 'antd';
import { observer, inject, Provider } from 'mobx-react';
import store from './store';
import { Image } from '@/components';

import Promise$, { RECORDER } from '@/utils/Promise';

const Promise = Promise$.scope();

const imgUrl1 = 'https://qa-feedback.xingshulinimg.com/1619323948925?e=4211517793&token=a0h5P_uSX_opuu0veh0W3gBYxunaVmIjpgQur9BM:A8Pn0p4yA2j6HI-4odiGCy5PLu8=';
const imgUrl2 = 'https://qa-feedback.xingshulinimg.com/1619081622945?e=4211517793&token=a0h5P_uSX_opuu0veh0W3gBYxunaVmIjpgQur9BM:oHNgMyNO2WjpY77Xm0HyezUV57w=';
const imgUrl3 = 'https://qa-feedback.xingshulinimg.com/1618998810325?e=4212378031&token=a0h5P_uSX_opuu0veh0W3gBYxunaVmIjpgQur9BM:HF6SjxT-BnvGBeuWr1NuyHzO_C4=';
const imgUrl4 = 'https://feedback.xingshulinimg.com/1620381908623?e=4212381910&token=U1xiKU8XPBudRodETmcD1fWA3eiiMA-R1wSxPBzM:GawsGH-2nhOnYxjW7241QuKYMVw=';
const Timer = inject('timer')(observer(props => {
  const { timer } = props;
  const [imgUrl, setImgUrl] = useState(imgUrl1);
  // const [visible, setVisible] = useState(true);

  useEffect(() => {

    (new Promise(resolve => resolve('test1'))).then(data => console.log(data));
    (new Promise(resolve => resolve('test1'))).then(data => console.log(data));
    (new Promise(resolve => resolve('test1'))).then(data => console.log(data));
    (new Promise(resolve => resolve('test1'))).then(data => console.log(data));
    (new Promise(resolve => resolve('test1'))).then(data => console.log(data));
    Promise.stopAll();

    // let p = new Promise$(resolve => resolve('324234'));
    // p = p.then(data => {
    //   console.log(data);
    //   return 'testestset';
    // }).then(data => {
    //   console.log(data);
    //   return '123123eteseree';
    // }).stop();
    // setTimeout(() => {
    //   p.continue();
    // }, 1000);
  }, []);

  // useEffect(() => setTimeout(() => {
  //   setImgUrl(imgUrl2);
  // }, 2000), []);

  // useEffect(() => {
  //   // timer.actions.reset();
  //   // setTimeout(timer.actions.increase, 1000);
  // }, [timer.get()]);

  return (
    <div>
      <form>
        <input onChange={e => {
          console.log(e.target.parentElement);
        }}/>
      </form>
      <h5>秒表</h5>
      <p>{timer.get()}</p>
      <div style={{
        marginLeft: 100,
        width: 400,
        height: 600
      }}>
        <Image set={[imgUrl1, imgUrl2, imgUrl3, imgUrl4]} width={100} height={100} bgColor="#eee"/>
      </div>

      <span>test</span>
      {Array(30).fill(1).map((_, idx) => <div key={idx}>test</div>)}
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



