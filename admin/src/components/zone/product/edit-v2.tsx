import React from "react";
import classNames from "classnames";
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
  Radio,
  DatePicker,
  Tabs,
  Icon,
  Spin,
  Button,
  Tooltip
} from "antd";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import { CONSTANTS } from "@/constants";
import { Endpoint } from "@/endpoints";
import { ProductTypes, ZoneTypes } from "@/types";
import products, { ProductsState } from "@/reducers/products";
import { setMS, formatUTCTimespan } from "@/utils/date";
import { setDefaultStockItemsTags } from "@/utils/model";
import {
  delKeyFromTargetArr,
  replaceKeyFromTargetArr
} from "@/utils/arrcommon";
import DragableBodyRow from "./drag";
import productDetailModal from "./detail";
import { ProductAction } from "@/actions";

import "./edit-v2.scss";

interface ReduxProps {
  Products: ProductsState;
  dispatch: Dispatch<any>;
}
interface EditV2ModalProps {
  visible: boolean;
  closeEdit: any;
  zoneId: string;
  disablePublishBtn: any;
  copyProduct: ProductTypes.ProductInfo[];
  catalogs: ZoneTypes.CatalogInfo[];
  onCreatedCatalog: (publishDate: string) => void;
}
interface EditV2Modal {
  props: EditV2ModalProps & ReduxProps;
  state: {
    selproduct?: ProductTypes.ProductInfo;
    products?: ProductTypes.ProductInfo[];
    showdeatil: boolean;
    catalogid: any;
    originCata: ProductTypes.ProductInfo[];
    editflag: boolean;
    input: number;
    currentTab: string;
    isPrePublish: boolean;
    publishMode: number;
    publishDate: string;
    isPublishDateBeyondPending: boolean;
    publishCheck: boolean;
    pendingDownloadList: string[];
    showPendingDownloadList: boolean;
    datePickerError: boolean;
  };
}

const { TabPane } = Tabs;

@(connect<{}, {}, {}, { Products: ProductsState }>(
  ({ Products }) => ({ Products }),
  dispatch => ({ dispatch })
) as any)
class EditV2Modal extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {
      showdeatil: false,
      catalogid: new Set(),
      originCata: [],
      editflag: false,
      input: 0,
      currentTab: '',
      isPrePublish: false,
      publishMode: 1,
      publishDate: '',
      isPublishDateBeyondPending: false,
      publishCheck: false,
      pendingDownloadList: [],
      showPendingDownloadList: false,
      datePickerError: false,
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
    if (!nextProps.visible) {
      this.setState({
        isPrePublish: false,
      });
    }
    if (
      nextProps.Products.productslib.length > 0 
      && ((!this.state.products && nextProps.copyProduct && nextProps.copyProduct.length > 0) 
      || (!nextProps.visible && nextProps.copyProduct && nextProps.copyProduct.length > 0))) {
      let tmp: string[] = [];
      nextProps.copyProduct.forEach(val => {
        tmp.push(val.relationships.stock_item.id);
      });
      this.setState({
        catalogid: new Set(tmp),
        products: setDefaultStockItemsTags(nextProps.Products.productslib, nextProps.copyProduct)
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
  createCatalog = async () => {
    
    const { zoneId, onCreatedCatalog } = this.props;
    const { products, publishDate, publishMode } = this.state;
    let tmp: any[] = [];
    let obj: any = {};
    if (
      this.props.Products.products &&
      this.compare(this.props.Products.products, this.state.products || [])
    ) {
      // this.props.disablePublishBtn(true);
    } else {
      // this.props.disablePublishBtn(false);
    }
    
    if (!publishDate) {
      this.setState({
        datePickerError: true
      });
      return;
    }
    this.setState({
      publishMode: 1,
    })
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
      const reuslt = await Endpoint.Zone.createCatalog(zoneId, publishDate, tmp);
      await Endpoint.Zone.publishCatalog(zoneId, reuslt.id);
      if (publishMode === 1) {
        await Endpoint.Zone.releaseCatalog(zoneId);
      }
      // const action = await ProductAction.get(zoneId);
      // this.props.dispatch(action);
      this.setState({
        products: undefined
      });
      onCreatedCatalog(publishDate);
    } catch (err) {
      message.error(err.message);
      // this.props.disablePublishBtn(true);
      console.log(err);
    }
    // this.cancel();
  }
  renderProductDetailModal(): React.ReactNode {
    const { selproduct } = this.state;
    return React.createElement(productDetailModal, {
      visible: this.state.showdeatil,
      closeDetail: this.closeProductDeatil.bind(this),
      product: selproduct
    });
  }

  _resetState = () => {
    this.setState({
      products: undefined,
      catalogid: new Set(),
      publishMode: 1,
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
    let index=1
    return (
      <Table
        columns={[
          {
            title: " ",
            width: "5%",
            key: "index",
            render: () => (
              <span style={{
                textAlign:'center',
                display:'block'
              }}>{index++}</span>
            )
          },
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

  back = () => {
    this.setState({
      publishCheck: false,
      isPrePublish: false,
      publishMode: 1,
    })
  }

  next = () => {  
    const { products } = this.state;
    if (products?.length === 0) {
      return message.info('请添加影片')
    }
    this.setState({
      publishCheck: true,
      isPrePublish: true,
      publishDate: new Date().toISOString(),
    });
    this.checkCatalogRelease();
  }

  async checkCatalogRelease() {
    let { products } = this.state;
    if (!products) {
      products = [];
    }
    const { zoneId } = this.props;
    const stockItems = products.map(item => {
      return { 
        stock_item_id: item.relationships.stock_item.id
      };
    });
    try {
      const result = await Endpoint.Zone.checkCatalogRelease(zoneId, stockItems);
      if (result.is_ready) {
        this.setState({
          publishCheck: false,
          pendingDownloadList: []
        });
      } else if(result.need_download_stock_items && result.need_download_stock_items.length > 0) {
        this.setState({
          publishCheck: false,
          pendingDownloadList: result.need_download_stock_items,
          publishMode: 2,
          publishDate: '',
        });
      }
    } catch(err) {
      message.error(err.message);
      this.back();
    }
  }

  onChange = (e) => {
    this.setState({
      publishMode: e.target.value,
      publishDate: new Date().toISOString()
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
                      title: "影片",
                      dataIndex: "thumbnail",
                      key: "thumbnail",
                      width: "90px",
                      render: thumbnail => (
                        <img
                          src={thumbnail}
                        />
                      )
                    },
                    {
                      dataIndex: "name",
                      key: "libname",
                    },
                    {
                        title: "时长",
                        dataIndex: "duration",
                        key: "duration",
                        // defaultSortOrder: "descend",
                        // sorter: (a, b) => (a.duration || 0) - (b.duration || 0),
                        width: "60px",
                        render: (duration) => (
                          <span>{setMS(duration)}</span>
                        )
                    },
                    {
                      title: "分类",
                      dataIndex: "relationships",
                      key: "category",
                      width: "80px",
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
                      title: "操作",
                      key: "operation",
                      dataIndex: "id",
                      width: "140px",
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
                  title: "影片",
                  dataIndex: "thumbnail",
                  key: "thumbnail",
                  width: "80px",
                  render: thumbnail => (
                    <img
                      src={thumbnail}
                    />
                  )
                },
                {
                  dataIndex: "name",
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
                  width: "60px",
                  render: (duration) => (
                    <span>{setMS(duration)}</span>
                  )
                },
                {
                  title: "操作",
                  key: "operation",
                  dataIndex: "id",
                  width: "140px",
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

  renderFooter() {
    const { isPrePublish, publishCheck } = this.state;
    if (publishCheck) {
      return null;
    }
    return (
      <div className="ant-modal-footer">
        <div>
          { isPrePublish && (
            <Button type="default" className="btn-back" onClick={this.back}>上一步</Button>
          )}
          <Button type="default" onClick={this.cancel}>放弃编辑</Button>
          { isPrePublish ? (
            <Button type="primary" onClick={this.createCatalog}>发布</Button>
          ) : (
            <Button type="primary" onClick={this.next}>下一步</Button>
          )}
        </div>
      </div>
    )
  }

  renderContentsSelect = () => {
    const { products, editflag } = this.state;
    return (
      <Row gutter={25}>
          <Col xs={24} sm={24} md={14} lg={12} xl={12}>
            <div className="veer-offline-catalog-edit-v2">
              <div className="veer-offline-catalog-edit-v2-header">
                <span>选择影片</span>
                <p>您可从内容库中挑选部分影片至片单中，并调整影片顺序。</p>
                <h3>内容库</h3>
              </div>
              {this.renderTabs()}
            </div>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <div className="veer-offline-catalog-edit-v2">
              <div className="veer-offline-catalog-edit-v2-header p59">
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
    );
  }

  onDatePickerChange = (date) => {
    this.setState({
      datePickerError: false,
      publishDate: date.toISOString()
    });
  }

  togglePendingDownloadList = () => {
    const { showPendingDownloadList } = this.state;
    this.setState({
      showPendingDownloadList: !showPendingDownloadList,
    });
  }

  renderPendingDownloadList() {
    const { pendingDownloadList, showPendingDownloadList } = this.state;
    if (pendingDownloadList.length === 0) {
      return null;
    }
    const pendingDate = formatUTCTimespan(Math.ceil(Date.now() / 1000 + 24 * 7 * 3600));
    const items = pendingDownloadList.map((item, index) => (<div className="pending-download-item">{index+1}. {item}</div>))
    return (
      <div className="device-pending-download-list">
        <p>
          <strong>检测到新影片</strong>由于该片单中部分影片需要下载，预定生效时间不能早于 {pendingDate} 
          
          { showPendingDownloadList ? (
            <Button onClick={this.togglePendingDownloadList} type="link">收起需要下载影片 <Icon type="up" /></Button>
          ) : (
            <Button onClick={this.togglePendingDownloadList} type="link">查看需要下载影片 <Icon type="down" /></Button>
          )}
        </p>
        { showPendingDownloadList && (
          <div className="device-pending-download-contents">
            {items}
          </div>
        )}
      </div>
    )
  }


  renderDateSelect = () => {
    const { catalogs } = this.props;
    const { publishMode, publishCheck, pendingDownloadList, datePickerError} = this.state;
    let disabledDownloadTime: string[] = [],
        disableCatalogTime : string[] = [];
    if (pendingDownloadList.length > 0) {
      for (let i = 0; i< 7; i++) {
        disabledDownloadTime.push(formatUTCTimespan(Math.ceil(Date.now() / 1000) + i * 24 * 3600));
      }
    }
    if (catalogs.length > 0) {
      catalogs.forEach(item => {
        disableCatalogTime.push(formatUTCTimespan(Number(item.release_at)));
      });
    }
    const disabledDate = (date) => {
      if (date.valueOf() < Date.now()) {
        return true;
      }
      const d = formatUTCTimespan(Math.ceil(date.valueOf() / 1000));
      for (let j = 0; j < disabledDownloadTime.length; j++) {
        if (disabledDownloadTime[j] === d) {
          return true;
        }
      }
      for (let j = 0; j < disableCatalogTime.length; j++) {
        if (disableCatalogTime[j] === d) {
          return true;
        }
      }
      return false;
    }
    const dateRender = (current) => {
      const d = formatUTCTimespan(Math.ceil(current.valueOf() / 1000));
      for (let j = 0; j < disabledDownloadTime.length; j++) {
        if (disabledDownloadTime[j] === d) {
          return (
            <Tooltip title="有下载需求，最早可选7天后">
              <div className="ant-calendar-date">
                {current.date()}
              </div>
            </Tooltip>
          );
        }
      }
      for (let j = 0; j < disableCatalogTime.length; j++) {
        if (disableCatalogTime[j] === d) {
          return (
            <Tooltip title="该日期已有待生效预约">
              <div className="ant-calendar-date">
                {current.date()}
              </div>
            </Tooltip>
          );
        }
      }
      return (
        <div className="ant-calendar-date">
          {current.date()}
        </div>
      );
    }
    if (publishCheck) {
      const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
      return (
        <div className="veer-loading-contents">
          <Spin indicator={antIcon} />
        </div>
      );
    }
    const cls = classNames('veer-date-select-wrap', {
      'error': datePickerError
    })
    return (

      <div className="veer-offline-catalog-edit-v2">
      <div className="veer-offline-catalog-edit-v2-header">
        <span>选择生效时间</span>
      </div>
       <div className={cls}>
        {this.renderPendingDownloadList()}
        <Radio.Group onChange={this.onChange} value={this.state.publishMode}>
          <p>
            <Radio disabled={pendingDownloadList.length > 0} value={1}>
              发布后立即生效
            </Radio>
          </p>
          <p>
            <Radio value={2}>
              预定日期，当天早上 8点整生效
            </Radio>
          </p>
        </Radio.Group>
        <p>
          <DatePicker dateRender={dateRender} disabledDate={disabledDate} onChange={this.onDatePickerChange} disabled={publishMode===1} placeholder="生效日期" />
          <span className="error-msg">必填</span>
        </p>
      </div>
    </div>
     
    );
  }

  render() {
    const {
      visible
    } = this.props;
    const { 
      products, 
      editflag,
      isPrePublish
    } = this.state;
    return (
      <Modal
        visible={visible}
        closable={false}
        okButtonProps={{
          disabled: (!products || !editflag)
        }}
        width={isPrePublish ? '35vw' : '90vw'}
        footer={this.renderFooter()}
        onOk={this.createCatalog.bind(this)}
        destroyOnClose={true}
        className="veer-offline-productedit"
      >
        {isPrePublish ? this.renderDateSelect() : this.renderContentsSelect() }
        {this.renderProductDetailModal()}
      </Modal>
    );
  }
}

export default DragDropContext(HTML5Backend)(EditV2Modal);
