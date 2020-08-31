import React, { Component, Dispatch } from 'react';
import { Endpoint } from "@/endpoints";
import { RouteComponentProps, RouteChildrenProps } from 'react-router';
import PromoItemBox from './itemBox';
import './index.scss';

interface PromoPageProps {
  match: any;
}

interface PromoPage {
  props: PromoPageProps & RouteComponentProps & RouteChildrenProps;
  state: {
    catalogs: any;
    pagination: any;
    zoneQrCode: string;
  }
}

const sectionList = {
  recommend: {
    key: 'recommend',
    title: '店长推荐',
    icon: 'https://assets.veervr.tv/@vrups/280/6002d96bc577c3f948854942b18573e2d89f1117-64-64.png',
  },
  hot: {
    key: 'hot',
    title: '热映榜单',
    icon: 'https://assets.veervr.tv/@vrups/464/f50397faace32fd15359de5ecb211040f5d05baf-64-64.png',
  },
  child: {
    key: 'child',
    title: '亲子专区',
    icon: 'https://assets.veervr.tv/@vrups/667/07a38fc205f784d552c174cd93a8088fdd26741d-64-64.png'
  }
}

class PromoPage extends Component {
  constructor(props: PromoPageProps) {
    super(props);

    this.state = {
      catalogs: [],
      pagination: {},
      zoneQrCode: '',
    };
  }

  componentDidMount() {
    this.getCatalogs();
    document.title = '零号空间';
  }

  async getCatalogs() {
    const zoneId = this.props.match.params.zoneId;
    // const testZoneId = 'wAKziigwQAK5tNDLN1en8w';
    const catalogsData = await Endpoint.Catalog.getAudienceCatalos(zoneId);
    const zoneInfo = await Endpoint.Zone.getZoneInfo(zoneId);
    this.setState({
      catalogs: catalogsData.data,
      pagination: catalogsData.pagination,
      zoneQrCode: zoneInfo.qr_code
    });
  }

  renderSection = (type) => {
    let sectionData = [];
    switch (type) {
      case 'recommend':
        sectionData = this.state.catalogs.slice(0, 3);
        break;
      case 'hot':
        sectionData = this.state.catalogs.slice(3, 7);
        break;
      case 'child':
        sectionData = this.state.catalogs.slice(7, 9);
        break;
      default:
        break;
    }

    return (
      <div className={`catalogs-section-items ${type}-section`}>
        {sectionData && sectionData.map((item, index) => (
          <PromoItemBox key={`${index}-${type}`} data={item} />
        ))}
      </div>
    )
  }

  render() {
    const { catalogs, pagination } = this.state;
    const recommendData = this.renderSection('recommend');
    const hotData = this.renderSection('hot');
    const childData = this.renderSection('child');
    const total = pagination && pagination.total_count;

    return (
      <div
        className="catalogs-page"
        style={{ backgroundImage: `url('https://assets.veervr.tv/@vrups/711/e779dbbc125e097e8763e4b09a01aeb8d741149a-2880-1620.png')` }}
      >
        <div className="top-section catalogs-section recommend">
          <div className="catalogs-section-title">
            <img className="section-icon" src={sectionList.recommend.icon} />
            <div className="text">店长推荐</div>
            <div className="border" />
          </div>
          {recommendData}
        </div>
        <div className="bottom-section">
          <div className="catalogs-section hot">
            <div className="catalogs-section-title">
              <img className="section-icon" src={sectionList.hot.icon} />
              <div className="text">热映榜单</div>
              <div className="border" />
            </div>
            {hotData}
          </div>
          <div className="catalogs-section child">
            <div className="catalogs-section-title">
              <img className="section-icon" src={sectionList.child.icon} />
              <div className="text">亲子专区</div>
              <div className="border" />
            </div>
            {childData}
          </div>
          <div className="activity-section">
            <div className="help-section">
              <img src="https://assets.veervr.tv/@vrups/506/5faaf84e0dca1be7b1a9d121de3a6ea304f533c4-572-468.png" className="help-img" />
              <img className="zone-qr-code" src={this.state.zoneQrCode} />
            </div>
            <img
              className="activity-bg"
              src="https://assets.veervr.tv/@vrups/972/8b3f19a49dffad3df5eb798f9af2d0999b4f6141-572-780.png"
            />
            <img className="mask-img" src="https://assets.veervr.tv/@vrups/355/1f7df7f91524fb4b42baf354a33bd62993020034-572-538.png" />
            <div className="text">
              <p>微 信 扫 码</p>
              {
                total &&
                <p>查看所有{total}部在映影片</p>
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default PromoPage;