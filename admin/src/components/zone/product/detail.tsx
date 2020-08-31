import React from "react";
import { Modal, Button } from "antd";
import { ProductTypes } from "@/types";
import "./edit.scss";

interface ReduxProps {}
interface productDetailModalProps {
  visible: boolean;
  closeDetail: any;
  product: ProductTypes.stockitem;
}
interface productDetailModal {
  props: productDetailModalProps & ReduxProps;
  state: {};
}

class productDetailModal extends React.Component {
  constructor(props: any) {
    super(props);
  }
  render() {
    const { visible, closeDetail, product } = this.props;
    return (
      <Modal
        visible={visible}
        title="内容详情"
        cancelText="返回"
        okText=""
        onCancel={closeDetail}
        className="veer-offline-productsetting-productedit-detail"
        footer={
          <Button type="primary" onClick={closeDetail}>
            返回
          </Button>
        }
      >
        <div className="tag">
          <span className="title">分类标签：</span>
          <span>
            {product &&
              product.relationships &&
              product.relationships.tags.map(val => {
                return val.name;
              })}
          </span>
        </div>
        <div className="tagline">
          <span className="title">首页短评：</span>
          <span>{product && product.tagline}</span>
        </div>
        <div className="description">
          <span className="title">详情简介：</span>
          <span>{product && product.description}</span>
        </div>
        <div className="placeholder" />
      </Modal>
    );
  }
}

export default productDetailModal;
