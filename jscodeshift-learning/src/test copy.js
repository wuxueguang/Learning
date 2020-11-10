

import React from 'react';

class C extends React.Component {
  constructor(props){
    super(props);

    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler(e){
    console.log(e.value);
  }

  render(){

    return (
      <a href="#" onClick={this.clickHandler}>test</a>
    )
  }
}

export default C;