import React from "react";
import { Modal, Row, Col, Button, Icon, Input, message } from "antd";
import { DeviceTypes } from "@/types";
import { Endpoint } from "@/endpoints";
import { validate } from "@babel/types";
interface DeviceDetailModalProps {
  show: boolean;
  cancel: any;
  onUpdate?: () => void;
  device?: DeviceTypes.DeviceInfo;
}
interface DeviceDetailModal {
  props: DeviceDetailModalProps;
  state: {
    qrcode_err: boolean;
    isEdit: boolean;
    qrcode: string;
    inputVal: string;
  };
}
class DeviceDetailModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      qrcode_err: false,
      isEdit: false,
      qrcode: "",
      inputVal: ""
    };
  }
  async generateQrcode() {
    try {
      if (this.props.device && this.props.device.id) {
        const res = await Endpoint.Device.getDeviceQrcode(this.props.device.id);
        this.setState({
          qrcode: res.qr_code,
          qrcode_err: false
        });
      } else {
        message.error("未获得设备id");
      }
    } catch (_) {}
  }

  edit() {
    const { device } = this.props;
    const deviceSequence = ((device && device.sequence.toString()) || '');
    this.setState({
      inputVal: deviceSequence,
      isEdit: true,
    });
  }

  cancelEdit() {
    this.setState({
      inputVal: '',
      isEdit: false
    });
  }

  change(e) {
    this.setState({
      inputVal: e.target.value,
    });
  }

  async updateDeviceSequence() {
    const { cancel, onUpdate, device } = this.props;
    const { inputVal } = this.state;
    if (!/^[0-9]+$/.test(inputVal)) {
      return message.info('设备编号只能是数字');
    }
    if (device) {
      await Endpoint.Device.updateDeviceSequence(device.id, inputVal);
      message.info('更新成功!');
      this.setState({
        isEdit: false,
      });
      onUpdate && onUpdate();
    }
    cancel();
  }

  renderEditForm() {
    const { device } = this.props;
    const { inputVal } = this.state;
    const deviceSequence = ((device && device.sequence.toString()) || '');
    return (
      <div className="edit-form">
        <Input onChange={this.change.bind(this)} defaultValue={deviceSequence} placeholder="输入设备编号" />
        <Button size="small" type="primary" disabled={deviceSequence ===  inputVal} onClick={this.updateDeviceSequence.bind(this)}>更新</Button>
        <Button size="small" type="link" onClick={this.cancelEdit.bind(this)}>取消</Button>
      </div>
    )
  }

  render() {
    const { show, cancel, device } = this.props;
    const { qrcode_err, qrcode, isEdit } = this.state;
    return (
      <Modal
        title="头显设备详情"
        visible={show}
        onCancel={cancel}
        footer={null}
      >
        <Row className="device-detail">
          <Col xs={14} sm={14} md={14} lg={14}>
            { isEdit ? (
              <div className="device-detail-line">
                <span className="device-detail-line-title">设备编号：</span>
                {this.renderEditForm()}
              </div>
            ) : (
              <div className="device-detail-line">
                <span className="device-detail-line-title">设备编号：</span>
                <span>{device && device.sequence}</span>
                <span className="icon-edit" onClick={this.edit.bind(this)}><Icon type="form" /></span>
              </div>
            )}
            <div className="device-detail-line">
              <span className="device-detail-line-title">设备ID:</span>
              <span>{device && device.id}</span>
            </div>
            {/* <div className="device-detail-line">
              <span className="device-detail-line-title">更新状态：</span>
              <span>
                {device && device.state}
              </span>
            </div> */}
          </Col>
          <Col xs={10} sm={10} md={10} lg={10} style={{ textAlign: "center" }}>
            <div style={{ textAlign: "center" }}>
              <img
                src={(device && device.qr_code) || qrcode}
                className="img"
                onError={() => {
                  this.setState({
                    qrcode_err: true
                  });
                }}
              />
              {((device && device.qr_code) || qrcode) && !qrcode_err ? (
                <Button type="primary" size="small" className="btn-group-right">
                  <a href={(device && device.qr_code) || qrcode}>下载二维码</a>
                </Button>
              ) : (
                <div>
                  <p style={{ color: "rgba(0,0,0,0.25)" }}>二维码加载出错</p>
                  <Button
                    type="primary"
                    onClick={this.generateQrcode.bind(this)}
                  >
                    生成二维码
                  </Button>
                </div>
              )}
            </div>
          </Col>
        </Row>
      </Modal>
    );
  }
}
export default DeviceDetailModal;
