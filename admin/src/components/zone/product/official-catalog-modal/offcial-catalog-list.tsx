import React from "react";
import { Table } from "antd";
import classNames from "classnames";
import { CatalogTypes, RequestTypes } from "@/types";
import { secondsToDate } from "@/utils/transform";
import { CatalogAction } from "@/actions";

import "./offcial-catalog-list.scss";

interface offcailCatalogListProps {
  catalog: CatalogTypes.CatalogInfo[];
  pagi?: RequestTypes.Pagination,
  requestNext: (page: number) => void;
  catalogId: string;
  onSelect: (idx: number) => void;
}
interface OffcailCatalogList {
  props: offcailCatalogListProps;
  state: {
    selectedIndex: any;
    selectId: string;
  };
}

class OffcailCatalogList extends React.Component {
  constructor(props: any) {
    super(props);
    this.select = this.select.bind(this);
    this.state = {
      selectedIndex: null,
      selectId: '',
    }
  }

  select(id) {
    const { onSelect, catalog } = this.props;
    const index = this._findRowIndex(id);
    if(index < 0) {
      this.setState({
        selectId: id,
      })
      return;
    }
    this.setState({
      selectedIndex: index,
      selectId: catalog[index].id,
    })
    onSelect(index);
  }

  _findRowIndex(id:string):number {
    const { catalog } = this.props;
    return catalog.findIndex((row) => row.id === id);
  }

  renderName = (name, row) => {
    let catalogName = name;
    if (catalogName.length > 10) {
      catalogName = name.substring(0, 10) + '...';
    }
    const d = new Date();
    const now = Math.floor(d.getTime() / 1000);
    const isNew = (now - row.created_at) <= 30 * 24 * 3600;
    return (
      <span title={name} className="catalog-name">
        {catalogName}
        {
          isNew ?
          <strong>新！</strong>
            : null
        }
      </span>
    );
  }

  async onScroll() {
    const { pagi, requestNext } = this.props;
    if (!pagi) {
      return;
    }
    if (
      pagi.current_page >=
      pagi.total_page
    ) {
      return;
    }

    this.table = document.querySelector(
      ".veer-offline-productsetting-offcial-catalog-list .ant-table-body"
    );
    const per = 10;
    const threshold = 20;
    const { scrollTop, clientHeight, scrollHeight } = this.table;
    if (scrollTop + clientHeight >= scrollHeight) {
      const page = (pagi.current_page + 1)
      requestNext(page);
    }
  }

  // componentWillReceiveProps(newProps) {
  //   console.log(newProps.);
  // }

  componentDidMount() {
    const { catalogId, catalog } = this.props;
    if (catalogId && catalog) {
      this.select(catalogId);
      return;
    }
  }

  componentWillReceiveProps(nextProp) {
    const { catalog, catalogId } = this.props;
    if (nextProp.catalog.length > catalog.length) {
      const { selectedIndex } = this.state;
      console.log(selectedIndex);
      if (typeof selectedIndex !== 'number') {
        setTimeout(() => {
          this.select(catalogId);
        }, 500);
      }
    }
  }

  table: any

  render() {
    const { catalog } = this.props;
    const { selectId } = this.state;
    return (
      <div
        onScrollCapture={this.onScroll.bind(this)}
      >
        <Table
          columns={[
            {
              title: "标题",
              dataIndex: "name",
              width: "50%",
              render: this.renderName,
            },
            {
              title: "更新时间",
              dataIndex: "updated_at",
              width: "45%",
              key: "updated_at",
              sorter: (a, b) => a.updated_at - b.updated_at,
              render: updated_at => (
                <span className="timedate">{secondsToDate(updated_at)}</span>
              )
            },
            {
              title: "",
              width: "10%",
              render: (val, row) => {
                const cls = classNames('check-icon', {
                  selected: row.id === selectId,
                })
                return (
                  <span onClick={() => this.select(row.id)} className={cls}></span>
                );
              },
            }
          ]}
          dataSource={catalog}
          rowKey="id"
          className="veer-offline-productsetting-offcial-catalog-list"
          pagination={false}
          scroll={{
            y: 370
          }}
          locale={{ emptyText: "官方片单暂无内容" }}
        />
      </div>
    );
  }
}

export default OffcailCatalogList;
