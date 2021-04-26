import 'Shared';

import qs from 'query-string';
import React, { useEffect, useState } from 'react';
import { render } from 'react-dom';
import { Ul } from './styled';
import imgs from './imgs';

import Loading from 'Components/Loading';
import Empty from 'Components/Empty';
import Pager from 'Components/Pager';

import { fetchHeroStories } from 'Services';

const pageSize = 20;

const C = () => {
  const { id, groupUid } = qs.parse(location.search);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [stories, setStories] = useState([]);
  const [pageIndex, setPageIndex] = useState(1);

  const doQuery = async (pageIndex, isFirstTime = false) => {
    const data = await fetchHeroStories({
      pageSize,
      pageIndex,
      groupUid,
      id: Number(id),
    });
    const newStories = [...stories, ...data.result.map((item, idx) => {
      return {
        ...item,
        jsId: stories + idx,
      };
    })];

    console.log(newStories.length);
    setStories(newStories);

    isFirstTime && setTotal(data.total);
    isFirstTime && setLoading(false);
  };

  useEffect(() => doQuery(pageIndex, true), []);

  const pagerHandler = async () => {
    await doQuery(pageIndex + 1);
    setPageIndex(pageIndex + 1);
  };

  if(loading){
    return <Loading/>;
  }

  return total > 0 ? (
    <>
      <Ul>
        {stories.map(row => (
          <li key={row.jsId}>
            <a href={`./story-detail.html?id=${row.shareUid}`}>
              <img src={row.imagePath || imgs('defaultBriefImg')} />
              <div className={`title ${row.hasRead && 'readed'}`}>{row.title}</div>
              <div>
                <i></i>
                <span>{row.viewCount || 0}</span>
                <i></i>
                <span>{row.likeCount || 0}</span>
                {row.hasRead && <span>已读</span>}
              </div>
            </a>
          </li>
        ))}
      </Ul>
      <Pager total={total} pageSize={pageSize} defaultCurrent={1} pagerHandler={pagerHandler}/>
    </>
  ) : (
    <Empty/>
  );
};

render(<C/>, document.getElementById('root'));
