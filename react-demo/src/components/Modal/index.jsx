
import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

const C = props => {
  // const { position = 'center' } = props;
  const [div, setDiv] = useState();

  useEffect(() => {
    const div = document.createElement('div');
    document.body.appendChild(div);
    setDiv(div);

    return () => div.remove();
  }, []);


  return div ? ReactDOM.createPortal(props.children, div) : null;
};


export default C;
