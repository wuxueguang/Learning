import React, { Component, Dispatch } from 'react';
import { Endpoint } from "@/endpoints";
import { RouteComponentProps, RouteChildrenProps } from 'react-router';
import PromoItemBox from '../PromoPage/itemBox';
import classNames from 'classnames';
import './index.scss';

interface MachinePromoPageProps {
  match: any;
}

interface MachinePromoPage {
  props: MachinePromoPageProps & RouteComponentProps & RouteChildrenProps;
  state: {
    catalogs: any;
    zoneQrCode: string;
    rechargeQrCode: string;
    footerType: 'recharge_page' | 'mini_program' | 'official_account' | 'self_service';
  }
}

class MachinePromoPage extends Component {
  constructor(props: MachinePromoPageProps) {
    super(props);

    this.state = {
      catalogs: [],
      zoneQrCode: '',
      rechargeQrCode: '',
      footerType: 'official_account',
    };
  }

  componentDidMount() {
    this.getCatalogs();
    document.title = '零号空间';
  }

  async getCatalogs() {
    const location = this.props.location;
    const zoneId = this.props.match.params.zoneId;
    // const testZoneId = 'H2OoIo2NSn-WbVTY9AgeJw';
    const catalogsData = await Endpoint.Catalog.getAudienceCatalos(zoneId, 1, 12);
    const zoneInfo = await Endpoint.Zone.getZoneInfo(zoneId);
    this.setState({
      catalogs: catalogsData.data,
      zoneQrCode: zoneInfo.qr_code,
      rechargeQrCode: zoneInfo.recharge_qr_code,
    });

    this.queryParse(location.search);
  }

  queryParse = (queryString) => {
    if (!queryString) return;
    let string = queryString;
    let footerType = null;
    string = string.split('?')[1];
    const params = string.split('&');
    params.forEach((item) => {
      const curItem = item.split('=');
      if (curItem[0] === 'footerType') {
        footerType = curItem[1];
      }
    });
    if (footerType) {
      this.setState({ footerType });
    }
  }

  renderSection = (type) => {
    let sectionData = [];
    switch (type) {
      case 'recommend':
        sectionData = this.state.catalogs.slice(0, 2);
        break;
      case 'hot':
        sectionData = this.state.catalogs.slice(2, 8);
        break;
      case 'child':
        sectionData = this.state.catalogs.slice(8, 12);
        break;
      default:
        break;
    }

    return (
      <div className={`contents-items ${type}-section`}>
        {sectionData && sectionData.map((item, index) => (
          <PromoItemBox key={`${index}-${type}`} data={item} />
        ))}
      </div>
    )
  }

  render() {
    const recommendData = this.renderSection('recommend');
    const hotData = this.renderSection('hot');
    const childData = this.renderSection('child');
    const { footerType } = this.state;

    return (
      <div
        className={classNames('machine-catalogs-page', footerType)}
        style={{ backgroundColor: '#000' }}
      >
        {
          footerType === 'self_service' &&
          <div className="public-section self-service">
            <img className="activity-img" src="https://assets.veervr.tv/@vrups/697/5f9fe188273722d0b3d49ad457c9376026ce75e5-2160-320.png" />
          </div>
        }
        <div className="content-section recommend">
          <div className="text main">店长推荐</div>
          {recommendData}
        </div>
        <div className="content-section hot">
          <div className="text sec">热映榜单</div>
          {hotData}
        </div>
        <div className="content-section child">
          <div className="text sec">亲子专区</div>
          {childData}
        </div>
        {
          footerType === 'recharge_page' &&
          <div className="footer-section">
            <div className="left">
              <p>充越多 赠越多</p>
              <p>超值券包等你来拿</p>
            </div>
            <div className="right">
              <img className="zone-code" src={this.state.rechargeQrCode} />
              <div className="text">
                <p>微信扫码</p>
                <p>查看优惠和更多影片</p>
              </div>
            </div>
          </div>
        }
        {
          footerType === 'mini_program' &&
          <div className="footer-section">
            <div className="left">
              <p>科幻 动画 艺术 惊悚</p>
              <p>开启你的无限体验</p>
            </div>
            <div className="right">
              <img className="zone-code" src={this.state.zoneQrCode} />
              <div className="text">
                <p>微信扫码</p>
                <p>查看全部在映影片</p>
              </div>
            </div>
          </div>
        }
        {
          footerType === 'official_account' &&
          <div className="public-section">
            <img className="left-icon" src="https://assets.veervr.tv/@vrups/213/302c6261035d6c6bcc361f04181919c8021a9531-460-420.png" />
            <div className="middle">
              <img className="zone-code" src="https://assets.veervr.tv/@vrups/151/9df91fb85d49f9227db40a152ccb36a0ce52ebc7-288-288.png" />
              <div className="text">
                <p>微信扫码关注</p>
                <p>零号空间VR微电影</p>
                <p>随时了解VR大片最新上映</p>
              </div>
            </div>
            <img className="right-icon" src="https://assets.veervr.tv/@vrups/640/ad83c2c238d63d968a583bbaa0bbf350242908ad-458-420.png" />
          </div>
        }
      </div>
    )
  }
}

export default MachinePromoPage;