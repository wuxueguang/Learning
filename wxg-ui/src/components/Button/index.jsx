
import React, { useEffect, useState } from 'react';
import { Button } from 'antd';

const C = props => {
  // eslint-disable-next-line react/prop-types
  const { loading, onClick } = props;

  const [loading_, setLoading] = useState(false);
  useEffect(() => setLoading(loading), [loading]);

  const clickHandler = async e => {
    setLoading(true);
    try{
      await onClick(e);
    }finally{
      setLoading(false);
    }
  };

  return (
    <Button
      {...props}
      loading={loading_}
      onClick={clickHandler}
    />
  );
};

export default C;
