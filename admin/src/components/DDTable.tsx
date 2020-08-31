import React from 'react';
import { Table } from "antd";
import { DDTypes, DDSwitchTypes } from './DDTypes';
import { TableProps } from 'antd/lib/table';
import classNames from 'classnames';
// import { T } from 'antd/lib/upload/utils';

interface DDTableProps<T extends DDTypes.BaseT> extends TableProps<T>, DDTypes.DDBasePanelProps<T> {
    model: DDTypes.DDDataFields<T>[];
    data: T[];
    name: string;
}

interface DDTable<T extends DDTypes.BaseT> {
    props: DDTableProps<T>;
}

/**
 * Data Driven Table
 * provide data objects and the model that described data
 *
 * @class DDTable
 * @extends {DDTypes.DDPanel<T>}
 * @template T
 */
class DDTable<T extends DDTypes.BaseT> extends DDTypes.DDBasePanel<T>{
    // TODO update table when datas changed && dont update table when cells changed

    cells? : DDTypes.DDElement<T>[][];
    getTableModel(){
        const { model, name, data } = this.props;
        const newModels: DDTypes.DDDataFields<T>[] = [];
        const cells = this.cells = [...Array(model.length).fill([])].map(e=>Array(data.length).fill(null));
        for(let i = 0; i < model.length; i++){
            const m: DDTypes.DDDataFields<T> = Object.assign({}, model[i]);
            m.className = classNames("table-column",`table-${name}-column-${m.dataIndex}`, m.className);
            const subclass = DDSwitchTypes<T>(m.type);
            m.render = (text:any, record:T, index:number) => {
                if(cells[i][index]) 
                    return cells[i][index].renderTableCell(record, m, i);

                const child : DDTypes.DDElement<T> = new subclass({
                    key: m.key,
                    model: m,
                    data: record,
                    type: "table",
                    index: index,
                    parent: this
                });
                cells[i][index] = child;
                return child.renderCell(record, m, i);
            }
            if(m.display !== false){
                newModels.push(m);
            }
        }
        return newModels;
    }

    render() {
        const { name, data } = this.props;
        // key complement
        for(let i = 0; i < data.length; i+=1)
            if(!data[i].key)
                data[i].key = i
        
        return <Table
            className={classNames(`table-${name}`,this.props.className)}
            dataSource={data}
            columns={this.getTableModel()}
            pagination={false}
        />
    }
}

export default DDTable;