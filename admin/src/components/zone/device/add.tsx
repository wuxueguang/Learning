import React from "react";
import { Modal, Icon, message } from "antd";
import { Endpoint } from "@/endpoints";

interface AddDeviceModalProps {
  cancel: any;
  show: boolean;
  zoneId: string;
  activation: string;
}
interface AddDeviceModal {
  props: AddDeviceModalProps;
  state: {
    activation: string;
  };
}
class AddDeviceModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activation: ""
    };
  }

  componentWillReceiveProps(nextProps: any) {
    if (
      JSON.stringify(nextProps) !== JSON.stringify(this.props) &&
      nextProps.activation !== this.props.activation
    ) {
      this.setState({
        activation: nextProps.activation
      });
    }
  }
  async getActivationCode(zoneId) {
    try {
      const res = await Endpoint.Device.getDeviceActivation(zoneId);
      this.setState({
        activation: res.activation_code
      });
    } catch (_) {
      // message.error("网络错误，请稍后再试");
    }
  }
  render() {
    const { cancel, show, zoneId } = this.props;
    const { activation } = this.state;
    return (
      <Modal
        visible={show}
        title="新增头显设备"
        onCancel={cancel}
        width={304}
        footer={null}
      >
        <div>
          <p className="active-description">请在设备内输入下面的激活码</p>
          <span className="active-code">{activation}</span>
          <span
            className="active-icon"
            onClick={this.getActivationCode.bind(this, zoneId)}
          >
            <Icon type="reload" />
            <span>刷&nbsp;新</span>
          </span>
          <p className="valid">5分钟有效</p>
        </div>
      </Modal>
    );
  }
}
export default AddDeviceModal;
