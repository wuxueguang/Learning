import React, { useEffect, useState, useRef } from 'react';
import { string, func, array, number } from 'prop-types';
import { Spin } from 'antd';
import Zmage from 'react-zmage';
import { Box } from './styled';
import LoadError from './LoadError';

const C = (props, ref) => {
  const boxRef = useRef();
  const { src, set, width, height, bgColor = '#000' } = props;
  const [loadStatus, setLoadStatus] = useState('loading');
  const [imgWid, setImgWid] = useState('auto');
  const [imgHei, setImgHei] = useState('auto');

  useEffect(() => {
    const imginst = new Image;

    if(src){
      setLoadStatus('loading');

      imginst.setAttribute('crossOrigin', 'anonymous');
      imginst.src = src;

      imginst.addEventListener('load', () => {
        setLoadStatus('successed');
        const imgWid = imginst.width;
        const imgHei = imginst.height;
        const boxRefStyle = getComputedStyle(boxRef.current);
        const boxWid = parseFloat(boxRefStyle.width);
        const boxHei = parseFloat(boxRefStyle.height);

        if(imgWid / imgHei > boxWid / boxHei){
          setImgWid(boxRefStyle.width);
        }else{
          setImgHei(boxRefStyle.height);
        }
      });
      imginst.addEventListener('error', () => {
        setLoadStatus('failed');
      });

      if(ref){
        ref.current = imginst;
      }
    }
  }, [props.src]);

  switch(loadStatus){
  case 'failed':
    return <Box width={width} height={height} bgColor={bgColor}><LoadError/></Box>;
  case 'loading':
    return <Box width={width} height={height} bgColor={bgColor}><Spin/></Box>;
  case 'successed':
    return (
      <Box
        ref={boxRef}
        bgColor={bgColor}
        width={width}
        height={height}
      >
        <Zmage style={{width: imgWid, height: imgHei}} src={src} set={set}/>
      </Box>
    );
  }
};

C.propTypes = {
  src: string,
  set: array,
  width: number,
  height: number,
  onClick: func,
  bgColor: string,
};

export default React.forwardRef(C);
