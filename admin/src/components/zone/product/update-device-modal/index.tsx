import React from "react";
import { Modal,} from "antd";
import Loading from "@/components/common/loading";

import "./index.scss";

interface ReduxProps {}
interface UpdateDeviceModalProps {
  visible: boolean;
  onClose: any;
  onSubmit: () => void;
}
interface UpdateDeviceModal {
  props: UpdateDeviceModalProps & ReduxProps;
  state: {
    isUpdating: boolean;
  };
}

class UpdateDeviceModal extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {
      isUpdating: false,
    };
    this.submit = this.submit.bind(this);
  }

  submit = async () => {
    const { onSubmit, onClose } = this.props;
    this.setState({
      isUpdating: true,
    });
    await onSubmit();
    this.setState({
      isUpdating: false,
    });
    onClose();
  }
  render() {
    const { visible, onClose } = this.props;
    const { isUpdating } = this.state;
    return (
      <Modal
        visible={visible}
        okText="更新设备"
        onCancel={onClose}
        onOk={this.submit}
        className="veer-offline-productsetting-update-device-modal"
      >
      {
        isUpdating ? (
          <Loading />
        ) : (
          <div className="veer-offline-productsetting-update-device-wrap">
            <h2>提示</h2>
            <p>片单有更新，请及时更新设备</p>
          </div>
        )
      }
      </Modal>
    );
  }
}

export default UpdateDeviceModal;
