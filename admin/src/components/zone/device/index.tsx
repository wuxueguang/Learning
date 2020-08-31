import React from "react";
import { Card, Table, Button, Icon, Dropdown, Menu } from "antd";
import { DeviceTypes } from "@/types/device";
import { ZoneTypes } from "@/types";
import "./index.scss";
import { Endpoint } from "@/endpoints";
import AddDeviceModal from "./add";
import DeviceDetailModal from "./detail";
import withUserPolicy from '@/components/withUserPolicy';
// import zone from "@/endpoints/zone";
interface ReduxProps { }

interface DeviceCardProps {
  zoneId: string;
}

interface DevicePagination {
  total: number,
  current: number,
}

interface DeviceCard {
  props: DeviceCardProps & ReduxProps;
  state: {
    devices: DeviceTypes.DeviceInfo[];
    isFetching: boolean;
    showaddDeviceModal: boolean;
    showdeviceDetail: boolean;
    device?: DeviceTypes.DeviceInfo;
    activation: string;
    pagination: DevicePagination
  };
}

class DeviceCard extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {
      devices: [],
      isFetching: false,
      pagination: {
        total: 0,
        current: 1
      },
      showaddDeviceModal: false,
      showdeviceDetail: false,
      activation: ""
    };
    this.handleTableChange = this.handleTableChange.bind(this);
  }
  async componentWillReceiveProps(nextProps: any) {
    const { zoneId } = this.props;
    if (nextProps.zoneId !== zoneId) {
      if (nextProps.zoneId) {
        this.setState({
          isFetching: true,
        });
        await this.getDevice(nextProps.zoneId, 1);
        this.setState({
          isFetching: false,
        });
      }
    }
  }
  async getDevice(zoneid, page) {
    try {
      const res = await Endpoint.Device.getDevicesSource(zoneid, page);

      this.setState({
        devices: res.data,
        pagination: {
          current: res.pagination.current_page,
          total: res.pagination.total_count,
        }

      });
    } catch (_) {
      this.setState({
        devices: []
      });
    }
  }
  async addDevice() {
    try {
      const res = await Endpoint.Device.getDeviceActivation(this.props.zoneId);
      this.setState({
        activation: res.activation_code
      });
    } catch (_) { }
    this.setState({
      showaddDeviceModal: true
    });
  }
  async closeaddDeviceModal() {
    this.setState({
      showaddDeviceModal: false
    });
    const { current } = this.state.pagination;
    await this.getDevice(this.props.zoneId, current);
  }
  showDeviceDetail(device) {
    this.setState({
      showdeviceDetail: true,
      device: device
    });
  }
  closeDeviceDetail() {
    this.setState({
      showdeviceDetail: false
    });
  }

  async handleTableChange(pagination) {
    const { zoneId } = this.props;
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    try {
      const res = await Endpoint.Device.getDevicesSource(zoneId, pager.current);
      this.setState({
        devices: res.data,
        pagination: pager,
      });
    } catch (_) {
      this.setState({
        devices: []
      });
    }
  }

  updateDevice() {
    const { zoneId } = this.props;
    const { current } = this.state.pagination;
    this.getDevice(zoneId, current);
  }
  // changeDeviceMode(mode) {}
  // removeDevice() {}

  render() {
    const {
      devices,
      isFetching,
      showaddDeviceModal,
      device,
      pagination,
      showdeviceDetail,
      activation,
    } = this.state;
    const { zoneId } = this.props;
    if (isFetching) {
      return (
        <div className="veer-offline-device">
          <Card loading />
        </div>
      );
    }
    const mode = {
      user: "用户",
      admin: "管理员"
    };
    const status = {
      standby: "空闲中",
      playing: "播放中",
      offline: "已离线",
      downloaded: "已下载",
      downloading: "下载中",
      error: "更新失败",
      pause_playing: "暂停播放"
    };

    return (
      <div className="veer-offline-device">
        <Card
          title="头显设备">
          <Table
            columns={[
              {
                title: "编号",
                dataIndex: "sequence",
                key: "sequence",
                width: "15%",
                render: dataIndex => <span>{dataIndex}</span>
              },
              {
                title: "UID",
                dataIndex: "id",
                width: "36%",
                key: "id",
                render: dataIndex => <span>{dataIndex}</span>
              },
              // {
              //   title: "内存",
              //   dataIndex: ""
              // },
              {
                title: "设备模式",
                dataIndex: "mode",
                width: "17%",
                key: "mode",
                render: dataIndex => (
                  <div className={`devicemode devicemode-${dataIndex}`}>
                    <span
                      className={`devicemode-dot devicemode-${dataIndex}-dot`}
                    />
                    <span className={dataIndex}>{mode[dataIndex]}</span>
                  </div>
                )
              },
              {
                title: "设备状态",
                dataIndex: "state",
                key: "state",
                width: "17%",
                render: (dataIndex, record) => (
                  <span className={record.connected ? dataIndex : "offline"}>
                    {record.connected ? status[dataIndex] : "已离线"}
                  </span>
                )
              },
              {
                title: "操作",
                key: "operation",
                width: "15%",
                render: (text, record) => (
                  <Dropdown
                    overlay={
                      <Menu>
                        <Menu.Item key="0">
                          <a
                            href="javascript:;"
                            onClick={this.showDeviceDetail.bind(this, record)}
                          >
                            设备详情及二维码
                          </a>
                        </Menu.Item>
                        {/* <Menu.Item key="1">
                          <a
                            href="javascript:;"
                            onClick={this.changeDeviceMode.bind(
                              this,
                              record.mode
                            )}
                          >
                            {record.mode === "user"
                              ? "切换管理员模式"
                              : "切换用户模式"}
                          </a>
                        </Menu.Item> */}
                        {/* {record.renewstatus === "fail" ? (
                          <Menu.Item key="2">
                            <a
                              href="javascript:;"
                              onClick={this.updateDeviceRenew.bind(this)}
                            >
                              重试更新
                            </a>
                          </Menu.Item>
                        ) : (
                          ""
                        )} */}

                        {/* <Menu.Item key="3">
                          <a
                            href="javascript:;"
                            onClick={this.removeDevice.bind(this)}
                          >
                            移除设备
                          </a>
                        </Menu.Item> */}
                      </Menu>
                    }
                    trigger={["click"]}
                  >
                    <a href="#">
                      更多
                      <Icon type="down" />
                    </a>
                  </Dropdown>
                )
              }
            ]}
            dataSource={devices}
            pagination={pagination}
            rowKey="id"
            scroll={{ y: 488, x: 580 }}
            onChange={this.handleTableChange}
            locale={{ emptyText: "暂无设备，新增一个设备吧" }}
          />
        </Card>
        <AddDeviceModal
          show={showaddDeviceModal}
          cancel={this.closeaddDeviceModal.bind(this)}
          zoneId={zoneId}
          activation={activation}
        />
        <DeviceDetailModal
          show={showdeviceDetail}
          onUpdate={this.updateDevice.bind(this)}
          cancel={this.closeDeviceDetail.bind(this)}
          device={device}
        />
      </div>
    );
  }
}

export default DeviceCard;
