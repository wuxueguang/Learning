import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { transformStyle } from '../../utils';

const Pottal = props => {
  const [div, setDiv] = useState(null);

  useEffect(() => {
    const div = document.createElement('div');
    document.body.appendChild(div);
    setDiv(div);

    return () => div.remove();
  }, []);


  return div && ReactDOM.createPortal(props.children, div);
};

export default Pottal;

export const createPortal = styleObj => {
  return props => <Pottal portalStyle={transformStyle(styleObj)} {...props}/>;
};
