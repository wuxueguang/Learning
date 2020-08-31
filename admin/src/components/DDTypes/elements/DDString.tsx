import React from "react";
import { DDTypes } from "../types";
import { Input, Form, Icon } from "antd";
import classNames from "classnames";

class DDString<T extends DDTypes.BaseT> extends DDTypes.DDElement<T> {
  renderCell(data: T, model: DDTypes.DDDataFields<T>, index: number) {
    return data[model.dataIndex];
  }

  renderField(data, model: DDTypes.DDDataFields<T>, index: number) {
    const { parent } = this.props;
    return (
      <Form.Item>
        <Input
          className={classNames(
            this.defaultClassName,
            `form-${parent.props.name}-field-${model.dataIndex}`
          )}
          defaultValue={data[model.dataIndex] ? data[model.dataIndex] : ""}
          placeholder={model.title}
          prefix={<Icon type="user" style={{ color: "rgba(0,0,0,0.25)" }} />}
          onChange={e => {
            data[model.dataIndex] = e.target.value;
          }}
          disabled={model.disabled}
        />
      </Form.Item>
    );
  }

  renderPlain(data: T, model: DDTypes.DDDataFields<T>, index: number) {
    const { type, parent } = this.props;

    return (
      <div
        className={classNames(
          this.defaultClassName,
          `${type}-${parent.props.name}-${model.dataIndex}`
        )}
      >
        <div className="cell-title title">{model.title}</div>
        <span className="cell-content">{data[model.dataIndex]}</span>
      </div>
    );
  }
}

export default DDString;
