import React, {
    PureComponent as Component
} from 'react';

const obj = {
    "name": "Tom",
    "age": 13,
    "child": null,
    "mom": {
        "name": "Tom",
        "age": 13
    }
};

class CodeEditor extends Component {
    // static defaultProps = {
    //     children: JSON.stringify(obj)
    // }

    changeHandler = e => {
        this.props.updateJsonStr(e.target.value);
    }

    keydownHandler = e => {
        e.key === 'Enter' && e.stopPropagation();
    }

    render() {
        return <textarea onKeyDown={this.keydownHandler} className = "editor" onChange = {this.changeHandler} defaultValue = {this.props.children || ''}></textarea>
    }
}

export default CodeEditor;