
import React, { useRef, useEffect, useState } from 'react';
import { string, number, object } from 'prop-types';
import defaultImg from './asset/default.jpeg';
import { transformStyle } from '../utils';
import Modal from '../Modal';

const C = props => {

  const ref = useRef();
  const { defaultSrc, src, width, height, style = {}, ...others } = props;
  const [currentImg, setCurrentImg] = useState();
  const [parentElement, setParentElement] = useState();
  const [showBig, setShowBig] = useState(false);

  let bigSrc = src;

  useEffect(() => {
    if(src){
      const img = new Image;
      const styles = transformStyle({width, height, ...style});

      img.src = src;

      Object.entries(styles).forEach(([key, value]) => {
        img.style.setProperty(key, value);
      });

      img.addEventListener('load', e => {
        console.log(e.path[0])
        let parent = parentElement;
        if(!parent){
          parent = ref.current.parentElement;
          setParentElement(parent);
        }
        parent.replaceChild(img, currentImg || ref.current);
        setCurrentImg(img);
      });
    }
  }, [src]);

  return (
    <>
      <img {...others} ref={ref} src={defaultSrc || defaultImg} style={{...style, width, height}} />
      {showBig && <Modal></Modal>}
    </>
  );
};

C.propTypes = {
  defaultSrc: string,
  src: string,
  width: number,
  height: number,
  style: object,
};

export default C;

export const generator = defaultSrc => {

  const C = props => {
    return <C defaultSrc={defaultSrc} {...props}/>;
  };

  return C;
};
