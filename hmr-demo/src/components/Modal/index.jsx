
import React, { useState, useEffect } from 'react';
import Portal from '../Portal';

const C = props => {
  const { visible, destroyOnClose = false, ...others } = props;
  const [_visible, setVisible] = useState(visible);

  return (
    <Portal>

    </Portal>
  );
};

export default C;


// class Promise{
//   constructor(initor = Function()){
//     this.destroyed = false;
//     this.result = null;
//     this.status = 'pending';

//     initor.apply([this, this.resolve.bind(this), this.reject.bind(this)]);
//   }
//   destroy(){
//     this.destroyed = true;
//   }
//   resolve(val){
//     if(!this.destroyed){
//       this.status = 'resolved';
//       this.result = val;
//     }
//   }
//   reject(err){
//     if(!this.destroyed){
//       this.status = 'rejected';
//       this.result = err;
//     }
//   }
// }
