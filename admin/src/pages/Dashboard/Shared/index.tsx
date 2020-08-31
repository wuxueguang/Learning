import React from "react";
import { Button, Row, Card, Popover, Typography, Tabs, Table } from "antd";
// import { Link } from "react-router-dom";
import { RouteChildrenProps } from "react-router";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { ZonesState } from "@/reducers/zones";
import ProductSetting from "@/components/zone/product";
import OrderCard from "@/components/zone/order";
// import DeviceCard from "@/components/zone/device";
import { Endpoint } from "@/endpoints";
import { MenuAction } from "@/actions";
import { formatUTCTimespan, formatUTCTimespanToISOTime } from '@/utils/date';
import { BusinessTypes } from "@/types/business";
import { CooperatorTypes } from '@/types/cooperator'

import "./index.scss";

const { TabPane } = Tabs;

interface ReduxProps {
  Zones: ZonesState;
  dispatch: Dispatch<any>;
}

interface detailPanelPageProps {}

interface detailPanelPage {
  props: detailPanelPageProps & ReduxProps & RouteChildrenProps;
  state: {
    zoneId: string;
    // zone?: ZoneTypes.ZoneInfo;
    cooperators: CooperatorTypes.CooperatorInfo[];
    business?: BusinessTypes.BusinessInfo;
    list: CooperatorTypes.SettlementInfo[];
    total: number;
    page: number;
    cooperator?: CooperatorTypes.PartnerInfo;
    cooperator_id: string;
    loading: boolean;
  };
}

@(connect<{}, {}, {}, { Zones: ZonesState }>(
  ({ Zones }) => ({ Zones }),
  dispatch => ({ dispatch })
) as any)
class detailPanelPage extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {
      zoneId: "",
      cooperators: [],
      list: [],
      total: 0,
      page: 1,
      loading: true,
      cooperator_id: 'ccvasdfwe'
    };
  }

  getZoneId() {
    let tmp = this.props.history.location.pathname.split("/");
    return tmp[tmp.length - 1];
  }

  renderProductSetting(): React.ReactNode {
    return React.createElement(ProductSetting, {
      zoneId: this.state.zoneId,
      // zone: this.state.zone,
      history: this.props.history
    });
  }
  renderOrderCard(): React.ReactNode {
    return React.createElement(OrderCard);
  }
  async updatePanel() {
    this.changeMobile();
    this.onResize();
    let id = this.getZoneId();
    this.setState({
      zoneId: id
    });
    // try {
    //   this.props.dispatch(await ZoneAction.getZone(id));
    // } catch (_) {
    //   this.setState({
    //     zone: {}
    //   });
    // }
    this.props.dispatch(MenuAction.change(id));
  }

  changeMobile() {
    if (document.documentElement.offsetWidth > 768) {
      this.setState({
        mobile: false
      });
    } else {
      this.setState({
        mobile: true
      });
    }
  }
  onResize() {
    window.addEventListener("resize", this.changeMobile.bind(this));
  }
  componentDidMount() {
    // this.updatePanel();
    this.refresh();
  }

  changeCooperator(key) {
    const { cooperators } = this.state;
    let cooperator;
    cooperators.forEach((item) => {
      if (item.safe_id === key) {
        cooperator = item;
      }
    });
    this.setState({
      cooperator_id: key,
      cooperator,
      page: 1
    }, () => {
      this.getIncomeSummary();
    });
  }

  async refresh() {
    try {
      const result = await Endpoint.Business.getBusiness();
      const cooperatorsResult = await Endpoint.Megane.getCooperators(result.id);
      if (cooperatorsResult.length === 0) {
        return this.setState({
          loading: false
        });
      }
      this.setState({
        business: result,
        cooperator_id: cooperatorsResult[0].safe_id,
        cooperators: cooperatorsResult,
        cooperator: cooperatorsResult[0]
      }, () => {
        this.getIncomeSummary();
      });
    } catch (err) {
      console.log(err);
    }
  }

  // async getSettleMents(cooperatorId: string) {
  //   const { business, page } = this.state;
  //   if (business) {
  //     const result = await Endpoint.Megane.getSettlements(business.id, cooperatorId, page);
  //   }
  // }

  async getIncomeSummary() {
    const { business, page, cooperator_id, cooperator } = this.state;
    const startDate = formatUTCTimespanToISOTime(business && business.created_at);
    if (business) {
      const [list, total] = await Endpoint.Megane.getIncomeSummary(business.id, cooperator_id, startDate, page);
      this.setState({
        loading: false,
        list,
        total,
      })
    }
  }

  onChange = (page) => {
    this.setState({
      page,
    }, () => {
      this.getIncomeSummary();
    });
  }

  componentWillReceiveProps(nextProps: any) {
    if (this.getZoneId() !== this.state.zoneId) {
      this.updatePanel();
    }
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.changeMobile.bind(this));
  }

  renderWayRow(row) {
    if (row && row.sub_sharing_mode || row.display === '分成变化') {
      let content;
      if (row.sub_sharing_mode) {
        content = (
          <div>
            {row.sub_sharing_mode.map((item) => {
              return (
                <p>{item.display}</p>
              );
            })}
          </div>
        )
      } else {
        content = (
          <p>该账期内方式发生变化，请联系客服了解详情</p>
        );
      }
      return (
        <Popover className="veer-popover" content={content} trigger="click">
          <Button type="link">{row.display}</Button>
        </Popover>
      );
    }
    return (
      <Button type="link">{row && row.display}</Button>
    );
  }

  renderLoadingPanel() {

  }

  render() {
    const { cooperator_id, cooperator, cooperators, page, list, total, loading} = this.state;

    // const Tabs =
    const { Zones } = this.props;
    return (
      <div className="veer-offline-page-shared">
        <div className="veer-offline-page-shared-content-header">
          <Typography.Title
            className="veer-offline-section-content-header-name"
            level={4}
          >
            合作方分成
          </Typography.Title>
          <div className="veer-offline-section-content-header-address">
            可查看收益给合作方分成的账单记录
          </div>
          <div className="veer-offline-page-shared-zones">
            <Tabs defaultActiveKey={cooperator_id} onChange={this.changeCooperator.bind(this)}>
              {
                cooperators.map((item) => (
                  <TabPane tab={item.name} key={item.safe_id}></TabPane>
                ))
              }
            </Tabs>
            <div className="total-count">共 {cooperators.length} 家</div>
          </div>
        </div>
        <Row
          gutter={35}
          justify="center"
          className="veer-offline-section-content-panel"
        >
          <Card
            style={{ marginTop: 16 }}
            type="inner"
            loading={loading}
            title="Inner Card title"
            extra={<a href="#">More</a>}
          >
            <h5>合作方基本信息</h5>
            {cooperators.length ===0 ? (
              <div>不存在合作方</div>
            ) : (<table className="basic-info">
                <tbody>
                  <tr>
                    <td style={{width: "100px"}}>名称:</td>
                    <td style={{width: "280px"}}>{ cooperator && cooperator.name}</td>
                    <td style={{width: "100px"}}>合作起始日期:</td>
                    <td>{formatUTCTimespan(cooperator && cooperator.cooperated_from)}</td>
                  </tr>
                  <tr>
                    <td>结算周期:</td>
                    <td>{cooperator && cooperator.balance_cycle}</td>
                    <td>分成方式:</td>
                    <td>{cooperator && cooperator.sharing_mode && cooperator.sharing_mode.display}</td>
                  </tr>
                </tbody>
              </table>
            )}
          </Card>
          <Card
            type="inner"
            title="Inner Card title"
            loading={loading}
            extra={<a href="#">More</a>}
          >
            <h5>已结算周期</h5>
            <Table
              rowKey="period"
              pagination= {{
                current: page,
                pageSize: 6,
                total: total,
                onChange: this.onChange,
              }}
              columns={[
              {
                title: '周期',
                dataIndex: 'period',
                key: 'period',
              },
              {
                title: '总销售额',
                dataIndex: 'revenue',
                key: 'revenue',
              },
              {
                title: '销售额税后',
                dataIndex: 'revenue_without_tax',
                key: 'revenue_without_tax',
              },
              {
                title: '合作方分成方式',
                dataIndex: 'sharing_mode',
                key: 'sharing_mode',
                render: this.renderWayRow,
              },
              {
                title: '合作方所得',
                dataIndex: 'partners_sharing',
                key: 'partners_sharing',
              }
            ]} dataSource={list} />
          </Card>
        </Row>
      </div>
    );
  }
}

export default detailPanelPage;
