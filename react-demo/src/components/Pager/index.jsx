import React, { useEffect, useRef, useState } from 'react';
import { num, func } from 'prop-types';
// import IntersectionObserver from 'intersection-observer-polyfill';
import { Box } from './styled';


const C = props => {
  const { total, pageSize, defaultCurrent = 1, pagerHandler = Function() } = props;
  const [current, setCurrent] = useState(defaultCurrent);
  const ref = useRef();

  // useEffect(() => {
  //   if(IntersectionObserver){
  //     const observer = new IntersectionObserver(async entries => {
  //       if(pageSize * current >= total){
  //         observer.unobserve(ref.current);
  //       }else if(entries[0].isIntersecting){
  //         await pagerHandler();
  //         setCurrent(current + 1);
  //       }
  //     });
  //     observer.observe(ref.current);
  //     return () => observer.unobserve(ref.current);
  //   }
  // }, [pageSize, current, total, ref.current, pagerHandler]);

  useEffect(() => {
    // if(!IntersectionObserver){
      let querying = false;
      const handler = async () => {
        const windowHeight = window.innerHeight;
        const bodyHeight = parseInt(getComputedStyle(document.body).height);

        if(window.scrollY + windowHeight > bodyHeight - 30 && !querying){
          if(pageSize * current >= total){
            window.removeEventListener('scroll', handler);
          }else{
            querying = true;
            await pagerHandler();
            querying = false;
            setCurrent(current + 1);
          }
        }
      };
      window.addEventListener('scroll', handler);

      return () => window.removeEventListener('scroll', handler);
    // }
  }, [pageSize, current, total, pagerHandler]);

  return (
    <div ref={ref}>
      <Box>
        {pageSize * current < total && <span>loading...</span>}
      </Box>
    </div>
  );
};

C.propTypes = {
  total: num,
  pageSize: num,
  defaultCurrent: num,
  pagerHandler: func,
};

export default C;
