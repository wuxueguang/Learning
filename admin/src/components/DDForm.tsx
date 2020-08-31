import React from "react";
import { Form, Button, Card, Avatar } from "antd";
import { DDTypes, DDSwitchTypes } from "./DDTypes";
import { FormProps } from "antd/lib/form";
import classNames from "classnames";

interface DDFormProps<T extends DDTypes.BaseT>
  extends FormProps,
    DDTypes.DDBasePanelProps<T> {
  model: DDTypes.DDDataFields<T>[];
  data: T;
  name: string;
}

interface DDForm<T extends DDTypes.BaseT> {
  props: DDFormProps<T>;
}

/**
 * Data Driven Form
 * provide data objects and the model that described data
 *
 * don't forget add the onSubmit handle
 *
 * pass the data reference to props.data,
 * you will get latest value of fields that someone changed it
 *
 * @class DDForm
 * @extends {DDTypes.DDPanel<T>}
 * @template T
 */
class DDForm<T extends DDTypes.BaseT> extends DDTypes.DDBasePanel<T> {
  renderChild(): React.ReactNode[] {
    const { model, data } = this.props;
    const children: React.ReactNode[] = [];

    for (let i = 0; i < model.length; i += 1) {
      const target = model[i];
      const subclass: React.ComponentClass<
        DDTypes.DDElementProps<T>
      > = DDSwitchTypes(target.type);

      const child = React.createElement(subclass, {
        key: target.key,
        model: target,
        data: data, ////////// must be reference
        type: "form",
        index: i,
        parent: this
      });
      if (target.display !== false) {
        children.push(child);
      }
    }
    return children;
  }

  render() {
    const { className, onSubmit, panelTitle, data, form } = this.props;
    return (
      <Card className={classNames(className, `card-form-${this.props.name}`)}>
        <Card.Meta
          avatar={
            <Avatar src="https://assets.veervr.tv/@vrups/db4dce51-5fa9-4e6b-adf5-06c98fe4dc01.png" />
          }
          title={panelTitle || data.title}
          className={classNames(
            className,
            `card-form-header-${this.props.name}`
          )}
        />
        <Form
          layout={this.props.layout}
          labelCol={this.props.labelCol}
          wrapperCol={this.props.wrapperCol}
          className={classNames(`form-${this.props.name}`)}
          onSubmit={onSubmit}
        >
          {this.renderChild()}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    );
  }
}

export default DDForm;
