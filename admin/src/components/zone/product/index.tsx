import React from "react";
import { Card, Table, Button, Icon, Row, Col, Modal, message } from "antd";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { CONSTANTS } from "@/constants";
import { ProductAction, ZoneAction } from "@/actions";
import { Endpoint } from "@/endpoints";
import productEditModal from "./edit";
import { ProductTypes } from "@/types";
import { ProductsState } from "@/reducers/products";
import { ZoneTypes } from "@/types";
import PreviewModal from "./preview";
import { PreviewAction } from "@/actions/preview";
import { ZonesState } from "@/reducers/zones";
import GuidePanel from "./guide-panel";
import OfficialCatalogModal from './official-catalog-modal';
import UpdateDeviceModal from './update-device-modal';
import withUserPolicy from '@/components/withUserPolicy';



import "./index.scss";

interface ReduxProps {
  Products: ProductsState;
  Zones: ZonesState;
  dispatch: Dispatch<any>;
}

interface ProductSettingProps {
  zoneId: string;
  history: any;
}

interface ProductSetting {
  props: ProductSettingProps & ReduxProps;
  state: {
    showProductEdit: boolean;
    productEdit: boolean;
    preview: boolean;
    preview_id: string;
    epilogue_id: string;
    cover_pic_id: string;
    page: number;
    per: number;
    canDeviceUpdate: boolean;
    showOfficialCatalog: boolean;
    presetUpdatedStatus: boolean;
    showUpdateDeviceModal: boolean;
  };
}

const DEFAULT_PREVIEW_COVER = 'https://assets.veervr.tv/@vrups/92bf7e22-2082-416d-a6f3-8dc707ad3899.png';

@(connect<{}, {}, {}, { Products: ProductsState; Zones: ZonesState }>(
  ({ Products, Zones }) => ({ Products, Zones }),
  dispatch => ({ dispatch })
) as any)
class ProductSetting extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {
      showProductEdit: false,
      productEdit: true,
      preview: false,
      preview_id: "",
      cover_pic_id: "",
      epilogue_id: "",
      per: 10,
      page: 1,
      canDeviceUpdate: false,
      showOfficialCatalog: false,
      presetUpdatedStatus: false,
      showUpdateDeviceModal: false,
    };
    this.showOfficialCatalogModal = this.showOfficialCatalogModal.bind(this);
    this.showProductEditModal = this.showProductEditModal.bind(this);
    this.updateProducts = this.updateProducts.bind(this);
  }
  async componentWillReceiveProps(nextProps: any, prevProps: any) {
    if (
      JSON.stringify(nextProps) !== JSON.stringify(this.props) &&
      nextProps.zoneId !== this.props.zoneId
    ) {
      try {
        this.props.dispatch(await ProductAction.get(nextProps.zoneId));
      } catch (_) {
        this.props.dispatch(ProductAction.clean());
      }
    }
    const { Products } = nextProps;
    if (Products.meta.isPreset && Products.meta.preset_catalog_has_update) {
      this.showUpdateDevice();
    }
  }
  async getPreview(zone: ZoneTypes.ZoneInfo) {
    if (zone.relationships && zone.relationships.preview.file) {
      const res = await Endpoint.Zone.getPreview(
        zone.relationships.preview.file
      );
      return res.thumbnail.url_normal_medium;
    }
    return "";
  }

  async checkDeviceUpdateStatus() {
    const res = Endpoint.Zone.canDeviceUpdate(this.props.zoneId);
    this.setState({
      canDeviceUpdate: res
    });
  }
  closePreview() {
    this.setState({ preview: false });
    this.props.dispatch(PreviewAction.clean());
  }
  async updateProducts() {
    try {
      await Endpoint.Product.publishProductCatalog(this.props.zoneId);
      message.success("更新成功");
      this.setState({
        canDeviceUpdate: false,
        productEdit: false,
      });
    } catch (_) {}
  }
  disablePublishBtn(flag) {
    this.setState({
      productEdit: !flag
    });
  }

  showUpdateDevice = () => {
    const { presetUpdatedStatus } = this.state;
    if (presetUpdatedStatus) {
      return;
    }
    this.setState({
      showUpdateDeviceModal: true,
      presetUpdatedStatus: true,
    });
  }

  showCatalogModal = () => {
    const { meta } = this.props.Products;
    if (meta.catalog_type !== CONSTANTS.CATALOG_TYPS.PRESET) {
      this.showOfficialCatalogModal();
    } else {
      this.showProductEditModal();
    }
  }

  editCatalog = () => {
    const { meta } = this.props.Products;
    if (meta.catalog_type === CONSTANTS.CATALOG_TYPS.PRESET) {
      this.showOfficialCatalogModal();
    } else {
      this.showProductEditModal();
    }
  }

  closeEdit() {
    this.props.dispatch(ProductAction.cleanlib());
    this.setState({
      showProductEdit: false
    });
  }
  async showPreviewModal() {
    const { per, page } = this.state;
    this.setState({
      preview: true
    });
    this.props.dispatch(await PreviewAction.getpreview(per, page));
    this.props.dispatch(await PreviewAction.getCover(per, page));
    this.props.dispatch(await PreviewAction.getEpilogue(per, page));
  }
  async savePreview() {
    const { preview_id, epilogue_id, cover_pic_id } = this.state;
    const defaultPreviewId = this.props.Zones.zone &&
    this.props.Zones.zone.relationships &&
    this.props.Zones.zone.relationships.preview.id || '';
    const defaultEpilogueId = this.props.Zones.zone &&
    this.props.Zones.zone.relationships &&
    this.props.Zones.zone.relationships.epilogue.id || '';
    const defaultCoverPicId = this.props.Zones.zone &&
    this.props.Zones.zone.relationships &&
    this.props.Zones.zone.relationships.cover_pic.id || '';
    if (this.props.Zones.zone) {
      try {
        await Endpoint.Preview.updatePreview(
          this.props.Zones.zone.id,
          this.props.Zones.zone.name,
          this.props.Zones.zone.address,
          preview_id || defaultPreviewId,
          epilogue_id || defaultEpilogueId,
          cover_pic_id || defaultCoverPicId,
        );
        this.props.dispatch(PreviewAction.clean());
        this.props.dispatch(await ZoneAction.getZone(this.props.zoneId));
      } catch (_) {}
    }
    this.setState({
      preview: false
    });
    if (!this.state.productEdit) {
      this.setState({
        productEdit: true
      });
    }
  }
  setPreview(key, value) {
    switch (key) {
      case "preview_id":
        this.setState({
          preview_id: value
        });
        break;
      case "epilogue_id":
        this.setState({
          epilogue_id: value
        });
        break;
      case "cover_pic_id":
        this.setState({
          cover_pic_id: value
        });
        break;
      default:
        break;
    }
  }
  async showProductEditModal() {
    const per = 10;
    const page = 1;
    const { dispatch } = this.props;
    try {
      dispatch(
        await ProductAction.getlib(this.props.zoneId, per, page, dispatch)
      );
    } catch (_) {}
    this.setState({ showProductEdit: true });
  }


  showOfficialCatalogModal() {
    this.setState({
      showOfficialCatalog: true,
    });
  }

  hideOfficialCatalogModal() {
    this.setState({
      showOfficialCatalog: false,
    });
  }

  updateDevice = () => {
    this.updateProducts();
  }

  closeUpdateDeviceModal = () => {
    this.setState({
      showUpdateDeviceModal: false,
    });
  }

  renderProductEdit(): React.ReactNode {
    return React.createElement(productEditModal, {
      visible: this.state.showProductEdit,
      closeEdit: this.closeEdit.bind(this),
      zoneId: this.props.zoneId,
      disablePublishBtn: this.disablePublishBtn.bind(this),
      className: "veer-offline-productedit-modal"
    });
  }
  renderPreviewModal(): React.ReactNode {
    return React.createElement(PreviewModal, {
      onChangePreview: this.setPreview.bind(this)
    });
  }

  _isPresetCatalog = () => {
    const { meta } = this.props.Products;
    return meta.catalog_type === CONSTANTS.CATALOG_TYPS.PRESET;
  }

  renderPrsetCatalogName(row:any) {
    const { meta } = this.props.Products;
    return (
      <div className="first-line-wrap">
        <div className="preset-catalog-name">{'使用推荐片单: ' + meta.name}</div>
        <img src={row.thumbnail} />
      </div>
    );
  }

  renderTable(): React.ReactNode {
    const { Products } = this.props;
    console.log(Products);
    
    if (!Products.products || (Products.products && Products.products.length === 0)) {
      return (<GuidePanel showOfficialCatalog={this.showOfficialCatalogModal} showCustomCatalog={this.showProductEditModal} />);
    }
    return (
      <div className="veer-offline-productsetting-productgrid">
        <div className="veer-offline-productsetting-productheader">
          <Row>
            <Col span={8}>
              <span className="veer-offline-productsetting-title">片单</span>
            </Col>
            {withUserPolicy((
              <Col span={16}>
                <Button
                  className="edit-official-series"
                  type="default"
                  onClick={this.showCatalogModal}
                >
                {
                  this._isPresetCatalog()
                    ? '使用自选内容模式' : '使用官方推荐片单'
                }
                </Button>
                <Button
                  className="edit-custom-series"
                  type="default"
                  onClick={this.editCatalog}
                >
                  编辑片单
                </Button>
              </Col>
            ), 'offline_biz_zones_catalog_update')}
          </Row>
        </div>
        {}
        <Table
          columns={[
            {
              title: "封面图",
              dataIndex: "thumbnail",
              key: "thumbnail",
              width: "110px",
              render: (thumbnail, row, index) => {
                if (this._isPresetCatalog() && index === 0) {
                  return this.renderPrsetCatalogName(row)
                }
                return (
                <img
                  src={thumbnail}
                />
                )
            }
            },
            {
              title: "名称",
              dataIndex: "name",
              key: "name",
              render: name => <span>{name}</span>
            },
            {
              title: "时长(分钟)",
              dataIndex: "duration",
              width: "20%",
              key: "duration",
              render: duration => (
                <span>{`${Math.floor(parseInt(duration) / 60)}:${
                  parseInt(duration) % 60 < 10
                    ? `0${parseInt(duration) % 60}`
                    : parseInt(duration) % 60
                }`}</span>
              )
            },
            {
              title: "售价",
              width: "20%",
              key: "price",
              dataIndex: "price",
              render: price => <span>¥{price}</span>
            }
          ]}
          dataSource={Products.products}
          rowKey="id"
          className={this._isPresetCatalog() ? 'preset' : ''}
          pagination={false}
          scroll={{
            x: 484,
            y: 370
          }}
          locale={{ emptyText: "暂无内容，点击编辑来添加内容" }}
        />
      </div>
    );
  }
  //  render device button

  renderUpdateDeviceButton() {
    const { Products } = this.props;
    const { productEdit } = this.state;
    let disabled = true;
    if (productEdit) {
      disabled = false;
    }
    return withUserPolicy((
      <Button
        type={disabled ? "default" : "primary"}
        disabled={disabled}
        onClick={this.updateDevice}
        className="btn-update-catalog"
      >
        <Icon type="sync" />
        <span>更新设备</span>
      </Button>
    ), 'offline_biz_zones_catalogs_publish');
  }

  render() {
    const {
      preview,
      showOfficialCatalog,
      showUpdateDeviceModal,
    } = this.state;
    const { Zones, zoneId, Products } = this.props;
    if (Products.isFetching) {
      return (
        <div className="veer-offline-productsetting">
          <Card loading />
        </div>
      );
    }
    let presetCatalogId;
    if (Products.meta && Products.meta.isPreset && Products.meta.preset_catalog_id) {
      presetCatalogId = Products.meta.preset_catalog_id;
    }
    return (
      <div>
        <Card
          title={
            <div className="veer-offline-productsetting-header">
              <span>内容设置</span>
              { this.renderUpdateDeviceButton() }
            </div>
          }
          className="veer-offline-productsetting"
        >
          { this.renderTable() }
          <div className="veer-offline-productsetting-productpreview">
            <span className="veer-offline-productsetting-title">预览画面</span>
            {withUserPolicy((
              <Button type="default" onClick={this.showPreviewModal.bind(this)}>编辑</Button>
            ), 'offline_biz_zones_update')}
            <Row gutter={20}>
              <Col
                xs={24}
                sm={24}
                lg={12}
                xl={12}
                xxl={12}
                style={{
                  minHeight: 161
                }}
              >
                <div className="veer-offline-productsetting-productpreview-wrapper">
                  <img src={ (Zones.zone && Zones.zone.previewimg) || DEFAULT_PREVIEW_COVER } />
                </div>
                <span>引导视频</span>
              </Col>
              <Col
                xs={24}
                sm={24}
                lg={12}
                xl={12}
                xxl={12}
                style={{
                  minHeight: 161
                }}
              >
                <div className="veer-offline-productsetting-productpreview-wrapper">
                  <img
                    src={
                      (Zones.zone &&
                      Zones.zone.relationships &&
                      Zones.zone.epilogueimg) || DEFAULT_PREVIEW_COVER
                    }
                  />
                </div>

                <span>片尾视频</span>
              </Col>
            </Row>
            <Row gutter={20}>
              <Col
                xs={24}
                sm={24}
                lg={12}
                xl={12}
                xxl={12}
                style={{
                  minHeight: 161
                }}
              >
                <div className="veer-offline-productsetting-productpreview-wrapper">
                  <img
                    src={
                      (Zones.zone &&
                      Zones.zone.relationships &&
                      Zones.zone.relationships.cover_pic.file) || DEFAULT_PREVIEW_COVER
                    }
                  />
                </div>

                <span>引导图</span>
              </Col>
            </Row>
          </div>
        </Card>
        {this.renderProductEdit()}
        <Modal
          visible={preview}
          // afterClose={this.closePreview.bind(this)}
          onCancel={this.closePreview.bind(this)}
          title="设置默认预览内容"
          cancelText="取消"
          okText="保存"
          onOk={this.savePreview.bind(this)}
          destroyOnClose={true}
          className="veer-offline-productsetting-previewmodal"
        >
          {this.renderPreviewModal()}
        </Modal>
        <OfficialCatalogModal disablePublishBtn={this.disablePublishBtn.bind(this)} zoneId={zoneId} catalogId={presetCatalogId} closeDetail={this.hideOfficialCatalogModal.bind(this)} visible={showOfficialCatalog} />
        <UpdateDeviceModal onSubmit={this.updateProducts} onClose={this.closeUpdateDeviceModal} visible={showUpdateDeviceModal} />
      </div>
    );
  }
}

export default ProductSetting;
