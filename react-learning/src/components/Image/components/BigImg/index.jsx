
import debounce from 'lodash/debounce';
import React, { useState, useEffect, useRef } from 'react';
import { string, object, number, func, oneOfType, oneOf } from 'prop-types';
import { isImage, isString, createImg } from '../../utils';
import { BigImgBox } from './styled';
import * as store from '../../store';

const loading = document.createElement('i');
loading.classList.add('loading');

const C = props => {
  const { onClose = Function() } = props;
  const boxRef = useRef();
  const [bigImgs, setBigImgs] = useState(store.bigImgs.getState());
  const [pageIndex, setPageIndex] = useState(store.pageIndex.getState());

  const fixImgSize = img => {
    const max = boxRef.current.parentElement.getBoundingClientRect();
    const width = +img.getAttribute('original-width');
    const height = +img.getAttribute('original-height');

    if (width > max.width || height > max.height) {
      if (width / height > max.width / max.height) {
        img.style.setProperty('width', `${max.width}px`);
        img.style.setProperty('height', 'auto');
      } else {
        img.style.setProperty('width', 'auto');
        img.style.setProperty('height', `${max.height}px`);
      }
    } else {
      img.style.setProperty('width', `${width}px`);
      img.style.setProperty('height', `${height}px`);
    }

    return img;
  };

  const resizeHandler = debounce(() => {
    fixImgSize(bigImgs[pageIndex]);
  }, 300);

  useEffect(() => {
    document.body.style.setProperty('overflow', 'hidden');

    store.pageIndex.subscribe(() => {
      setPageIndex(store.pageIndex.getState());
    });

    store.bigImgs.subscribe(() => {
      setBigImgs(store.bigImgs.getState());
    });

    return () => {
      document.body.style.setProperty('overflow', 'visible');
    };
  }, []);

  useEffect(() => {
    boxRef.current.replaceChildren(loading);
    if(isImage(bigImgs[pageIndex])){
      boxRef.current.replaceChildren(fixImgSize(bigImgs[pageIndex]));
    }else if(isString(bigImgs[pageIndex])){
      createImg(bigImgs[pageIndex]).then(img => {
        store.bigImgs.dispatch({
          type: 'bigImgs/update',
          payload: { idx: pageIndex, item: img },
        });
      });
    }else if(!bigImgs[pageIndex]){
      if(isImage(store.imgs.getState()[pageIndex])){
        store.bigImgs.dispatch({
          type: 'bigImgs/update',
          payload: { idx: pageIndex, item: store.imgs.getState()[pageIndex]},
        });
      }else if(isString(store.imgs.getState()[pageIndex])){
        createImg(store.imgs.getState()[pageIndex]).then(img => {
          img.setAttribute('rotate', 0);

          store.bigImgs.dispatch({
            type: 'bigImgs/update',
            payload: { idx: pageIndex, item: img },
          });

          store.imgs.dispatch({
            type: 'imgs/update',
            payload: { idx: pageIndex, item: img },
          });
        });
      }
    }

    window.addEventListener('resize', resizeHandler);

    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  }, [pageIndex, bigImgs]);

  return (
    <BigImgBox>
      <div className="operators">
        <a
          className="rotate-left"
          onClick={() => {
            const r = +bigImgs[pageIndex].getAttribute('rotate');
            bigImgs[pageIndex].style.setProperty('transform', `rotate3d(0,0,1,${r - 90}deg)`);
            bigImgs[pageIndex].setAttribute('rotate', r - 90);
          }}
        />
        <a
          className="rotate-right"
          onClick={() => {
            const r = +bigImgs[pageIndex].getAttribute('rotate');
            bigImgs[pageIndex].style.setProperty('transform', `rotate3d(0,0,1,${r + 90}deg)`);
            bigImgs[pageIndex].setAttribute('rotate', r + 90);
          }}
        />
        <a
          className="close"
          onClick={ () => {
            onClose();
          } }
        />
      </div>
      { bigImgs.length > 1 && <a className="prevous" onClick={ () => {
        store.pageIndex.dispatch({
          type: 'pageIndex/update',
          payload: ((pageIndex + bigImgs.length - 1) % bigImgs.length),
        });
      } } /> }
      { bigImgs.length > 1 && <a className="next" onClick={ () => {
        store.pageIndex.dispatch({
          type: 'pageIndex/update',
          payload: (pageIndex + 1) % bigImgs.length,
        });
      } } /> }
      <span
        ref={ boxRef }
        className={ status }
      ></span>
    </BigImgBox>
  );
};

C.propTypes = {
  img: oneOfType([string, object]),
  status: oneOf(['loading', 'error', 'loaded']),
  current: number,
  onClose: func,
};

export default C;
