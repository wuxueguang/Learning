import 'Shared';
import './styles.css';

import React, { useEffect, useState } from 'react';
import { render } from 'react-dom';

import Loading from 'Components/Loading';

import imgs from './imgs';
import {
  Main,
  SelfInfo,
  NoData,
  Table,
} from './styled';

import { fetchCurrentUser, fetchHeroList } from 'Services';

const C = () => {

  const [querying, setQuerying] = useState(true);
  const [currentUser, setCurrentUser] = useState({});
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchCurrentUser().then(data => {
      setCurrentUser(data.profile);
    });
    fetchHeroList().then(data => {
      setData(data);
      setQuerying(false);
    });
  }, []);

  if(querying){
    return <Loading/>;
  }

  return (
    <Main>
      <div className="content-box">
        <SelfInfo>
          <div>
            <img src={data.currentUserRewardInfo.avatar || currentUser.avatar} />
            <div className="title">我的成就</div>
            <div>我的勋章总数<span className="num">{data.currentUserRewardInfo.rewardCount}</span></div>
          </div>
        </SelfInfo>
        {Array.isArray(data.rankList) && data.rankList.length > 0 ? (
          <Table>
            <thead>
              <tr>
                <th className="ranking">排名</th>
                <th className="hero-info">英雄</th>
                <th className="num">勋章数</th>
              </tr>
            </thead>
            <tbody>
              {data.rankList.map((row, idx) => (
                <tr key={row.userId} className={row.userId === currentUser.userId && 'active'}>
                  <td className="ranking">
                    <div className={`ranked-${idx + 1}`}>{idx + 1}</div>
                  </td>
                  <td className="hero-info">
                    <div>
                      <img src={row.userId === currentUser.userId && currentUser.avatar || row.avatar || imgs('userDefault')}/>
                      <div className="address-name omit">{(row.userId !== currentUser.userId ? `${row.province}${row.city}-` : '') + `${row.userName}`}</div>
                    </div>
                  </td>
                  <td className="num">
                    <div className="omit">{row.rewardCount}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <NoData>
            <img src={imgs('noData')} />
            <div>暂时还无人上榜哦，一起加油吧</div>
          </NoData>
        )}
      </div>
    </Main>
  );
};

render(<C/>, document.getElementById('root'));
