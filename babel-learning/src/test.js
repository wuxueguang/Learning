import React, { useState } from 'react';


export const Span = props => {
  const { desc } = props;
  const [count, setCount] = useState(0);

  return <span>{desc} {count}</span>
}

const Test = () => {

  return (
    <div className="<script>alert(2)</script>">
      <p>
        <Span desc="今天"/>
        <span>test</span>
        <span>test</span>
        <span dangerouslySetInnerHTML={{__html: '<script>alert(2)</script>'}}/>
      </p>
    </div>
  );
}

export default Test;