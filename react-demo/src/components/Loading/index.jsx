
import React from 'react';
import { string } from 'prop-types';

import Modal from 'Components/Modal';

import { Loading } from './styled';

const C = props => {
  const { fontSize } = props;

  return (
    <Modal>
      <Loading><span style={{fontSize}}>loading...</span></Loading>
    </Modal>
  );
};

C.propTypes ={
  fontSize: string,
};

export default C;
