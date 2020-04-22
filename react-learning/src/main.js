import React, { useState, PureComponent as Component } from 'react';
import ReactDOM from 'react-dom';

const Ul = ({parentName, parentAge}) => {
    const [name, setName] = useState('Tom');
    const [age, setAge] = useState(13);

    const clickHandler = e => {
        setName('John');
        setAge(14);
        // Promise.resolve().then(() => {
        //     setName('John');
        //     setAge(14);
        // });
    };

    console.log(parentName, name, age);

    return (
        <>
            <input onChange={() =>{}} value={parentName} />
            <input onChange={() =>{}} value={parentAge} />
            <ul>
                <li onClick={clickHandler}>{name}</li>
                <li>{age}</li>
            </ul>
        </>
    );
};

class App extends Component{
    constructor(props){
        super(props);
        this.state = {
            name: 'Tom',
            age: 13
        };
        this.ref = React.createRef();
    }

    componentDidMount(){
        // this.setState({name: 'Bob'});
        // his.setState({age: 16});

        this.ref.current.addEventListener('click', () => {
            this.setState({name: 'Jack'});
            this.setState({age: 33});
        });
    }

    clickHandler = e => {
        this.setState({name: 'Jack'});
    }

    render(){
        
        console.log(this.state.name, this.state.age);
        return (
            <div ref={this.ref}>
                <Ul parentName={this.state.name} parentAge={this.state.age}/>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));

