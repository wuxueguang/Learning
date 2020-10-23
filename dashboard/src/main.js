
import React, { useState, useEffect } from 'react';

import { DatePicker, Button } from 'antd';


export default function(){
  const [flag, setFlag] = useState(false);

  // useEffect(() => {
  //   setTimeout(setFlag(!flag));
  // }, [flag]);
  // const flag = true;
  return flag ? <DatePicker/> : <Button>test</Button>;
}