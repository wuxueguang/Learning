
import debounce from 'lodash/debounce';
import React, { useRef, useEffect, useState } from 'react';
import { string, number, array, oneOfType, func } from 'prop-types';
import { ImgBox } from './styled';
import { isString, isArray, isImage, createImg } from './utils';
import * as store from './store';
import { BigImg, Portal } from './components';

const srcer = src => isArray(src) ? src : [src];

const loading = document.createElement('i');
loading.classList.add('loading');

const Image = props => {
  const { src, set, width, height, bgColor, current = 0, onChange = Function() } = props;

  const imgBoxRef = useRef();

  const [dataSet] = useState(isArray(set) ? set : srcer(src));
  const [imgs, setImgs] = useState([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [showBig, setShowBig] = useState(false);

  const fixImgSize = img => {
    const imgWid = img.naturalWidth;
    const imgHei = img.naturalHeight;
    const { width, height } = imgBoxRef.current.parentElement.getBoundingClientRect();
    const boxWid = +props.width || width;
    const boxHei = +props.height || height;

    if (imgWid / imgHei > boxWid / boxHei) {
      img.style.setProperty('width', `${boxWid}px`);
      img.style.setProperty('height', 'auto');
    } else {
      img.style.setProperty('width', 'auto');
      img.style.setProperty('height', `${boxHei}px`);
    }

    img.style.setProperty('transform', 'rotate3d(0,0,1,0deg)');
    img.setAttribute('rotate', 0);

    return img;
  };

  const resizeHandler = debounce(() => {
    if(isImage(imgs[pageIndex]) && !showBig){
      fixImgSize(imgs[pageIndex]);
    }
  }, 300);

  const resizeObserver = new ResizeObserver(() => {
    resizeHandler();
  });

  useEffect(() => {
    store.imgs.subscribe(() => {
      setImgs(store.imgs.getState());
    });
    store.imgs.dispatch({
      type: 'imgs/reset',
      payload: dataSet.map(item => isArray(item) ? item[0] : item),
    });

    store.pageIndex.subscribe(() => {
      setPageIndex(store.pageIndex.getState());
      onChange(store.pageIndex.getState());
    });

    store.bigImgs.dispatch({
      type: 'bigImgs/reset',
      payload: dataSet.map(item => isArray(item) ? item[1] : undefined),
    });
  }, []);

  useEffect(() => {
    store.pageIndex.dispatch({
      type: 'pageIndex/update',
      payload: current
    });
  }, [current]);

  useEffect(() => {
    if (!showBig) {
      imgBoxRef.current.replaceChildren(loading);

      if (isImage(imgs[pageIndex])) {
        const img = fixImgSize(imgs[pageIndex]);
        imgBoxRef.current.replaceChildren(img);
      } else if (isString(imgs[pageIndex])) {
        createImg(imgs[pageIndex]).then(img => {
          store.imgs.dispatch({
            type: 'imgs/update',
            payload: { idx: pageIndex, item: img },
          });
          if (!store.bigImgs.getState()[pageIndex]) {
            store.bigImgs.dispatch({
              type: 'bigImgs/update',
              payload: { idx: pageIndex, item: img },
            });
          }
        });
      }
    }

    resizeObserver.observe(imgBoxRef.current);

    return () => {
      resizeObserver.unobserve(imgBoxRef.current);
    };
  }, [pageIndex, imgs, showBig]);

  return (
    <>
      <ImgBox
        ref={ imgBoxRef }
        bgColor={ bgColor }
        width={ width || '100%' }
        height={ height || '100%' }
        onClick={ () => setShowBig(true) }
      />
      {showBig && <Portal><BigImg onClose={ () => setShowBig(false) } /></Portal> }
    </>
  );
};

Image.propTypes = {
  src: oneOfType([string, array]),
  set: array,
  width: oneOfType([string, number]),
  height: oneOfType([string, number]),
  bgColor: string,
  current: number,
  onChange: func,
};

export default Image;


