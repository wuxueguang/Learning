import React from "react";
import { Button, Row, Icon, Breadcrumb, Card, Typography, Table, Radio, message } from "antd";
import { Link } from "react-router-dom";
import { RouteChildrenProps } from "react-router";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { nameToSymbol } from "@/utils/transform";
import { setMS } from "@/utils/date";
import { ZonesState } from "@/reducers/zones";
import { ZoneTypes } from "@/types";
import { ZoneAction, ProductAction } from "@/actions";
import { ProductTypes } from '@/types'
import { ProductsState } from "@/reducers/products";
import NumericInput from "@/components/zone/product/input";
import { MenuAction } from "@/actions";

import './index.scss';
import { Endpoint } from "@/endpoints";
import product from "@/endpoints/product";
interface ReduxProps {
  Zones: ZonesState;
  Products: ProductsState;
  dispatch: Dispatch<any>;
}

interface PricePanelPageProps {}

interface PricePanelPage {
  props: PricePanelPageProps & ReduxProps & RouteChildrenProps;
  state: {
    zoneId: string;
    mobile: boolean;
    mode: string;
    products: ProductTypes.ProductInfo[];
  };
}

@(connect<{}, {}, {}, { Zones: ZonesState, Products: ProductsState }>(
  ({ Zones, Products }) => ({ Zones, Products }),
  dispatch => ({ dispatch })
) as any)


class PricePanelPage extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {
      zoneId: '',
      mobile: false,
      mode: '',
      products: []
    };
  }

  getZoneId() {
    let tmp = this.props.history.location.pathname.split("/");
    return tmp[tmp.length - 2];
  }

  componentDidMount() {
    this.updatePanel();
  }

  refresh = () => {
    // handle data loading
    this.updatePanel();
  }


  async updatePanel() {
    let id = this.getZoneId();
    this.setState({
      zoneId: id
    });
    const { mode } = this.state;
    try {
      this.props.dispatch(await ZoneAction.getZone(id));
      const result = await Endpoint.Product.getCatalogProduct(id, mode);
      this.setState({
        products: result,
      });
    } catch (_) {
    }
    this.props.dispatch(MenuAction.change(id));
  }

  handleTabChange = (e) => {
    this.setState({
      mode: e.target.value
    }, () => {
      this.refresh();
    });
  }

  renderTabs() {
    const { mode } = this.state;
    return (
      <Radio.Group value={mode} onChange={this.handleTabChange} style={{ marginBottom: 8 }}>
        <Radio.Button value="">全部</Radio.Button>
        <Radio.Button value="on_the_screen">在映</Radio.Button>
        <Radio.Button value="pending">待上映</Radio.Button>
      </Radio.Group>
    )
  }

  changePrice (record, e, index) {
    const price = parseFloat(e);
    if (price >= 0) {
      record.newPrice = price
    }
    const { products } = this.state;
    products[index] = record;
    this.setState({
      products
    });
  }

  editItem = (index: number) => {
    const { products } = this.state;
    products[index].isEdit = true;
    this.setState({
      products,
    })
  }

  publishCatalog = async (record) => {
    // if (!record.newPrice) {
    //   return message.info('请更新售价')
    // }
    if (record.newPrice === record.price) {
      return message.info('请更新售价')
    }
    let zoneId = this.getZoneId();
    try {
      await Endpoint.Zone.updatePrice(zoneId, record.id, record.newPrice)
      message.success('新售价发布成功')
      this.updatePanel();
    } catch (err) {
      console.log(err);
    }

  }

  cancelEditItem = (index: number) => {
    const { products } = this.state;
    delete products[index].isEdit;
    this.setState({
      products,
    })
  }

  renderTable () {
    const { products} = this.state;
    if (products.length === 0) {
      return (<div>暂无数据！</div>);
    }

    const columns = [
      {
        title: '影片',
        dataIndex: 'thumbnail',
        key: 'thumbnail',
        width: 88,
        render: (item) => (<img className="thumbnail" src={item} />)
      },
      {
        title: '',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '时长',
        dataIndex: 'duration',
        key: 'duration',
        render: (duration) => setMS(duration)
      },
      {
        title: "成本价",
        dataIndex: "min_price",
        width: "10%",
        key: "min_price",
        render: (min_price, record) => (
          <span>{'¥ ' + record.relationships.stock_item.min_price}</span>
        )
      },
      {
        title: "售价",
        dataIndex: "price",
        key: "price",
        width: 280,
        render: (price, record, index) => record.isEdit? (
            <div className="price-edit-form">
              <NumericInput
                min={record.relationships.stock_item.min_price}
                key={record.relationships.stock_item.id}
                defaultval={record.price}
                addonBefore={nameToSymbol(record.currency)}
                onCallbackParent={(e) => { this.changePrice(record, e, index) }}
              />
              <Button type="primary" disabled={record.newPrice < record.relationships.stock_item.min_price} onClick={() => this.publishCatalog(record)}>发布</Button>
              <Button type="default" onClick={() => {this.cancelEditItem(index)}}>取消</Button>
            </div>
          ) : (
            <div>
              <span>{ '¥ ' + record.price}</span>
              <Button type="link" onClick={() => this.editItem(index)} >
                <Icon type="edit" />
              </Button>
            </div>
          )
      },
    ];
    return (<Table 
      pagination={false}
      columns={columns} 
      dataSource={products}
      rowKey="id" />);
  }

  render() {
    const { zoneId } = this.state;
    const { Zones } = this.props;
    return (
      <div className="veer-offline-section-product veer-price-panel">
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
            <Breadcrumb.Item>
              <Link
                to={`/dashboard/zone/${zoneId}`}
              >
                体验区详情
              </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>价格管理</Breadcrumb.Item>
          </Breadcrumb>
          <Typography.Title
            className="veer-offline-section-content-header-name"
            level={4}
          >
            售价管理: {Zones.zone && Zones.zone.name}

          </Typography.Title>
          <div className="veer-offline-section-content-header-address">
            &nbsp;
          </div>
        </div>
        <Row
          gutter={35}
          justify="center"
          className="veer-offline-section-content-panel"
        >
          <Card title="体验区影片管理" extra={this.renderTabs()}>
            {this.renderTable()}
          </Card>
        </Row>
      </div>
    );
  }
}

export default PricePanelPage;
