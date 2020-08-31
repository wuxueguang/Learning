import React from "react";
import classNames from 'classnames';
import { Input, Tooltip } from "antd";

interface NumericInput {
  props: {
    defaultval?: string;
    min?: string;
    onCallbackParent: any;
    addonBefore?: string;
  };
  state: {
    value: string;
    title: string;
    hasError: boolean;
  };
}

class NumericInput extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: props.defaultval || "",
      hasError: false,
      title: ""
    };
  }
  onChange = e => {
    const { value } = e.target;
    const { min } = this.props;
    let minNumber = 0;
    if (min) {
      minNumber = parseFloat(min);
    }
    const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
    if (
      (!Number.isNaN(value) && reg.test(value)) ||
      value === "" ||
      value === "-"
    ) {
      if (1 * value > 0 && (value < minNumber)) {
        this.setState({
          hasError: true,
          value: value,
          title: `不能小于${minNumber}`
        });
        this.props.onCallbackParent(value, this.props.defaultval, min);
        return;
      }
      this.setState({
        hasError: false,
        value: value,
        title: value ? "" : "请输入数字"
      });
    } else if (/^\.[0-9]+/.test(value)) {
      this.setState({
        value: '0' + value,
        hasError: false,
      });
    } else {
      this.setState({
        hasError: false,
        title: "请输入数字"
      });
    }

    this.props.onCallbackParent(value, this.props.defaultval, min);
  };

  // '.' at the end or only '-' in the input box.
  onBlur = () => {
    const { min } = this.props;
    const { value } = this.state;
    if (value!.charAt(value!.length - 1) === "." || value === "-") {
      this.setState({
        value: value!.slice(0, -1),
        hasError: false,
      });
    }
    if (Number(value) < Number(min)) {
      this.setState({
        hasError: true,
        value: value,
        title: `不能小于${Number(min)}`
      });
    }
  };

  render() {
    const { value, title, hasError } = this.state;
    const { addonBefore } = this.props;
    const cls = classNames({
      'has-error': hasError,
    });
    return (
      <span className={cls}>
        <Tooltip
          trigger={"focus"}
          title={title}
          placement="topLeft"
          className={cls}
          overlayClassName="numeric-input"
        >
          <Input
            value={value}
            onChange={this.onChange.bind(this)}
            onBlur={this.onBlur.bind(this)}
            maxLength={25}
            addonBefore={addonBefore}
          />
        </Tooltip>
      </span>
    );
  }
}

export default NumericInput;
