
import React, { useState } from 'react';
import classNames from 'classnames';

import { Button } from './styled';

const C = props => {

  const { disabled, type, async = false, htmlType = 'button', className } = props;

  const [loading, setLoading] = useState(props.loading || false);

  const otherProps = {...props};

  ['children', 'onClick'].forEach(key => delete otherProps[key]);

  const klass = [
    'zz-btn',
    {
      loading,
      disabled,
      [type]: !disabled,
    },
    className
  ];

  return (
    <Button
      type={htmlType}
      className={classNames(klass)}
      onClick={async e => {
        if(props.disabled){
          return false;
        }
        if(async){
          props.onClick(e);
        }else if(loading){
          return false;
        }else{
          setLoading(true);
          try{
            await props.onClick(e);
          }catch(err){
            console.error(err);
          }finally{
            setLoading(false);
          }
        }
      }}
    ><span className="content-box">{props.children}</span></Button>
  );
};

export default C;