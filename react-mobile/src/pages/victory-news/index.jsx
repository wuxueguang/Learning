import 'Shared';

import moment from 'moment';
import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';

import Empty from 'Components/Empty';
import Loading from 'Components/Loading';
import Pager from 'Components/Pager';

import { Ul } from './styled';

import { fetchCurrentUser, fetchMedalGetedRecords } from 'Services';

const pageSize = 20;

const C = () => {
  const [querying, setQuerying] = useState(true);
  const [currentUser, setCurrentUser] = useState();
  const [records, setRecords] = useState();
  const [total, setTotal] = useState(0);
  const [pageIndex, setPageIndex] = useState(1);

  useEffect(() => {
    Promise.all([
      fetchCurrentUser(),
      fetchMedalGetedRecords({pageIndex, pageSize}),
    ]).then(([data1, data2]) => {
      setCurrentUser(data1.profile);
      setTotal(data2.total);
      setRecords(data2.result);
      setQuerying(false);
    });
  }, []);

  const doQuery = async pageIndex => {
    const data = await fetchMedalGetedRecords({
      pageSize,
      pageIndex,
    });
    const newRecords = [...records, ...data.result.map((item, idx) => {
      return {
        ...item,
        jsId: records + idx,
      };
    })];

    console.log(newRecords.length);
    setRecords(newRecords);
  };

  const pagerHandler = async () => {
    await doQuery(pageIndex + 1);
    setPageIndex(pageIndex + 1);
  };

  if(querying){
    return <Loading/>;
  }

  return total > 0 ? (
    <>
      <Ul>
        {records.map((row, idx) => {
          const isCurrentUser = row.userId === currentUser.userId;

          return (
            <li key={idx}>
              <div>
                <div className="omit">{isCurrentUser ? row.userName : `${row.province}${row.city}-${row.userName}`}</div>
                <div>
                  <span>{row.description}</span>
                  <span className="date">{(
                    (new Date(row.createTime)).getDate() === (new Date()).getDate() ?
                    moment(row.createTime).format('HH:mm') :
                    moment(row.createTime).format('YYYY-MM-DD')
                  )}</span>
                </div>
              </div>
            </li>
          );
        })}
      </Ul>
      <Pager total={total} pageSize={pageSize} detaultCurrent={1} pagerHandler={pagerHandler} />
    </>
  ) : (
    <Empty/>
  );
};

render(<C/>, document.getElementById('root'));
