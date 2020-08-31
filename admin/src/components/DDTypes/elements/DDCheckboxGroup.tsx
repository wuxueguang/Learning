import React from 'react';
import { DDTypes } from '../types';
import { Checkbox, Form } from 'antd';
import classNames from "classnames";

class DDNumber<T extends DDTypes.BaseT> extends DDTypes.DDElement<T>{
    renderField(data, model: DDTypes.DDDataFields<T>, index: number):React.ReactNode {
        const { parent } = this.props;
        return <Form.Item
            label={model.title}
        >
            <Checkbox.Group
                className={classNames(this.defaultClassName,`form-${parent.props.name}-field-${model.dataIndex}`)}
                defaultValue={data[model.dataIndex] ? data[model.dataIndex] : ''}
                onChange={e => {
                    data[model.dataIndex] = e;
                }} 
                disabled={model.disabled}
            />
        </Form.Item>
    }
    
    renderCell(data: T, model: DDTypes.DDDataFields<T>, index: number): React.ReactNode{
        return data[model.dataIndex];
    }

    renderPlain(data: T, model: DDTypes.DDDataFields<T>, index: number):React.ReactNode{
        const { parent, type } = this.props;
        return <div
            className={classNames(this.defaultClassName, `${type}-${parent.props.name}-cell-${model.dataIndex}`)}
        >
            <div className="cell-title title">{model.title}</div>
            <div className="cell-content">{data[model.dataIndex]}</div>
        </div>
    }
}

export default DDNumber;