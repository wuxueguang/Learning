import React from 'react';


class Counter extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      count: 0
    };
  }

  add(){
    setTimeout(() => {
      this.setState({count: this.state.count + 1}, this.add.bind(this));
    }, 1000);
  }

  componentDidMount(){
    console.log('-----');
    this.add();
  }

  render(){
    return <span>{this.state.count}</span>;
  }
}

export default Counter;