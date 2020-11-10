
import React from 'react';

export default () => {
  return (
    <div onClick={e => alert(e)} style={{color: 'red'}} className="tt">
      <ul>
        <li>test1</li>
        <li>test2</li>
      </ul>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
};