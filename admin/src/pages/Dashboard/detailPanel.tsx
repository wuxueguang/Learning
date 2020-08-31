import React from "react";
import { Button, Row, Breadcrumb, Col, Typography, Modal } from "antd";
import { Link } from "react-router-dom";
import { RouteChildrenProps } from "react-router";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { checkFeatureFlag } from '@/components/withFeatureFlag';
import { ZonesState } from "@/reducers/zones";
import { ZoneTypes } from "@/types";
import { ZoneAction } from "@/actions";
import ProductSetting from "@/components/zone/product";
import ProductSettingV2 from '@/components/zone/product/index.v2';
import OrderCard from "@/components/zone/order";
import DeviceCard from "@/components/zone/device";
import { Endpoint } from "@/endpoints";
import { MenuAction } from "@/actions";
interface ReduxProps {
  Zones: ZonesState;
  dispatch: Dispatch<any>;
}

interface detailPanelPageProps {}

interface detailPanelPage {
  deviceCard: any;
  props: detailPanelPageProps & ReduxProps & RouteChildrenProps;
  state: {
    zoneId: string;
    // zone?: ZoneTypes.ZoneInfo;
    zoneCodeShow: boolean;
    zoneImg: string;
    zoneImgBase: string;
    qrcodetype: string;
    qrimg_err: boolean;
    iconloading: boolean;
    iconloadingRechargeQrcode: boolean;
    mobile: boolean;
    // deviceRefresh: boolean;
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
      zoneCodeShow: false,
      zoneImg: "",
      zoneImgBase: "",
      qrcodetype: "",
      qrimg_err: false,
      iconloading: false,
      iconloadingRechargeQrcode: false,
      mobile: false
    };
  }

  getZoneId() {
    let tmp = this.props.history.location.pathname.split("/");
    return tmp[tmp.length - 1];
  }

  renderProductSetting(): React.ReactNode {
    if (checkFeatureFlag('catalogUpdate')) {
      return React.createElement(ProductSettingV2, {
        zoneId: this.state.zoneId,
        // zone: this.state.zone,
        history: this.props.history
      });
    }
    return React.createElement(ProductSetting, {
      zoneId: this.state.zoneId,
      // zone: this.state.zone,
    });
  }
  renderOrderCard(): React.ReactNode {
    return React.createElement(OrderCard);
  }
  async updatePanel() {
    this.changeMobile();
    this.onResize();
    let id = this.getZoneId();
    try {
      this.props.dispatch(await ZoneAction.getZone(id));
      this.setState({
        zoneId: id
      });
    } catch (_) {
      this.setState({
        zone: {}
      });
    }
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
  async getZoneQrcode() {
    this.setState({
      iconloading: true,
      zoneImg: '',
    });
    try {
      const res = await Endpoint.Zone.zoneQrcode(this.state.zoneId);
      this.setState({
        qrcodetype: 'QRCode',
        zoneImg: res.qr_code,
        zoneCodeShow: true,
        qrimg_err: false
      });
    } catch (_) {
      this.setState({
        zoneImg: "",
        zoneCodeShow: true,
        qrimg_err: true
      });
    }
    this.setState({
      iconloading: false
    });
  }
  async getZoneRechargeQrcode() {
    this.setState({
      iconloadingRechargeQrcode: true,
      zoneImg: '',
    });
    try {
      const res = await Endpoint.Zone.zoneRechargeQrcode(this.state.zoneId);
      // console.log('res', res);
      this.setState({
        zoneImg: res.qr_code,
        qrcodetype: 'rechargeQRCode',
        zoneCodeShow: true,
        qrimg_err: false
      });
    } catch (_) {
      this.setState({
        zoneImg: "",
        zoneCodeShow: true,
        qrimg_err: true
      });
    }
    this.setState({
      iconloadingRechargeQrcode: false
    });
  }
  saveZoneCode() {}
  componentDidMount() {
    this.updatePanel();
  }
  componentWillReceiveProps(nextProps: any) {
    if (this.getZoneId() !== this.state.zoneId) {
      this.updatePanel();
    }
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.changeMobile.bind(this));
  }
  render() {
    const {
      zoneId,
      zoneCodeShow,
      zoneImg,
      qrimg_err,
      qrcodetype,
      iconloading,
      mobile,
      iconloadingRechargeQrcode
    } = this.state;
    const { Zones } = this.props;
    return (
      <div className="veer-offline-section-product">
        <div className="veer-offline-section-content-header">
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link
                to="/dashboard"
                onClick={async () => {
                  this.props.dispatch(ZoneAction.clean());
                  this.props.dispatch(MenuAction.change(""));
                }}
              >
                体验区管理
              </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>体验区详情</Breadcrumb.Item>
          </Breadcrumb>
          <Typography.Title
            className="veer-offline-section-content-header-name"
            level={4}
          >
            {Zones.zone && Zones.zone.name}
          </Typography.Title>
          <div className="veer-offline-section-content-header-address">
            {Zones.zone && Zones.zone.address}
          </div>
          {/* <Button
            type="default"
            icon="qrcode"
            className="veer-offline-section-content-header-qr"
            onClick={this.getZoneRechargeQrcode.bind(this)}
            loading={iconloadingRechargeQrcode}
            style={{
              right: '165px'
            }}
          >
            <span>体验区充值二维码</span>
          </Button> */}
          <Button
            type="default"
            icon="qrcode"
            className="veer-offline-section-content-header-qr"
            onClick={this.getZoneQrcode.bind(this)}
            loading={iconloading}
          >
            <span>体验区二维码</span>
          </Button>
        </div>
        <Row
          gutter={35}
          justify="center"
          className="veer-offline-section-content-panel"
        >
          {mobile ? (
            <div>
              <Col xs={24} sm={24} lg={12} xl={12} xxl={12}>
                {/* 交易与订单 */}
                {this.renderOrderCard()}
              </Col>

              <Col xs={24} sm={24} lg={12} xl={12} xxl={12}>
                {/* 内容设置 */}
                {this.renderProductSetting()}
              </Col>
              <Col xs={24} sm={24} lg={12} xl={12} xxl={12}>
                {/* 头显设备 */}
                <DeviceCard zoneId={zoneId} />
              </Col>
            </div>
          ) : (
            <div>
              <Col xs={24} sm={24} lg={12} xl={12} xxl={12}>
                {/* 内容设置 */}
                {this.renderProductSetting()}
              </Col>
              <Col xs={24} sm={24} lg={12} xl={12} xxl={12}>
                {/* 交易与订单 */}
                {this.renderOrderCard()}
                {/* 头显设备 */}
                <DeviceCard ref={(node) => this.deviceCard = node} zoneId={zoneId} />
              </Col>
            </div>
          )}
        </Row>
        <Modal
          visible={zoneCodeShow}
          title={/recharge/.test(qrcodetype) ? "体验区充值二维码" : "体验区二维码"}
          width={400}
          onCancel={() => {
            this.setState({ zoneCodeShow: false });
          }}
          className="veer-offline-zone-qrcode"
          footer={null}
        >
          <img
            src={zoneImg}
            ref="zoneImg"
            style={{ width: "50%" }}
            onError={() => {
              this.setState({ qrimg_err: true });
            }}
          />
          {zoneImg && !qrimg_err ? (
            <Button
              type="primary"
              style={{ display: "block", margin: "10px auto 0" }}
            >
              <a href={zoneImg} target="_blank">
                下载二维码
              </a>
            </Button>
          ) : (
            <div>
              <p>二维码加载出错</p>
              <Button type="primary" onClick={this.getZoneQrcode.bind(this)}>
                生成二维码
              </Button>
            </div>
          )}
        </Modal>
      </div>
    );
  }
}

export default detailPanelPage;
