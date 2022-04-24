
import React, { useState, useEffect } from 'react';


class ClassCounter extends React.PureComponent{

  constructor(props){
    super(props);
    this.state = {
      count: 0,
    }
  }

  delayPlus(){
    setTimeout(() => {
      this.setState({count: this.state.count + 1}, this.delayPlus.bind(this));
    }, 1000);
  }

  componentDidMount(){
    this.delayPlus();
  }

  render(){
    return <span>{this.state.count}</span>;
  }
}

const FunctionCounter = () => {

  const [count, setCount] = useState(0);

  useEffect(() => {
    setTimeout(() => setCount(count + 1), 1000);
  }, [count]);

  return <span>{count}</span>;
}

export {
  ClassCounter,
  FunctionCounter,
};
