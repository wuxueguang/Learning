import React from 'react';
import { DDTypes } from '../types';
import { Switch, Form } from 'antd';
import classNames from "classnames";

class DDSwitch<T extends DDTypes.BaseT> extends DDTypes.DDElement<T>{

    renderCell(data: T, model: DDTypes.DDDataFields<T>, index: number): React.ReactNode{
        return <Switch
                defaultChecked={data[model.dataIndex]}
                checked={data[model.dataIndex]}
            />
    }

    renderPlain(data: T, model: DDTypes.DDDataFields<T>, index: number): React.ReactNode{
        return <Switch
                defaultChecked={data[model.dataIndex]}
                checked={data[model.dataIndex]}
            />
    }

    renderField(data, model: DDTypes.DDDataFields<T>, index: number): React.ReactNode{
        const { parent } = this.props;
        return <Form.Item
            label={model.title}
            >
            <Switch
                className={classNames(this.defaultClassName, `form-${parent.props.name}-field-${model.dataIndex}`)}
                defaultChecked={data[model.dataIndex]}
                onChange={(v)=>{
                    data[model.dataIndex] = v;
                }}
            />
        </Form.Item>
    }

}


export default DDSwitch;