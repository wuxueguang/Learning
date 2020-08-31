import React from "react";
import { DDTypes } from "../types";
import { Input, Form, Button, Icon } from "antd";
import classNames from "classnames";

class DDPassword<T extends DDTypes.BaseT> extends DDTypes.DDElement<T> {
  show = false;

  renderCell(data: T, model: DDTypes.DDDataFields<T>, index: number) {
    return (
      <div>
        {this.show && data[model.dataIndex]}
        <Button
          onClick={() => {
            this.show = true;
            this.forceUpdate();
          }}
        >
          Show
        </Button>
      </div>
    );
  }

  renderField(data, model: DDTypes.DDDataFields<T>, index: number) {
    const { parent } = this.props;
    return (
      <Form.Item>
        <Input.Password
          className={classNames(
            this.defaultClassName,
            `form-${parent.props.name}-field-${model.dataIndex}`
          )}
          defaultValue={data[model.dataIndex] ? data[model.dataIndex] : ""}
          prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,0.25)" }} />}
          type={model.type}
          placeholder={model.title}
          onChange={e => {
            data[model.dataIndex] = e.target.value;
          }}
          disabled={model.disabled}
        />
      </Form.Item>
    );
  }

  renderPlain(data: T, model: DDTypes.DDDataFields<T>, index: number) {
    const { parent, type } = this.props;
    return (
      <div
        className={classNames(
          this.defaultClassName,
          `${type}-${parent.props.name}-cell-${model.dataIndex}`
        )}
      >
        <div className="cell-title title">{model.title}</div>
        <div className="cell-content">{data[model.dataIndex]}</div>
      </div>
    );
  }
}

export default DDPassword;
