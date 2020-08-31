import React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import {
  Modal,
  Row,
  Col,
  Table,
  InputNumber,
  Divider,
  message,
  Form,
  Input,
  Tabs,
  Icon
} from "antd";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import { CONSTANTS } from "@/constants";
import { Endpoint } from "@/endpoints";
import { ProductTypes } from "@/types";
import products, { ProductsState } from "@/reducers/products";
import { setMS } from "@/utils/date";
import { nameToSymbol } from "@/utils/transform";
import { setDefaultStockItemsTags } from "@/utils/model";
import {
  delKeyFromTargetArr,
  replaceKeyFromTargetArr
} from "@/utils/arrcommon";
import DragableBodyRow from "./drag";
import productDetailModal from "./detail";
import "./edit.scss";
import { ProductAction } from "@/actions";
import NumericInput from "./input";
import CatalogList from './catalog-list';
interface ReduxProps {
  Products: ProductsState;
  dispatch: Dispatch<any>;
}
interface productEditModalProps {
  visible: boolean;
  closeEdit: any;
  zoneId: string;
  // productslib: ProductTypes.stockitem[];
  disablePublishBtn: any;
}
interface productEditModal {
  props: productEditModalProps & ReduxProps;
  state: {
    selproduct?: ProductTypes.ProductInfo;
    products?: ProductTypes.ProductInfo[];
    showdeatil: boolean;
    catalogid: any;
    originCata: ProductTypes.ProductInfo[];
    editflag: boolean;
    input: number;
    currentTab: string;
  };
}

const { TabPane } = Tabs;

@(connect<{}, {}, {}, { Products: ProductsState }>(
  ({ Products }) => ({ Products }),
  dispatch => ({ dispatch })
) as any)
class productEditModal extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {
      showdeatil: false,
      catalogid: new Set(),
      originCata: [],
      editflag: false,
      input: 0,
      currentTab: ''
    };
    this.removeItem = this.removeItem.bind(this);
  }
  components = {
    body: {
      row: DragableBodyRow
    }
  };
  componentWillReceiveProps(nextProps) {
    const { meta } = this.props.Products;
    const { visible } = this.props;
    if (!visible && meta.catalog_type === CONSTANTS.CATALOG_TYPS.PRESET) {
      this._resetState();
      return;
    }
    if (
      (!this.state.products && nextProps.Products.products) ||
      (!nextProps.visible && nextProps.Products.products)
    ) {
      // this.setState({
      //   products: Object.assign([], nextProps.Products.products)
      // });
      let tmp: string[] = [];
      nextProps.Products.products.forEach(val => {
        tmp.push(val.relationships.stock_item.id);
      });
      this.setState({
        catalogid: new Set(tmp),
        products: setDefaultStockItemsTags(nextProps.Products.productslib, nextProps.Products.products)
      });
    }
  }

  async componentDidMount() {
    const { dispatch } = this.props;
    dispatch(await ProductAction.getPrivateStockItems());
  }

  showProductDeatil(record) {
    this.setState({
      showdeatil: true,
      selproduct: record
    });
  }
  closeProductDeatil() {
    this.setState({
      showdeatil: false
    });
  }
  addProductFromLibrary(product) {
    let obj: ProductTypes.ProductInfo = {
      _id: product.id,
      type: "product",
      duration: product.duration || 0,
      thumbnail: product.thumbnail,
      name: product.name,
      price: product.default_sales_price,
      currency: "CNY",
      relationships: {
        stock_item: product,
        tags: product.relationships.tags,
      },
      isPrivate: product.isPrivate,
    };
    this.state.catalogid.add(product.id);
    let tmp = Object.assign([], this.state.products);
    tmp.unshift(obj);
    this.setState({
      products: tmp,
      editflag: true,
    });
  }

  addProductFromPrivate(product) {
    product.isPrivate = true;
    this.addProductFromLibrary(product);
  }

  removeItem(dataIndex, record) {
    const { products, catalogid } = this.state;
    catalogid.delete(record.relationships.stock_item.id);
    const newProducts = delKeyFromTargetArr(
      { _id: dataIndex },
      products
    );
    let editflag = true;
    if (newProducts.length === 0) {
      editflag = false;
    }
    this.setState({
      editflag,
    });
    this.setState({
      products: newProducts,
    });
  }

  catalogMove(dragIndex, hoverIndex) {
    const { Products } = this.props;
    let tmp = Object.assign([], this.state.products);
    const tarData = Object.assign({}, tmp[dragIndex]); //拖动数据
    tmp.splice(dragIndex, 1);
    tmp.splice(hoverIndex, 0, tarData);
    let editflag = this.state.editflag;
    if (Products.products && !this.compare(Products.products, tmp)) {
      editflag = true;
    } else {
      editflag = false;
    }
    this.setState({
      editflag,
      products: tmp
    });

  }
  async onScroll() {
    const { Products, dispatch } = this.props;
    if (Products.isLibFetching) {
      return;
    }
    if (
      this.props.Products.productslibpagi!.current_page >=
      this.props.Products.productslibpagi!.total_page
    )
      return;

    this.table = document.querySelector(
      ".veer-offline-productedit-modal-library .ant-table-body"
    );
    const per = 10;
    // const threshold = 20;
    const { scrollTop, clientHeight, scrollHeight } = this.table;
    if (scrollTop + clientHeight >= scrollHeight) {
      dispatch(
        await ProductAction.getlib(
          this.props.zoneId,
          per,
          this.props.Products.productslibpagi!.current_page + 1,
          dispatch
        )
      );
    }
  }
  compare(a: ProductTypes.ProductInfo[], b: ProductTypes.ProductInfo[]) {
    let atmp: any[] = [];
    let btmp: any[] = [];
    for (let val of a) {
      atmp.push({ id: val.id, price: val.price });
    }
    for (let val of b) {
      btmp.push({ id: val.id, price: val.price });
    }
    return JSON.stringify(atmp) === JSON.stringify(btmp);
  }
  async createCatalog() {
    const { products } = this.state;
    let tmp: any[] = [];
    let obj: any = {};
    if (
      this.props.Products.products &&
      this.compare(this.props.Products.products, this.state.products || [])
    ) {
      this.props.disablePublishBtn(true);
    } else {
      this.props.disablePublishBtn(false);
    }
    try {
      products!.forEach((val, index) => {
        obj = {
          stock_item_id: val.relationships && val.relationships.stock_item.id,
          price: parseFloat(val.price),
          sequence: index + 1
        };
        if (val.id) {
          obj.product_id = val.id;
        }
        tmp.push(obj);
      });
      await Endpoint.Product.createCustomizedProductCatalog(this.props.zoneId, tmp);
      const action = await ProductAction.get(this.props.zoneId);
      this.props.dispatch(action);
    } catch (_) {
      // message.error("片单保存失败");
      this.props.disablePublishBtn(true);
    }
    this.cancel();
  }
  renderProductDetailModal(): React.ReactNode {
    const { selproduct } = this.state;
    return React.createElement(productDetailModal, {
      visible: this.state.showdeatil,
      closeDetail: this.closeProductDeatil.bind(this),
      product: selproduct
    });
  }
  changePrice(record: ProductTypes.ProductInfo, nowval, lastval) {
    record.price = nowval;
    let minPrice = record.relationships.stock_item.min_price || '0';
    if (nowval < parseFloat(minPrice)) {
      this.setState({
        editflag: false
      });
      return;
    }
    if (nowval !== lastval) {
      this.setState({
        editflag: true
      });
    } else {
      this.setState({
        editflag: false
      });
    }
  }

  _resetState = () => {
    this.setState({
      products: [],
      catalogid: new Set(),
    });
  }

  cancel = () => {
    const { closeEdit } = this.props;
    this._resetState();
    closeEdit();
  }

  table: any;

  renderProductTable() {
    const { products } = this.state;
    return (
      <Table
        columns={[
          {
            title: " ",
            width: "5%",
            key: "drag",
            render: () => (
              <Icon type="arrows-alt" />
            )
          },
          {
            title: "封面图",
            dataIndex: "thumbnail",
            width: "15%",
            key: "thumbnail",
            render: thumbnail => (
              <img
                src={thumbnail}
              />
            )
          },
          {
            title: "名称",
            dataIndex: "name",
            width: "32%",
            key: "name",
          },
          {
            title: "时长",
            dataIndex: "duration",
            // defaultSortOrder: "descend",
            // sorter: (a, b) => (a.duration || 0) - (b.duration || 0),
            width: "10%",
            key: "duration",
            render: (duration) => (
              <span>{setMS(duration)}</span>
            )
          },
          {
            title: "分类",
            dataIndex: "relationships",
            key: "relationships",
            width: "8%",
            render: dataIndex => (
              <span>
                {
                  dataIndex.tags && dataIndex.tags.map(val => {
                    return val.name + ' ';
                  })
                }
              </span>
            )
          },
          {
            title: "成本价",
            dataIndex: "min_price",
            width: "10%",
            key: "min_price",
            render: (min_price, record) => (
              <span>{nameToSymbol(record.currency) + ' ' + record.relationships.stock_item.min_price}</span>
            )
          },
          {
            title: "售价",
            dataIndex: "price",
            width: "10%",
            key: "price",
            render: (price, record) => (
              <div>
                {nameToSymbol(record.currency)}
                <NumericInput
                  min={record.relationships.stock_item.min_price}
                  key={record.relationships.stock_item.id}
                  defaultval={record.price}
                  onCallbackParent={(e) => { this.changePrice(record, e, record.price) }}
                />
              </div>
            )
          },
          {
            title: "操作",
            key: "_id",
            dataIndex: "_id",
            width: "10%",
            render: (dataIndex, record) => (
              <a
                href="javascript:;"
                onClick={() => { this.removeItem(dataIndex, record); }}
              >
                删除
              </a>
            )
          }
        ]}
        dataSource={products}
        pagination={false}
        locale={{ emptyText: "暂无内容" }}
        rowKey="_id"
        scroll={{ y: 450, x: 477 }}
        style={{ minHeight: "450px" }}
        components={this.components}
        onRow={(record, index) => ({
          index,
          moveRow: this.catalogMove.bind(this)
        })}
      />
    )
  }

  changeTab = (key) => {
    this.setState({
      currentTab: key
    });
  }


  renderTabs() {
    const {
      Products,
    } = this.props;
    const {  catalogid, currentTab } = this.state;
    let defaultTab = 'private';
    if (Products.privateStockItems.length === 0 ) {
      defaultTab = 'offical';
    }
    return (
      <Tabs animated={false} defaultActiveKey={currentTab || defaultTab} onChange={this.changeTab}>
        {
          Products.privateStockItems.length > 0 ? (
            <TabPane tab="商家独有库" key="private">
              <div
                onScrollCapture={this.onScroll.bind(this)}
              >
                <Table
                  columns={[
                    {
                      title: "封面图",
                      dataIndex: "thumbnail",
                      key: "thumbnail",
                      width: "15%",
                      render: thumbnail => (
                        <img
                          src={thumbnail}
                        />
                      )
                    },
                    {
                      title: "名称",
                      dataIndex: "name",
                      width: "25%",
                      key: "libname",
                    },
                    {
                      title: "分类",
                      dataIndex: "relationships",
                      key: "category",
                      width: "12%",
                      render: dataIndex => (
                        <span>
                          {
                            dataIndex.tags && dataIndex.tags.map(val => {
                              return val.name + ' ';
                            })
                          }
                        </span>
                      )
                    },
                    {
                      title: "时长",
                      dataIndex: "duration",
                      key: "duration",
                      // defaultSortOrder: "descend",
                      // sorter: (a, b) => (a.duration || 0) - (b.duration || 0),
                      width: "12.5%",
                      render: (duration) => (
                        <span>{setMS(duration)}</span>
                      )
                    },
                    {
                      title: "成本价",
                      dataIndex: "min_price",
                      width: "12.5%",
                      key: "libprice",
                      render: (libprice, row) => (<span>{nameToSymbol(libprice) + ' ' + libprice}</span>),
                    },
                    {
                      title: "操作",
                      key: "operation",
                      dataIndex: "id",
                      width: "23%",
                      className: 'action',
                      render: (dataIndex, record) => (
                        <span>
                          {catalogid.has(dataIndex) ? (
                            <span>已添加</span>
                          ) : (
                              <a
                                href="javascript:;"
                                onClick={this.addProductFromPrivate.bind(
                                  this,
                                  record
                                )}
                              >
                                添加至片单
                            </a>
                            )}
                          <Divider type="vertical" />
                          <a
                            href="javascript:;"
                            onClick={this.showProductDeatil.bind(this, record)}
                          >
                            详情
                          </a>
                        </span>
                      )
                    }
                  ]}
                  dataSource={Products.privateStockItems}
                  rowKey="id"
                  pagination={false}
                  style={{ minHeight: "450px" }}
                  scroll={{ y: 450, x: 611 }}
                  className="veer-offline-productedit-modal-library"
                />
              </div>
              </TabPane>
          ) : null
        }
        <TabPane tab="VeeR 公共库" key="offical">
          <div
            onScrollCapture={this.onScroll.bind(this)}
          >
            <Table
              columns={[
                {
                  title: "封面图",
                  dataIndex: "thumbnail",
                  key: "thumbnail",
                  width: "15%",
                  render: thumbnail => (
                    <img
                      src={thumbnail}
                    />
                  )
                },
                {
                  title: "名称",
                  dataIndex: "name",
                  width: "25%",
                  key: "libname",
                },
                {
                  title: "分类",
                  dataIndex: "relationships",
                  key: "category",
                  width: "12%",
                  render: dataIndex => (
                    <span>
                      {
                        dataIndex.tags && dataIndex.tags.map(val => {
                          return val.name + ' ';
                        })
                      }
                    </span>
                  )
                },
                {
                  title: "时长",
                  dataIndex: "duration",
                  key: "duration",
                  // defaultSortOrder: "descend",
                  // sorter: (a, b) => (a.duration || 0) - (b.duration || 0),
                  width: "12.5%",
                  render: (duration) => (
                    <span>{setMS(duration)}</span>
                  )
                },
                {
                  title: "成本价",
                  dataIndex: "min_price",
                  width: "12.5%",
                  key: "libprice",
                  render: (libprice, row) => (<span>{nameToSymbol(libprice) + ' ' + libprice}</span>),
                },
                {
                  title: "操作",
                  key: "operation",
                  dataIndex: "id",
                  width: "23%",
                  className: 'action',
                  render: (dataIndex, record) => (
                    <span>
                      {catalogid.has(dataIndex) ? (
                        <span>已添加</span>
                      ) : (
                          <a
                            href="javascript:;"
                            onClick={this.addProductFromLibrary.bind(
                              this,
                              record
                            )}
                          >
                            添加至片单
                        </a>
                        )}
                      <Divider type="vertical" />
                      <a
                        href="javascript:;"
                        onClick={this.showProductDeatil.bind(this, record)}
                      >
                        详情
                      </a>
                    </span>
                  )
                }
              ]}
              dataSource={Products.productslib}
              rowKey="id"
              pagination={false}
              style={{ minHeight: "450px" }}
              scroll={{ y: 450, x: 611 }}
              className="veer-offline-productedit-modal-library"
            />
          </div>
        </TabPane>
      </Tabs>
    )
  }

  render() {
    const {
      visible
    } = this.props;
    const { products, editflag } = this.state;
    return (
      <Modal
        visible={visible}
        okText="保存"
        okButtonProps={{
          disabled: (!products || !editflag)
        }}
        cancelText="取消"
        width="90vw"
        onCancel={this.cancel}
        onOk={this.createCatalog.bind(this)}
        destroyOnClose={true}
        className="veer-offline-productedit"
      >
        <Row gutter={25}>
          <Col xs={24} sm={24} md={14} lg={12} xl={12}>
            <div className="veer-offline-productsetting-productedit">
              <div className="veer-offline-productsetting-productedit-header">
                <span>VeeR内容库</span>
                <p>自选内容模式下您可从内容库中挑选部分影片至体验区片单中，并调整内容顺序与价格。</p>
                <h3>内容库</h3>
              </div>
              {this.renderTabs()}
            </div>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <div className="veer-offline-productsetting-productedit">
              <div className="veer-offline-productsetting-productedit-header p59">
                <h3>体验区片单</h3>
              </div>
              {
                (!products || products.length === 0) ? (
                  <div className="empty-contents">
                    从内容库中添加多个精彩内容至体验区
                   </div>
                ) : this.renderProductTable()
              }
            </div>
          </Col>
        </Row>
        {this.renderProductDetailModal()}
      </Modal>
    );
  }
}

export default DragDropContext(HTML5Backend)(productEditModal);
