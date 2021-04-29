import 'antd/dist/antd.css';

import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
// import { Modal } from 'antd';
import { observer, inject, Provider } from 'mobx-react';
import store from './store';
import { Image } from '@/components';

// import Promise, { RECORDER } from '@/utils/Promise';

const imgUrl1 = 'https://qa-feedback.xingshulinimg.com/1619323948925?e=4211517793&token=a0h5P_uSX_opuu0veh0W3gBYxunaVmIjpgQur9BM:A8Pn0p4yA2j6HI-4odiGCy5PLu8=';
const imgUrl2 = 'https://qa-feedback.xingshulinimg.com/1619081622945?e=4211517793&token=a0h5P_uSX_opuu0veh0W3gBYxunaVmIjpgQur9BM:oHNgMyNO2WjpY77Xm0HyezUV57w=';
const Timer = inject('timer')(observer(props => {
  const { timer } = props;
  const [imgUrl, setImgUrl] = useState(imgUrl1);
  // const [visible, setVisible] = useState(true);






  useEffect(() => setTimeout(() => {
    setImgUrl(imgUrl2);








    const p0 = new Promise((resolve, reject) => setTimeout(() => reject('test'), 1000));
    const p1 = p0.catch(() => console.log('p0', p0));
    const p2 = p1.then(() => console.log('p1', p1));
    const p3 = p2.then(() => console.log('p2', p2));

    // setTimeout(() => console.log(p0[RECORDER], p1[RECORDER]), 1000);









  }, 2000), []);






  useEffect(() => {
    // timer.actions.reset();
    setTimeout(timer.actions.increase, 1000);

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
      <Image src={imgUrl} width={100} height={100}/>
      <span>test</span>
      {/* <Modal maskClosable={false} destroyOnClose visible={visible} onCancel={() => setVisible(false)}>test</Modal> */}
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



