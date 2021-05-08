

import React, { useRef, useEffect, useState } from 'react';
import { string, number, array, oneOfType } from 'prop-types';
import Portal from '../Portal';
import { ImgBox, BigImgBox } from './styled';
import { BigImg } from './components';
import { typeOf } from './utils';

const srcer = src => Array.isArray(src) ? src : [src];

const loading = document.createElement('i');
loading.classList.add('loading');

export const generator = () => {

  const C = props => {

    const { src, set, width, height, bgColor } = props;

    const [dataSet] = useState(Array.isArray(set) ? set : [src]);
    const [imgs, setImgs] = useState(dataSet.map(item => srcer(item)));
    const [pageIndex, setPageIndex] = useState(0);

    const imgBoxRef = useRef();

    const setImage = () => {
      imgBoxRef.current.replaceChildren(loading);
      const [src] = imgs[pageIndex];
      if (typeOf(src) === 'string') {
        const img = new Image;
        img.src = src;
        img.addEventListener('load', () => {

          const imgWid = img.width;
          const imgHei = img.height;
          const { width, height } = imgBoxRef.current.parentElement.getBoundingClientRect();
          const boxWid = props.width || width;
          const boxHei = props.height || height;

          imgs[pageIndex][0] = img;

          if (imgWid / imgHei > boxWid / boxHei) {
            img.style.setProperty('width', `${boxWid}px`);
            img.style.setProperty('height', 'auto');

            img.setAttribute('data-width', `${boxWid}px`);
            img.setAttribute('data-height', 'auto');
          } else {
            img.style.setProperty('width', 'auto');
            img.style.setProperty('height', `${boxHei}px`);

            img.setAttribute('data-width', 'auto');
            img.setAttribute('data-height', `${boxHei}px`);
          }

          imgBoxRef.current.replaceChildren(img);
        });
      } else if (src) {
        src.style.setProperty('width', src.getAttribute('data-width'));
        src.style.setProperty('height', src.getAttribute('data-height'));
        imgBoxRef.current.replaceChildren(src);
      }
    };

    useEffect(() => {
      showBig || setImage();
    }, [pageIndex]);

    const [showBig, setShowBig] = useState(false);

    useEffect(() => {
      document.body.style.setProperty('overflow', showBig ? 'hidden' : 'visible');
      if (showBig) {
        let [src, bigSrc] = imgs[pageIndex];

        bigSrc = bigSrc || src;
        if (typeOf(bigSrc) === 'string') {
          const img = new Image;
          img.src = bigSrc;
          img.addEventListener('load', () => {
            imgs[pageIndex][1] = img;
            setImgs([...imgs]);
          });
        }else{
          imgs[pageIndex][1] = bigSrc;
          setImgs([...imgs]);
        }
        if (typeOf(bigSrc) !== 'string' && bigSrc === src) {
          bigSrc.style.setProperty('width', 'auto');
          bigSrc.style.setProperty('height', 'auto');
        }
      }
    }, [showBig, pageIndex]);

    return (
      <>
        <ImgBox
          ref={ imgBoxRef }
          bgColor={ bgColor }
          width={ width || '100%' }
          height={ height || '100%' }
          onClick={ () => setShowBig(true) }
        />
        <br /><br />
        <button onClick={ () => {
          setPageIndex((pageIndex + 1) % dataSet.length);
        } }>next</button>
        {showBig && (
          <Portal>
            <BigImgBox>
              <a className="close" onClick={ () => {
                setShowBig(false);
                setImage();
              } } />
              {imgs.length > 1 && <a className="prevous" onClick={ () => {
                setPageIndex((pageIndex + imgs.length - 1) % imgs.length);
              } } />}
              {imgs.length > 1 && <a className="next" onClick={ () => {
                setPageIndex((pageIndex + 1) % imgs.length);
              } } />}
              <BigImg img={ imgs[pageIndex][1] } />
            </BigImgBox>
          </Portal>
        ) }
      </>
    );
  };

  C.propTypes = {
    src: oneOfType([string, array]),
    set: array,
    width: number,
    height: number,
    bgColor: string,
  };

  return C;
};

export default generator();


