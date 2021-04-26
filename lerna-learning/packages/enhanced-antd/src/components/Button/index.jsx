
import React, { useState } from 'react';
import { bool, func } from 'prop-types';
import { Button } from 'antd';

const C = props => {
  const { disabled, async = false, } = props;

  const [loading, setLoading] = useState(props.loading || false);

  const otherProps = { ...props, loading };

  ['onClick'].forEach(key => delete otherProps[key]);

  return (
    <Button
      {...otherProps}
      onClick={async e => {
        if (props.disabled) {
          return false;
        }
        if (async) {
          props.onClick(e);
        } else if (loading) {
          return false;
        } else {
          setLoading(true);
          try {
            await props.onClick(e);
          } catch (err) {
            console.error(err);
          } finally {
            setLoading(false);
          }
        }
      }}
    />
  );
};

C.propTypes = {
  loading: bool,
  async: bool,
  disabled: bool,
  onClick: func,
};

export default C;
