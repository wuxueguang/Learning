import React from "react";
import { Button } from "antd";

import "./index.scss";

interface GuidePanelProps {
  showOfficialCatalog: () => void;
  showCustomCatalog: () => void;
};

interface GuidePanel {
  props: GuidePanelProps;
}

class GuidePanel extends React.Component {
  constructor(props: any) {
    super(props);
  }

  useOfficialCatalog() {
    const { showOfficialCatalog } = this.props;
    showOfficialCatalog();
  }

  useCustomCatalog() {
    const { showCustomCatalog } = this.props;
    showCustomCatalog();
  }

  render() {
    return (
      <div className="veer-offline-productsetting-guide-panel">
        <h4>体验区片单</h4>
        <p>片单暂无内容，添加一些内容吧</p>
        <div className="btn-group">
          <Button
            className="edit-offiacl-series"
            type="primary"
            onClick={this.useOfficialCatalog.bind(this)}
          >
            使用官方推荐片单
          </Button>
          <Button
            className="edit-custom-series"
            type="default"
            onClick={this.useCustomCatalog.bind(this)}
          >
            使用自选内容模式
          </Button>
        </div>
      </div>
    );
  }
}

export default GuidePanel;
