import React from "react";
import { connect } from "react-redux";

import {
  Card,
  Row,
  Col,
  Divider,
  Modal,
  DatePicker,
  Statistic,
  message
} from "antd";
import "./index.scss";
import { ZoneTypes, OrderTypes } from "@/types";
import { Endpoint } from "@/endpoints";
import {
  getToday,
  getWeek,
  getMonth,
  getYear,
  getCurrentFormat
} from "@/utils/date";
import { ZonesState } from "@/reducers/zones";
import widthUserPolicy from '@/components/withUserPolicy';

interface ReduxProps {
  Zones: ZonesState;
}

interface OrderCardProps {
  // zone?: ZoneTypes.ZoneInfo;
}

interface OrderCard {
  props: OrderCardProps & ReduxProps;
  state: {
    showStsModal: boolean;
    statisInfo?: OrderTypes.statis;
    currentIndex: number;
    datePick: [];
  };
}
@(connect<{}, {}, {}, { Zones: ZonesState }>(
  ({ Zones }) => ({ Zones }),
  dispatch => ({ dispatch })
) as any)
class OrderCard extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {
      showStsModal: false,
      currentIndex: 0,
      datePick: []
    };
  }

  async showStatis() {
    try {
      if (this.props.Zones.zone && this.props.Zones.zone.id) {
        let time = getToday();
        const res = await Endpoint.Order.getOrder(
          this.props.Zones.zone.id,
          time[0],
          time[1]
        );
        this.setState({
          showStsModal: true,
          currentIndex: 0,
          statisInfo: res
        });
        return;
      }
    } catch (_) {}
    this.setState({
      showStsModal: true,
      currentIndex: 0,
      statisInfo: {}
    });
  }
  closeStatis() {
    this.setState({
      showStsModal: false
    });
  }
  async changeDate(date, dateString) {
    this.setState({
      currentIndex: 5,
      datePick: date
    });
    if (
      this.props.Zones.zone &&
      this.props.Zones.zone.id &&
      dateString[0] &&
      dateString[1]
    ) {
      try {
        const day1 = getCurrentFormat(
          new Date(new Date(dateString[0]).getTime() - 8 * 3600 * 1000)
        );
        const day2 = getCurrentFormat(
          new Date(new Date(dateString[1]).getTime() - 8 * 3600 * 1000 + (24 * 3600 - 1) * 1000)
        );
        const res = await Endpoint.Order.getOrder(
          this.props.Zones.zone.id,
          day1,
          day2
        );
        this.setState({
          statisInfo: res
        });
      } catch (err) {
        // message.error("网络错误，请稍后再试");
        this.setState({
          statisInfo: {}
        });
      }
    }
  }
  async filterOrder(key) {
    let time: string[] = [];
    let res;
    if (this.props.Zones.zone && this.props.Zones.zone.id) {
      switch (key) {
        case 0:
          time = getToday();
          break;
        case 1:
          time = getWeek();
          break;
        case 2:
          time = getMonth();
          break;
        case 3:
          time = getYear();
          break;
        default:
          break;
      }
      try {
        res = await Endpoint.Order.getOrder(
          this.props.Zones.zone.id,
          time[0],
          time[1]
        );
        this.setState({
          statisInfo: res
        });
      } catch (_) {
        // message.error("网络错误，请稍后再试");
        this.setState({
          statisInfo: {}
        });
      }
    } else {
      message.error("cannot get zone id");
      this.setState({
        statisInfo: {}
      });
    }
    this.setState({
      currentIndex: key
    });
  }
  render() {
    const { showStsModal, currentIndex, statisInfo, datePick } = this.state;
    const { Zones } = this.props;
    if (Zones.fetching) {
      return (
        <div className="veer-offline-order">
          <Card loading />
        </div>
      );
    }
    return widthUserPolicy((
      <div className="veer-offline-order">
        <Card
          title="交易与订单"
          extra={
            <a href="javascript:;" onClick={this.showStatis.bind(this)}>
              查看更多
            </a>
          }
        >
          <Row>
            <Col xs={11} sm={11} md={11} lg={11}>
              <Statistic
                value={Zones.zone && Zones.zone.total_cash_income}
                title="销售额"
                suffix="元"
              />
            </Col>
            <Col xs={1} sm={1} md={1} lg={1}>
              <Divider type="vertical" style={{ minHeight: "48px" }} />
            </Col>
            <Col xs={11} sm={11} md={11} lg={11}>
              <Statistic
                value={Zones.zone && Zones.zone.tickets_count}
                title="总票数"
              />
            </Col>
          </Row>
        </Card>
        <Modal
          visible={showStsModal}
          onCancel={this.closeStatis.bind(this)}
          destroyOnClose={true}
          className="veer-offline-order-modal"
          width={"70%"}
          title={
            <div>
              <span className="veer-offline-order-modal-title">数据统计</span>
              <div className="veer-offline-order-modal-filter">
                <ul className="veer-offline-order-modal-date">
                  <li
                    className={currentIndex === 0 ? "selected" : ""}
                    onClick={this.filterOrder.bind(this, 0)}
                  >
                    今日
                  </li>
                  <li
                    className={currentIndex === 1 ? "selected" : ""}
                    onClick={this.filterOrder.bind(this, 1)}
                  >
                    本周
                  </li>
                  <li
                    className={currentIndex === 2 ? "selected" : ""}
                    onClick={this.filterOrder.bind(this, 2)}
                  >
                    本月
                  </li>
                  <li
                    className={currentIndex === 3 ? "selected" : ""}
                    onClick={this.filterOrder.bind(this, 3)}
                  >
                    全年
                  </li>
                </ul>
                <DatePicker.RangePicker
                  placeholder={["开始时间", "结束时间"]}
                  onChange={(date, dateString) => {
                    this.changeDate.bind(this, date, dateString)();
                  }}
                  value={currentIndex === 5 ? datePick : []}
                />
              </div>
            </div>
          }
          footer={null}
        >
          <div>
            <h4>交易与订单</h4>
            <Row>
              <Col xs={12} sm={7} md={7} lg={7}>
                <Statistic
                  title="总票数"
                  value={statisInfo && statisInfo.tickets_count}
                  suffix="张"
                />
              </Col>
              <Col xs={12} sm={7} md={7} lg={7}>
                <Statistic
                  title="购票人数"
                  value={statisInfo && statisInfo.consumers_count}
                  suffix="人"
                />
              </Col>
              <Col xs={0} sm={3} md={3} lg={3}>
                <Divider type="vertical" style={{ minHeight: "48px" }} />
              </Col>
              <Col xs={12} sm={7} md={7} lg={7}>
                <Statistic
                  title="销售额"
                  value={statisInfo && statisInfo.total_cash_income}
                  suffix="元"
                />
              </Col>
            </Row>
          </div>
          <div>
            <h4 style={{ marginTop: "60px" }}>用户统计</h4>
            <Row style={{ marginBottom: "60px" }}>
              <Col xs={12} sm={12} md={6} lg={6}>
                <Statistic
                  title="支付笔数"
                  value={statisInfo && statisInfo.orders_count}
                  suffix="笔"
                />
              </Col>
              <Col xs={12} sm={12} md={6} lg={6}>
                <Statistic
                  title="支付人数"
                  value={statisInfo && statisInfo.consumers_count}
                  suffix="人"
                />
              </Col>
            </Row>
          </div>
        </Modal>
      </div>
    ), 'offline_biz_zones_orders_list');
  }
}

export default OrderCard;
