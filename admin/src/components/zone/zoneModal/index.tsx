import React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { Modal, Button, Form, Input, message } from "antd";
import { ZoneTypes } from "@/types";
import "./index.scss";
import { ZonesState } from "@/reducers/zones";
import { ZoneAction, MenuAction } from "@/actions";
import { Endpoint } from "@/endpoints";

interface ReduxProps {
  Zones: ZonesState;
  dispatch: Dispatch<any>;
}
interface zoneModalProps {
  model: ZoneTypes.zoneModal;
  visible: boolean;
  zone?: ZoneTypes.ZoneInfo;
  closePanel: any;
  data: {
    name: string;
    address: string;
  };
}
interface zoneModal {
  props: zoneModalProps & ReduxProps;
  state: {
    loading: boolean;
    name: string;
    address: string;
  };
}

@(connect<{}, {}, {}, { Zones: ZonesState }>(
  ({ Zones }) => ({ Zones }),
  dispatch => ({ dispatch })
) as any)
class zoneModal extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {
      loading: false,
      name: "",
      address: ""
    };
  }
  componentDidMount() {
    this.setState({
      name: this.props.zone && this.props.zone.name,
      address: this.props.zone && this.props.zone.address
    });
  }
  handleOk = async () => {
    this.setState({ loading: true });
    try {
      if (this.state.name && this.state.address) {
        if (this.props.zone && this.props.zone.id) {
          //编辑体验区
          this.props.dispatch(
            await ZoneAction.update(
              this.props.zone.id,
              this.state.name || this.props.zone.name,
              this.state.address || this.props.zone.address
            )
          );
          message.success(`信息已保存`);
        } else {
          //新建体验区
          await Endpoint.Zone.createZone(this.state.name, this.state.address);
          this.props.dispatch(ZoneAction.clean());
          this.props.dispatch(await ZoneAction.get(10, 1));
          this.props.dispatch(MenuAction.get());
          message.success(`体验区${this.state.name}新建成功`);
        }
      } else {
        message.error("体验区名称或地址不能为空");
        this.setState({ loading: false });
        return;
      }
    } catch (_) {
      // message.error("网络错误，请稍后再试");
    }
    this.setState({ loading: false });
    this.props.closePanel();
  };
  render() {
    const { loading, name, address } = this.state;
    const { visible, zone } = this.props;
    const { title, cancel, confirm } = this.props.model;
    return (
      <Modal
        visible={visible}
        title={title}
        onOk={this.handleOk}
        onCancel={this.props.closePanel}
        destroyOnClose={true}
        footer={[
          <Button key="back" onClick={this.props.closePanel}>
            {cancel}
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={this.handleOk}
          >
            {confirm}
          </Button>
        ]}
      >
        <Form labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
          <Form.Item label="体验区名称" required={true}>
            <Input
              placeholder="请输入名称"
              onChange={e => {
                this.setState({
                  name: e.target.value
                });
              }}
              defaultValue={zone && zone.name}
            />
          </Form.Item>
          <Form.Item label="体验区地址" required={true}>
            <Input.TextArea
              rows={4}
              placeholder="请填写体验区地址"
              className="veer-offline-zone-address-input"
              defaultValue={zone && zone.address}
              onChange={e => {
                this.setState({
                  address: e.target.value
                });
              }}
            />
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default zoneModal;
