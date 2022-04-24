import 'antd/dist/antd.css';

import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import Image from '@zhizhu/image';

import { Pagination } from 'antd';

import axios from 'axios';

const imgUrl1 = 'https://qa-feedback.xingshulinimg.com/1619323948925?e=4211517793&token=a0h5P_uSX_opuu0veh0W3gBYxunaVmIjpgQur9BM:A8Pn0p4yA2j6HI-4odiGCy5PLu8=';
const imgUrl2 = 'https://qa-feedback.xingshulinimg.com/1619081622945?e=4211517793&token=a0h5P_uSX_opuu0veh0W3gBYxunaVmIjpgQur9BM:oHNgMyNO2WjpY77Xm0HyezUV57w=';
const imgUrl3 = 'https://qa-feedback.xingshulinimg.com/1618998810325?e=4212378031&token=a0h5P_uSX_opuu0veh0W3gBYxunaVmIjpgQur9BM:HF6SjxT-BnvGBeuWr1NuyHzO_C4=';
const imgUrl4 = 'https://feedback.xingshulinimg.com/1620381908623?e=4212381910&token=U1xiKU8XPBudRodETmcD1fWA3eiiMA-R1wSxPBzM:GawsGH-2nhOnYxjW7241QuKYMVw=';
const Timer = () => {

  const [imgsCurrent, setImgsCurrent] = useState(1);

  useEffect(() => {
    axios.post('/proxied/bmapi/login', {
      username: 'wuxueguang',
      password: 'Xsl124'
    }).then(data => console.log(data));
  });

  return (
    <div style={{ width: '50%', height: '50%', marginTop: 100, marginLeft: 200 }}>
      <Image current={imgsCurrent - 1} set={[imgUrl1, imgUrl2, imgUrl3, imgUrl4]} bgColor="#ccc" onChange={cur => setImgsCurrent(cur + 1)} />
      <Pagination size="small" current={imgsCurrent} pageSize={1} total={4} onChange={cur => {
        setImgsCurrent(cur);
      }}/>
    </div>
  );
};

const div = document.createElement('div');
div.style.setProperty('height', '100%');
document.body.replaceChildren(div);

ReactDOM.render(<Timer />, div);



