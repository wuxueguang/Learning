import React from 'react';

import Modal from 'Components/Modal';

import { Box } from './styled';

import imgs from './imgs';

const C = () => {

  return (
    <Modal>
      <Box>
        <img src={imgs('likeFeedBack')}/>
      </Box>
    </Modal>
  )
};

export default C;
