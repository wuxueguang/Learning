import React, { Component, Dispatch, useState } from "react";
import { message, Card, Table, Button, Icon, Popover } from "antd";
import { formatUTCTimespan } from '@/utils/date';
import { DDTypes } from "@/components/DDTypes";
import { ZoneTypes } from '@/types/zone';
import { setMS } from "@/utils/date";


import "./index.scss";


interface CatalogItem {
  props: {
    data: ZoneTypes.CatalogInfo,
    pendingLen?: number;
    onDeleteCatalog: (version: string, id: string) => void;
    onCreateCatalog: (catalog: ZoneTypes.CatalogInfo) => void;
  };
  state: {
    form: {
      username: string;
      password: string;
      autologin: boolean;
    };
    model: DDTypes.DDDataFields<any>[];
  };
}

class CatalogItem extends Component {

  deleteCatalog = () => {
    const { onDeleteCatalog, data} = this.props; 
    const version = formatUTCTimespan(Number(data.release_at))
    onDeleteCatalog(version, data.id);
  }

  copyCatalog = () => {
    
    const { onCreateCatalog, data } = this.props;
    
    onCreateCatalog(data);
  }

  renderContents () {
    const { data } = this.props;
    const columns = [
      {
        dataIndex: 'index',
        width: '30px',
        render: (name, record, index) => (<span>{index + 1}</span>)
      },
      {
        dataIndex: 'thumbnail',
        key: 'thumbnail',
        width: '64px',
        render: (item) => (<img className="thumbnail" src={item} />)
      },
      {
        title: '',
        dataIndex: 'name',
        key: 'name',
        render: (item) => (<div className="catalog-item-name">{item}</div>)
      },
      {
        title: '',
        dataIndex: 'duration',
        key: 'duration',
        width: '60px',
        render: (duration) => setMS(duration)
      },
    ];
    return (<Table className="veer-catalog-item-table" pagination={false} showHeader={false} columns={columns} dataSource={data.relationships.product} />);
  }

  

  renderButton() {
    const { data } = this.props;
    const pendingLen = this.props.pendingLen || 0;
    const isActive = data.distribution_status === 'active';
    const popoverContent = (
      <div className="copy-btn-popover-content">最多允许 4 个待生效版本。如需创建，请先删除现有待生效版本。</div>
    );
    return (
      <div className="btn-group">
        {!isActive && (
          <Button type="link" className="btn-delete-catalog" onClick={this.deleteCatalog}>
            <Icon type="delete" />
          </Button>
        )}

        { pendingLen >= 4 ? (
          <Popover content={popoverContent}>
            <Button type="default" disabled>
              <Icon type="plus" />
              复制创建
            </Button>
          </Popover>
        ) : (
          <Button type="default" onClick={this.copyCatalog}>
            <Icon type="plus" />
            复制创建
          </Button>
        )}
      </div>
      
    )
  }

  renderTitile() {
    const { data } = this.props;
    if (data.distribution_status === 'active') {
      return '当前版本'
    }
    return formatUTCTimespan(Number(data.release_at)) + ' 待生效';
  }

  render() {
    return (
      <Card  className="veer-catalog-item" title={this.renderTitile()} extra={this.renderButton()} style={{width: 384}}>
        {this.renderContents()}
      </Card>
    );
  }
}

export default CatalogItem;
