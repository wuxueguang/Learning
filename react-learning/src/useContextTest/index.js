import React, { Component, useContext, useState } from 'react';

// without context
// const Sun = ({ageOfGrandpa, ageOfFather}) => <p>My grandpa is {ageOfGrandpa} years old. My father is {ageOfFather} years old. I am 12 years old.</p>;
// const Father = ({ageOfFather}) => <Sun ageOfGrandpa={ageOfFather} ageOfFather={46} />;
// const Grandpa = () => <Father ageOfFather={96} />;


const GrandpaContext = React.createContext({age: 96});

// class module with context
// class Sun extends Component{
//   render(){
//     return <p>My grandpa, {this.context.name} is {this.context.age} years old. My father is {this.props.ageOfFather} years old. I am 12 years old.</p>;
//   }
// }
// Sun.contextType = GrandpaContext;

// const Father = () => <Sun ageOfFather={46} />;
// const Grandpa = () => (
//   <GrandpaContext.Provider value={{name: 'Jack', age: 96}}>
//     <Father ageOfFather={96} />
//   </GrandpaContext.Provider>
// );


// useContext
const Sun = props => {
  const grandpaInfo = useContext(GrandpaContext);

  return (
    <GrandpaContext.Consumer>
      {grandpaInfo => <p>My grandpa, {grandpaInfo.name} is {grandpaInfo.age} years old. My father is {props.ageOfFather} years old. I am 12 years old.</p>}
    </GrandpaContext.Consumer>
  );
};
const Father = () => <Sun ageOfFather={46} />;
const Grandpa = () => {
  const [age, setAge] = useState(96);

  setTimeout(() => {
    setAge(age + 1);
  }, 1000);

  return (
    <GrandpaContext.Provider value={{name: 'Jack', age}}>
      <Father ageOfFather={96} />
    </GrandpaContext.Provider>
  );
};

export default Grandpa;

