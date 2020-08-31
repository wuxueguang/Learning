import React from "react";
// import { Dispatch } from "redux";
// import { connect } from "react-redux";
import { Table } from "antd";
// import { Endpoint } from "@/endpoints";
import { ProductTypes } from "@/types";
import { setMS } from "@/utils/date";
import { nameToSymbol } from "@/utils/transform";
import productDetailModal from "../detail";
import NumericInput from "../input";

import "./index.scss";


interface catalogListProps {
  disableDrag: boolean;
  onPriceChange: (isError: boolean) => void;
  stockItems: ProductTypes.stockitem[];
}

interface CatalogList {
  props: catalogListProps;
  state: {
    selproduct?: ProductTypes.ProductInfo;
    products?: ProductTypes.ProductInfo[];
    showdeatil: boolean;
    catalogid: any;
    originCata: ProductTypes.ProductInfo[];
    editflag: boolean;
    input: number;
  };
}

class CatalogList extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {
      showdeatil: false,
      catalogid: new Set(),
      originCata: [],
      editflag: false,
      input: 0
    };
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
  addProductFromLibrary(product: ProductTypes.stockitem) {
    let obj: ProductTypes.ProductInfo = {
      type: "product",
      duration: product.duration || 0,
      thumbnail: product.thumbnail,
      name: product.name,
      price: product.min_price,
      currency: "CNY",
      relationships: {
        stock_item: product
      }
    };
    this.state.catalogid.add(product.id);
    let tmp = Object.assign([], this.state.products);
    tmp.unshift(obj);
    this.setState({
      products: tmp
    });
  }
  catalogMove(dragIndex, hoverIndex) {
    const { disableDrag } = this.props;
    if (disableDrag) {
      return;
    }
    let tmp = Object.assign([], this.state.products);
    const tarData = Object.assign({}, tmp[dragIndex]); //拖动数据
    tmp.splice(dragIndex, 1);
    tmp.splice(hoverIndex, 0, tarData);
    this.setState({
      products: tmp
    });
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
  renderProductDetailModal(): React.ReactNode {
    const { selproduct } = this.state;
    return React.createElement(productDetailModal, {
      visible: this.state.showdeatil,
      closeDetail: this.closeProductDeatil.bind(this),
      product: selproduct
    });
  }

  changePrice(newval: string, record: ProductTypes.stockitem) {
    const { onPriceChange } = this.props;
    let isError = false;
    if (Number(newval) < Number(record.min_price)) {
      isError = true;
    }
    if (newval !== record.price) {
      onPriceChange(isError);
    }
    record.price = newval;
  }

  table: any;

  renderEmptyData() {
    return (
      <div className="veer-offline-productsetting-catalog-list">
        <div className="empty-data">选择一个官方推荐片单添加至体验区</div>
      </div>
    )
  }

  render() {
    const { stockItems } = this.props;
    if (!stockItems || stockItems.length === 0) {
      return this.renderEmptyData();
    }
    return (
      <div className="veer-offline-productsetting-catalog-list">
        <Table
          columns={[
            {
              title: "内容",
              dataIndex: "thumbnail",
              width: "20%",
              render: (thumbnail, row) => (
                <span>
                  <img
                    src={thumbnail}
                  />
                </span>
              )
            },
            {
              title: "",
              dataIndex: "name",
              width: "25%",
            },
            {
              title: "时长",
              dataIndex: "duration",
              key: "duration",
              width: "10%",
              render: duration => setMS(duration)
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
              title: "成本价",
              dataIndex: "min_price",
              width: "10%",
              render: (price, record) => (
                <span>
                  { nameToSymbol(record.currency) + ' ' + price}
                </span>
              )
            },
            {
              title: "售价",
              dataIndex: "price",
              width: "15%",
              render: (price, record) => (
                <div>
                  {nameToSymbol(record.currency)}
                  <NumericInput
                    min={record.min_price}
                    key={record.id}
                    defaultval={price}
                    onCallbackParent={(e) => { this.changePrice(e, record)}}
                  />
                </div>
              )
            },
            {
              title: "操作",
              key: "detail",
              dataIndex: "id",
              width: "10%",
              render: (dataIndex, record) => (
                <a
                  href="javascript:;"
                  onClick={() => this.showProductDeatil(record)}
                >
                  详情
                </a>
              )
            }
          ]}
          dataSource={stockItems}
          pagination={false}
          locale={{ emptyText: "暂无内容" }}
          rowKey={(record, index) => index.toString()}
          scroll={{ y: 440, x: 477 }}
          style={{ minHeight: "440px" }}
        />
        {this.renderProductDetailModal()}
      </div>
    );
  }
}

export default CatalogList;
