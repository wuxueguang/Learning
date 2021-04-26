import 'Shared';

import moment from 'moment';
import React , { useEffect, useState } from 'react';
import { render } from 'react-dom';
import qs from 'query-string';

import Loading from 'Components/Loading';

import { Box } from './styled';

import { HasLiked, ThanksForLike } from 'Components/Toasts';

import { fetchStoryDetail, tellStoryReaded, likeStory, checkStoryIsLiked } from 'Services';

const C = () => {
  const { id } = qs.parse(location.search);
  const [detail, setDetail] = useState();
  const [showLiked, setShowLiked] = useState(false);
  const [showThankLike, setShowThankLike] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    fetchStoryDetail({id}).then(data => {
      setDetail(data);
    });

    tellStoryReaded([{shareUid: id}]);

    checkStoryIsLiked({shareUid: id}).then(isLiked => {
      setIsLiked(isLiked);
    });
  }, []);

  if(!detail){
    return <Loading/>;
  }

  return (
    <Box>
      <div>
        {/* <div className="user" >
          <img src={detail.userImg || imgs('userDefault')}/>
          <span>{detail.userName || '北京市朝阳区-张医生'}</span>
        </div> */}
        <h2>{detail.title}</h2>
        <div className="content" dangerouslySetInnerHTML={{__html: detail.htmlContent}}></div>
        <div className="footer">
          <span className="">{detail.viewCount}</span>
          <span>{moment(detail.lastUpdateTime).format('YYYY-MM-DD')}</span>
        </div>
      </div>

      <div
        className="like-box"
        onClick={async () => {
          if(isLiked){
            setShowLiked(true);
            setTimeout(() => setShowLiked(false), 1000);
          }else{
            setShowThankLike(true);
            await likeStory({shareUid: id});
            setTimeout(() => setShowThankLike(false), 1000);
            setIsLiked(true);
            setDetail({...detail, likeCount: detail.likeCount + 1});
          }
        }}
      >
        <span className={isLiked && 'liked'}>{detail.likeCount <= 0 ? '赞一下' : `${detail.likeCount}个赞`}</span>
      </div>
      {showLiked && <HasLiked/>}
      {showThankLike && <ThanksForLike/>}
    </Box>
  );
};

render(<C/>, document.getElementById('root'));
