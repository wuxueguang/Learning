import React, { PureComponent as Component } from 'react';

import CodeEditor from './CodeEditor';
import ParseBtn from './ParseBtn';
import Viewer from './Viewer';

export default class App extends Component{
    state = {
        jsonObj: undefined,
        jsonStr: '',
        status: 'normal'
    }

    updateJsonObj = jsonObj => this.setState({jsonObj})
    updateJsonStr = jsonStr => this.setState({jsonStr})
    updateStatus = status => this.setState({status})

    render(){
        const { jsonStr, jsonObj, status } = this.state;

        return (
            <div className="container">
                <CodeEditor updateJsonStr={this.updateJsonStr} />
                <Viewer jsonObj={jsonObj} status={status} />
                <ParseBtn jsonStr={jsonStr} updateJsonObj={this.updateJsonObj} updateStatus={this.updateStatus} />
                <p>题目里没体现出数组，也加上了</p>
            </div>
        )
    }
}