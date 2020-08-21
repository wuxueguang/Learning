import React from 'react';

class SyncSetState extends React.Component{
    state = {
        count: 0
    }
    componentDidMount(){
        this.setState({count: 1});
        console.log(this.state);
        debugger
        this.setState({count: 3});
        console.log(this.state);
        Promise.resolve().then(() => {   //sync
            this.setState({count: 5});
            console.log(this.state);
            
            this.setState({count: 7});
            console.log(this.state);
        });
        setTimeout(() => {   //sync
            this.setState({count: 9});
            console.log(this.state);
            
            this.setState({count: 11});
            console.log(this.state);
        }, 5000);
    }
    render(){
        return (
            <button>{this.state.count}</button>
        )
    }
}

export default SyncSetState;