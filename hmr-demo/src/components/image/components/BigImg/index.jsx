import React, { useState, useEffect, useRef } from 'react';
import { string, object, oneOfType, oneOf } from 'prop-types';
import { isImage } from '../../utils';

const loading = document.createElement('i');
loading.classList.add('loading');

const C = props => {
  const { img, status } = props;
  const boxRef = useRef();
  const [maxSize, setMaxSize] = useState();

  useEffect(() => {
    let size = maxSize;
    if (!size) {
      const { width, height } = boxRef.current.parentElement.getBoundingClientRect();
      size = { width, height };
      setMaxSize(size);
    }
    if (isImage(img)) {
      const { width, height } = img;
      if (width > size.width || height > size.height) {
        if (width / height > size.width / size.height) {
          img.style.setProperty('width', `${size.width}px`);
          img.style.setProperty('height', 'auto');
        } else {
          img.style.setProperty('width', 'auto');
          img.style.setProperty('height', `${size.height}px`);
        }
      }
      boxRef.current.replaceChildren(img);
    }else{
      boxRef.current.replaceChildren(loading);
    }
  }, [img]);

  return (
    <span
      ref={ boxRef }
      className={status}
    ></span>
  );
};

C.propTypes = {
  img: oneOfType([string, object]),
  status: oneOf(['loading', 'error', 'loaded']),
};

export default C;
