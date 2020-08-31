import React from "react";
import { Modal, Row, Col, message } from "antd";
import { Dispatch } from "redux";
import { connect } from 'react-redux';
import { ProductTypes } from "@/types";
import { CONSTANTS } from "@/constants";
import { Endpoint } from "@/endpoints";
import { setPresetCatalogPrice, setProductsMinPrice, setDefaultPresetCatalogPrice } from "@/utils/model";
import { fastClone } from "@/utils/transform";
import { CatalogState } from "@/reducers/catalog";
import { ProductsState } from "@/reducers/products";
import { ProductAction, CatalogAction } from "@/actions";
import OffcialCatalogList from './offcial-catalog-list';
import CatalogList from '../catalog-list';

import "./index.scss";

interface ReduxProps {
  dispatch?: Dispatch<any>;
  Catalog?: CatalogState;
  Products?: ProductsState;
}

interface offlineCatalogModalProps {
  visible: boolean;
  closeDetail: () => void;
  disablePublishBtn: (flag: boolean) => void;
  zoneId: string;
  catalogId: string;
}
interface OfflineCatalogModal {
  props: offlineCatalogModalProps & ReduxProps;
  state: {
    stockItems: ProductTypes.stockitem[];
    catalogIdx?: number;
    catalogName?: string;
    isSubmiting: boolean;
    isEdit: boolean;
  };
}

@(connect<{}, {}, {}, { Catalog: CatalogState, Products: ProductsState}>(
  ({ Catalog, Products }) => ({ Catalog, Products }),
  dispatch => ({ dispatch })
) as any)

class OfflineCatalogModal extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {
      stockItems: [],
      catalogName: '',
      isEdit: false,
      isSubmiting: false
    };
    this.selectCatalog = this.selectCatalog.bind(this);
  }

  selectCatalog = (idx: number) => {
    const { Catalog, Products, catalogId } = this.props;
    if (!Catalog || !Products) {
      return;
    }
    let data: any [] = [];
    try {
      const stockItems = Catalog.presetCatalog[idx].relationships.stock_items;
      data = catalogId
        ? setPresetCatalogPrice(Products.products || [], stockItems)
        : setDefaultPresetCatalogPrice(stockItems);
    } catch (_) {
      console.error(_);
    }
    this.setState({
      stockItems: data,
      catalogIdx: idx,
      isEdit: (catalogId != Catalog.presetCatalog[idx].id),
      catalogName: Catalog.presetCatalog[idx].name,
    });
  }

  changePrice = (isError) => {
    const { catalogIdx } = this.state;
    const { Catalog, catalogId} = this.props;
    if (!Catalog) {
      return;
    }
    let isEdit = true;
    const oldPresetCatalog = Catalog.presetCatalog[catalogIdx || 0].relationships.stock_items;
    clearTimeout(this.delay);
    this.delay = setTimeout(() => {
      const { stockItems } = this.state;
      if (catalogId && this.compare(oldPresetCatalog, stockItems)
    ) {
      isEdit = false;
    }
    if (isError) {
      isEdit = false;
    }
    this.setState({
      isEdit,
    });
    }, 50);
  }

  delay: any;

  createCatalog = async () => {
    const { stockItems, catalogIdx } = this.state;
    const { Catalog, catalogId, closeDetail, zoneId, dispatch, disablePublishBtn } = this.props;
    if (!Catalog) {
      return;
    }
    let tmp: any[] = [];
    let obj: any = {};
    const oldPresetCatalog = Catalog.presetCatalog[catalogIdx || 0].relationships.stock_items;
    let presetCatalogId = catalogId
    if (typeof catalogIdx === 'number') {
      presetCatalogId = Catalog.presetCatalog[catalogIdx || 0].id;
    }
    if (catalogId && (presetCatalogId === catalogId) && oldPresetCatalog
      && this.compare(oldPresetCatalog, stockItems)
    ) {
      this.hide();
      return;
    }
    this.setState({
      isSubmiting: true,
    })
    try {
      stockItems.forEach((val, index) => {
        obj = {
          stock_item_id: val.id,
          price: parseFloat(val.price),
          sequence: index + 1
        };
        tmp.push(obj);
      });
      await Endpoint.Product.createProductCatalog(zoneId, tmp, presetCatalogId, 'preset');
      const action = await ProductAction.get(zoneId);
      if (dispatch) {
        dispatch(action);
      }
      this.hide();
      disablePublishBtn(false);
    } catch (_) {
      message.error("片单保存失败");
    }
    this.setState({
      isSubmiting: false,
    })
  }

  compare(a: ProductTypes.stockitem[], b: ProductTypes.stockitem[]) {
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

  async componentDidMount() {
    await this.getPresetCatalog(1);
    this.resetStockItem();
  }

  getPresetCatalog = async (page) => {
    const { dispatch, } = this.props;
    if (dispatch) {
      dispatch(await CatalogAction.getPresetCatalog(page));
    }
  }

  componentWillReceiveProps(nextProps) {
    const { catalogId } = this.props;
    if (nextProps.catalogId && nextProps.catalogId !== catalogId) {
      this.resetStockItem(nextProps.catalogId);
      return;
    }
    if (!nextProps.catalogId) {
      this.setState({
        stockItems: [],
      });
    }
  }

  renderCatalogName = () => {
    const { catalogName } = this.state;
    if (catalogName) {
      return (
        <span className="catalog-name">
          {`片单: ${catalogName}`}
        </span>
      )
    }
    return null;
  }

  resetStockItem = (id?:string) => {
    const { Products, catalogId } = this.props;
    if (catalogId || id) {
      this.setState({
        stockItems: setProductsMinPrice((Products && Products.products) || []),
      });
    } else {
      this.setState({
        stockItems: [],
      });
    }
  }

  hide = () => {
    const { closeDetail, Products } = this.props;
    this.resetStockItem();
    closeDetail();
  }

  render() {
    const { visible, closeDetail, Catalog, catalogId } = this.props;
    const { stockItems, isSubmiting, isEdit } = this.state;
    return (
      <Modal
        visible={visible}
        cancelText="取消"
        okText="保存"
        okButtonProps={{
          disabled: !isEdit
        }}
        onOk={this.createCatalog}
        confirmLoading={isSubmiting}
        onCancel={this.hide}
        forceRender={true}
        destroyOnClose={true}
        closable={false}
        className="veer-offline-productsetting-offcial-catalog-modal"
      >
        <div className="veer-offline-productsetting-offcial-catalog-modal-wrap">
          <Row>
            <Col span={8}>
              <h3>官方推荐片单</h3>
              <p>VeeR将特定优质内容打包在下列推荐片单列表中，您可以选择一个片单添加至体验区</p>
              <OffcialCatalogList catalogId={catalogId} requestNext={this.getPresetCatalog} pagi={(Catalog && Catalog.presetCatalog && Catalog.presetCatalogPagi)} catalog={(Catalog && Catalog.presetCatalog) || []} onSelect={this.selectCatalog} />
            </Col>
            <Col offset={1} span={15}>
              <h3>体验区片单
                {this.renderCatalogName()}
              </h3>
              <CatalogList disableDrag={false} onPriceChange={this.changePrice} stockItems={stockItems} />
            </Col>
          </Row>
        </div>
      </Modal>
    );
  }
}

export default OfflineCatalogModal;
