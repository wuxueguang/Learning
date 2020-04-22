import React, { PureComponent as Component } from 'react';
import { getType } from '../utils';

const Null = ({children}) => <span className="null">{String(children)}</span>;
const Bool = ({children}) => <span className="bool">{children}</span>;
const Num = ({children}) => <span className="num">{children}</span>;
const Str = ({children}) => <span className="str">"{children}"</span>;

class Obj extends Component{
    state = {
        spreaded: false
    }

    clickHandler = () => {
        this.setState({
            spreaded: !this.state.spreaded
        });
    }

    render(){
        const { children: obj } = this.props;
        const { spreaded } = this.state;
        const keys = Object.keys(obj);
        const type = getType(obj);
        const frontB = type === 'object' ? '{' : '[';
        const backB = type === 'object' ? '}' : ']';

        return spreaded ? (
            <>
                <span className="bracket">{`${frontB} `}</span>
                <i className="spread-btn" onClick={this.clickHandler}>-</i>
                    
                <div style={{paddingLeft: '50px'}}>
                    {
                        keys.map(n => {
                            return <div key={n} className="prop">{type === 'object' ? `"${n}": ` : ''}<DView>{obj[n]}</DView></div>;
                        })
                    }
                </div>
                <div  className="bracket">{backB}</div>
            </>
        ) : (
            <>
                <span className="bracket">{`${frontB} `}</span>
                {keys.length ? <i className="spread-btn" onClick={this.clickHandler}>{keys.length}</i> : null}
                <span className="bracket">{keys.length ? ` ... ${backB}` : backB}</span>
            </>
        )
    }
}

const DView = ({children: val}) => {
    let ret;
    switch(getType(val)){
        case 'null':
            ret = <Null>{val}</Null>;
            break;
        case 'boolean':
                ret = <Bool>{val}</Bool>;
                break;
        case 'number':
            ret = <Num>{val}</Num>;
            break;
        case 'string':
            ret = <Str>{val}</Str>;
            break;
        case 'object':
        case 'array':
            ret = <Obj>{val}</Obj>;
            break;
        default:
            debugger
    }
    return ret;
};



export default DView;