import React, { PureComponent as Component } from 'react';

class ParseBtn extends Component{
    clickHandler = () => {
        const { jsonStr, updateStatus, updateJsonObj } = this.props;

        try{
            const jsonObj = JSON.parse(jsonStr);
            updateStatus('normal');
            updateJsonObj(jsonObj);
        }catch(e){
            updateStatus('unnormal');
        }
    }

    enterPressHandler = e => e.key === 'Enter' && this.clickHandler()

    componentDidMount(){
        window.addEventListener('keydown', this.enterPressHandler);
    }

    componentWillUnmount(){
        window.removeEventListener('keydown', this.enterPressHandler);
    }
    
    render(){
        return <button onClick={this.clickHandler}>转化</button>;
    }
}

export default ParseBtn;