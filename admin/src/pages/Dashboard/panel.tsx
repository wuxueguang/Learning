import React from "react";
import { Button, Row, Col, Card } from "antd";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { ZonesState } from "@/reducers/zones";
import zonePanel from "@/components/zone/zonePanel";
import zoneModal from "@/components/zone/zoneModal";
import { RouteChildrenProps } from "react-router";
import withUserPolicy  from '@/components/withUserPolicy';

interface ReduxProps {
  Zones: ZonesState;
  dispatch: Dispatch<any>;
}

interface PanelPageProps {}

interface PanelPage {
  props: ReduxProps & PanelPageProps & RouteChildrenProps;
  state: {
    visible: boolean;
    zoneData: {
      name: string;
      address: string;
    };
  };
}

@(connect<{}, {}, {}, { Zones: ZonesState }>(
  ({ Zones }) => ({ Zones }),
  dispatch => ({ dispatch })
) as any)
class PanelPage extends React.Component {
  constructor(props: PanelPageProps) {
    super(props);
    this.state = {
      visible: false,
      zoneData: {
        name: "",
        address: ""
      }
    };
  }
  addZone() {
    this.setState({
      visible: true
    });
  }
  closePanel() {
    this.setState({
      visible: false
    });
  }
  renderZone(): React.ReactNode {
    let { zones } = this.props.Zones;
    let subCard: React.ReactNode[] = [];
    if (zones && zones.length > 0) {
      zones.map(val => {
        const card = React.createElement(zonePanel, {
          data: val,
          key: val.id
        });
        subCard.push(card);
      });
      return subCard;
    }
  }
  renderModal(): React.ReactNode {
    return React.createElement(zoneModal, {
      model: {
        title: "新建体验区",
        cancel: "取消",
        confirm: "确认"
      },
      visible: this.state.visible,
      closePanel: this.closePanel.bind(this)
    });
  }

  renderLoadingPanel() {
    let grid: any[] = [];
    const GRID_NUM = 3;
    for (let i =0; i < GRID_NUM; i++) {
      grid.push((
        <Col xs={24} md={12} lg={12} xl={12} xxl={8}>
          <Card loading className="panel-zone" />
        </Col>
      ));
    }
    return (
      <div className="veer-offline-section-content">
        <div className="veer-offline-section-content-header"></div>
        <Row
          gutter={35}
          justify="center"
          className="veer-offline-section-content-panel"
        >
          {grid}
        </Row>
      </div>
    )
  }

  render() {
    const { zones, fetching } = this.props.Zones;
    if (fetching) {
      return this.renderLoadingPanel();
    }
    return (
      <div className="veer-offline-section-content">
        <div className="veer-offline-section-content-header">
          <span>体验区管理</span>
          {zones && zones.length > 0 ? withUserPolicy(
            (<Button type="primary" onClick={this.addZone.bind(this)}>
              +&nbsp;&nbsp;新建体验区
            </Button>), 'offline_biz_zones_create') : (
            ''
          )}
        </div>
        <Row
          gutter={35}
          justify="center"
          className="veer-offline-section-content-panel"
        >
          {zones && zones.length > 0 ? (
            this.renderZone()
          ) : (
            <div className="veer-offline-section-content-panel-nozone">
              <span>暂无体验区，快新增一个吧</span>
              <Button type="primary" onClick={this.addZone.bind(this)}>
                +&nbsp;&nbsp;新建体验区
              </Button>
            </div>
          )}
        </Row>
        {this.renderModal()}
      </div>
    );
  }
}

export default PanelPage;
