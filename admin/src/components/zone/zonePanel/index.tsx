import React from "react";
import { Link } from "react-router-dom";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { Card, Button, Row, Col, Statistic, Badge, Divider } from "antd";
import { RouteChildrenProps, Redirect } from "react-router";
import { ZoneTypes } from "@/types";
import withUserPolicy from '@/components/withUserPolicy';

import "./index.scss";
import zoneModal from "@/components/zone/zoneModal";
import { MenuAction } from "@/actions";

interface zonePanelProps {
  data: ZoneTypes.ZoneInfo;
  dispatch: Dispatch<any>;
}
interface zonePanel {
  props: zonePanelProps & RouteChildrenProps;
  state: {
    visible: boolean;
  };
}
@(connect(dispatch => ({ dispatch })) as any)
class zonePanel extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {
      visible: false
    };
  }
  renderModal(): React.ReactNode {
    return React.createElement(zoneModal, {
      model: {
        title: "编辑体验区信息",
        cancel: "取消",
        confirm: "保存"
      },
      zone: this.props.data,
      visible: this.state.visible,
      closePanel: this.closePanel.bind(this)
    });
  }
  editZone() {
    this.setState({
      visible: true
    });
  }
  closePanel() {
    this.setState({
      visible: false
    });
  }
  render() {
    const { data } = this.props;
    return (
      <Col xs={24} md={12} lg={12} xl={12} xxl={8}>
        <Card className="panel-zone">
          <div className="veer-offline-zone">
            <div className="veer-offline-zone-header">
              <a href={`/dashboard/zone/${data.id}`} className="veer-offline-zone-header-name">{data.name}</a>
              <div className="btn-group">
                {withUserPolicy((
                  <Button
                  type="default"
                  className="veer-offline-zone-header-edit"
                  onClick={this.editZone.bind(this)}
                >
                  编辑信息
                </Button>
                ), 'offline_biz_zones_update')}
                <Button
                  type="default"
                  className="veer-offline-zone-header-operate"
                >
                  <Link
                    to={`/dashboard/zone/${data.id}`}
                    onClick={() => {
                      this.props.dispatch(MenuAction.change(data.id));
                    }}
                  >
                    操控体验区
                  </Link>
                </Button>
              </div>
            </div>
            <div className="veer-offline-zone-content">
              <Row>
                <Col xs={10} sm={10} md={6} lg={6}>
                  <Statistic title="总内容数" value={data.contents_count} />
                </Col>
                <Col xs={2} sm={2} md={2} lg={2}>
                  <Divider
                    type="vertical"
                    style={{ minHeight: "48px", marginTop: "10px" }}
                  />
                </Col>
                <Col xs={10} sm={10} md={6} lg={6}>
                  <Statistic title="总票数" value={data.tickets_count} />
                </Col>
                <Col xs={0} sm={0} md={2} lg={2}>
                  <Divider
                    type="vertical"
                    style={{ minHeight: "48px", marginTop: "10px" }}
                  />
                </Col>
                <Col xs={24} sm={24} md={8} lg={8}>
                  <Statistic
                    title="销售额"
                    value={data.total_cash_income}
                    suffix="元"
                  />
                </Col>
              </Row>
            </div>
            <div className="veer-offline-zone-footer">
              <div className="veer-offline-zone-footer-header">
                <span>设备状态：</span>
              </div>
              <div className="veer-offline-zone-footer-content">
                <Row>
                  <Col xs={12} sm={6} md={6} lg={6}>
                    <Badge
                      color="blue"
                      text={`空闲${data.standby_devices_count ||
                        0}`}
                    />
                  </Col>
                  <Col xs={12} sm={6} md={6} lg={6} className="">
                    <Badge
                      color="blue"
                      text={`使用中${(data.playing_devices_count + data.pause_playing_devices_count) ||
                        0}`}
                    />
                  </Col>

                  <Col xs={12} sm={6} md={6} lg={6}>
                    <Badge
                      color="blue"
                      text={`下载中${(data.downloading_devices_count + data.pause_downloading_devices_count) ||
                        0}`}
                    />
                  </Col>
                  <Col xs={12} sm={6} md={6} lg={6}>
                    <Badge
                      color="blue"
                      text={`离线${data.disconnected_devices_count ||
                        0}`}
                    />
                  </Col>
                </Row>
              </div>
            </div>
          </div>
        </Card>
        {this.renderModal()}
      </Col>
    );
  }
}

export default zonePanel;
