import React from "react";
import { Button, Card, Row, Icon, Breadcrumb, message, Typography, Modal } from "antd";
import { Link } from "react-router-dom";
import { RouteChildrenProps } from "react-router";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { ZonesState } from "@/reducers/zones";
import { ZoneAction, MenuAction, ProductAction} from "@/actions";
import { Endpoint } from "@/endpoints";
import CatalogItem from "./CatalogItem";
import EditModal from "@/components/zone/product/edit-v2";
import { formatISOTime } from '@/utils/date';

import "./index.scss";
import { ZoneTypes, ProductTypes } from "@/types";

interface ReduxProps {
  Zones: ZonesState;
  dispatch: Dispatch<any>;
}

interface CatalogsPanelProps {}

interface CatalogsPanelPage {
  props: CatalogsPanelProps & ReduxProps & RouteChildrenProps;
  state: {
    zoneId: string;
    // zone?: ZoneTypes.ZoneInfo;
    mobile: boolean;
    currentCatalogId: string;
    deleteModal: boolean;
    deleteModalVersion: string;
    editModal: boolean;
    cancelEditModal: boolean;
    createCatalogSuccessModal: boolean;
    publishDate: string;
    copyProduct: ProductTypes.ProductInfo[];
  };
}

let maxPendingDate: number = 0;
@(connect<{}, {}, {}, { Zones: ZonesState }>(
  ({ Zones }) => ({ Zones }),
  dispatch => ({ dispatch })
) as any)
class CatalogsPanelPage extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {
      zoneId: "",
      mobile: false,
      deleteModal: false,
      deleteModalVersion: '',
      editModal: false,
      cancelEditModal: false,
      createCatalogSuccessModal: false,
      publishDate: '',
      copyProduct: [],
      currentCatalogId: '',
    };
  }

  componentDidMount() {
    this.updatePanel();
    this.getStockItemsLibrary();
  }

  getZoneId() {
    let tmp = this.props.history.location.pathname.split("/");
    return tmp[tmp.length - 2];
  }

  async getStockItemsLibrary () {
    const { dispatch } = this.props;
    const zoneId = this.getZoneId();
    const per = 10;
    const page = 1;
    try {
      dispatch(
        await ProductAction.getlib(zoneId, per, page, dispatch)
      );
    } catch (_) {}
  }

  async updatePanel() {
    let id = this.getZoneId();
    this.setState({
      zoneId: id
    });
    try {
      this.props.dispatch(await ZoneAction.getZone(id));
      this.props.dispatch(await ZoneAction.getCatalog(id));
    } catch (_) {
      this.setState({
        zone: {}
      });
    }
    this.props.dispatch(MenuAction.change(id));

  }

  deleteCatalog = async () => {
    // handle
    const id = this.getZoneId();
    const { currentCatalogId } = this.state;
    try {
      await Endpoint.Zone.removeCatalog(id, currentCatalogId);
      message.success('删除成功！');
      this.setState({
        deleteModal: false,
      });
      this.updatePanel();
    } catch(err) {
      message.success(err.message);
    }
  }

  cancelDelete = () => {
    this.setState({
      deleteModal: false,
      deleteModalVersion: ''
    })
  }

  onDeleteCatalog = (version, id) => {
    this.setState({
      deleteModal: true,
      deleteModalVersion: version,
      currentCatalogId: id,
    })
  }

  onCreateCatalog = (data) => {
    this.setState({
      editModal: true,
      copyProduct: data.relationships.product,
    });
  }

  creatNewCatalog = () => {
    this.setState({
      editModal: true,
      copyProduct: [],
    });
  }

  onPublishCatalog = () => {
    this.setState({
      createCatalogSuccessModal: false,
    });
    this.updatePanel();
  }

  cancelEdit = () => {
    this.setState({
      cancelEditModal: true
    });
  }

  backEdit = () => {
    this.setState({
      cancelEditModal: false,
      editModal: true
    });
  }

  hideEditModal = () => {
    this.setState({
      cancelEditModal: false,
      editModal: false,
      copyProduct: [],
      isPrePublish: false,
    });
  }
  
  renderCatalogsData() {
    const { Zones } = this.props;
    if (Zones.zone && Array.isArray(Zones.zone.catalogs)) {
      const now = new Date().getTime() / 1000;
      const matchCatalog = Zones.zone.catalogs.filter((item) => {
        return item.distribution_status === 'pending';
      });
      if (matchCatalog.length > 0 ){
        return (
        <p> 待生效版本: {matchCatalog.length} 个</p>
        );
      }
      return <p>待生效版本: 无</p>;
    }
  }

  renderCreateCatalogPanel () {
    return (
      <Card  className="veer-catalog-item" title="当前版本" style={{width: 384, minHeight: 456}}>
        <div className="form-create-catalog">
          <p>当前片单无影片</p>
          <Button type="primary" onClick={this.creatNewCatalog}>
            <Icon type="plus" />
            创建新版本
          </Button>
        </div>
      </Card>
    );
  }

  renderItems () {
    const { Zones } = this.props;
    if (Zones.zone && Array.isArray(Zones.zone.catalogs)) {
      if (Zones.zone.catalogs.length === 0) {
        return this.renderCreateCatalogPanel();
      }
      const catalogs = Zones.zone.catalogs.filter(item => (item.distribution_status === 'pending' || item.distribution_status === 'active'));
      const pendingCatalogs = Zones.zone.catalogs.filter(item => item.distribution_status === 'pending');
      if (pendingCatalogs.length > 0) {
        maxPendingDate = Number(pendingCatalogs[pendingCatalogs.length - 1].release_at);
      }
      const CatalogComps = catalogs.map((item) => {
        return <CatalogItem data={item} key={item.id} pendingLen={pendingCatalogs.length} onCreateCatalog={this.onCreateCatalog} onDeleteCatalog={this.onDeleteCatalog} />
      });
      return CatalogComps;
    }
    return null;
  }

  renderEditModal(): React.ReactNode {
    const { Zones } = this.props;
    const { copyProduct } = this.state;
    const zoneId = this.getZoneId();
    return React.createElement(EditModal, {
      visible: this.state.editModal,
      closeEdit: this.cancelEdit,
      zoneId: zoneId,
      copyProduct,
      catalogs: (Zones.zone && Zones.zone.catalogs) || [],
      className: "veer-offline-productedit-modal",
      onCreatedCatalog: (publishDate) => {
        let cards=document.querySelectorAll('.veer-offline-catalogs-panel-contents .veer-catalog-item')
        
        if (new Date(publishDate).getTime() < maxPendingDate * 1000 &&  cards.length>1) {
          this.setState({
            editModal: false,
            createCatalogSuccessModal: true,
            copyProduct: undefined,
            publishDate: formatISOTime(publishDate),
          });
      
        } else {
          message.success('新版本发布成功!');
          this.setState({
            editModal: false,
            copyProduct: undefined,
            publishDate: formatISOTime(publishDate),
          }, () => {
            this.updatePanel();
          });
        }
        
      }
    });
  }
  
  render() {
    const {
      zoneId,
      deleteModal,
      cancelEditModal,
      createCatalogSuccessModal,
      deleteModalVersion,
      publishDate
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
            <Breadcrumb.Item>
                <Link
                  to={`/dashboard/zone/${zoneId}`}
                >
                  体验区详情
                </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>片单管理</Breadcrumb.Item>
          </Breadcrumb>
          <Typography.Title
            className="veer-offline-section-content-header-name"
            level={4}
          >
            片单管理: {Zones.zone && Zones.zone.name}
          </Typography.Title>
          <div className="veer-offline-section-content-header-address">
            {this.renderCatalogsData()}
          </div>
        </div>
        <Row
          gutter={35}
          justify="center"
          className="veer-offline-catalogs-panel-contents"
        >
          {this.renderItems()}
        </Row>
        {this.renderEditModal()}
        <Modal
          title={`确认要删除 ${deleteModalVersion} 版本吗？`}
          visible={deleteModal}
          okText="确认删除"
          cancelText="取消"
          onOk={this.deleteCatalog}
          onCancel={this.cancelDelete}
        >
          <p>删除操作不可恢复，可另创建新的 {deleteModalVersion} 版本。</p>
        </Modal>
        <Modal
          title="发布成功！请检查后续更新"
          visible={createCatalogSuccessModal}
          okText="好的"
          closable={false}
          onOk={this.onPublishCatalog}
          className="veer-create-catalog-success-modal"
        >
          <p>原有待生效更新中，有版本生效时间晚于 {publishDate}，请检查相应版本，确保版本之间的连续性。</p>
        </Modal>
        <Modal
          title="确认放弃本次编辑吗？"
          visible={cancelEditModal}
          okText="确认放弃"
          cancelText="继续编辑"
          closable={false}
          onCancel={this.backEdit}
          onOk={this.hideEditModal}
          className="veer-create-catalog-cancel-modal"
        >
          <p>放弃后，编辑中的操作将丢失。</p>
        </Modal>
      </div>
    );
  }
}

export default CatalogsPanelPage;
