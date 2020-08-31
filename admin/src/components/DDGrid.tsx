import React, { Children } from 'react';
import { List, Card } from 'antd';
import { DDTypes, DDSwitchTypes } from './DDTypes';
import { ListProps, ListSize,ListItemLayout , ListGridType} from 'antd/lib/list';
import classNames from 'classnames';

interface DDGridProps<T extends DDTypes.BaseT> extends ListProps<T>, DDTypes.DDBasePanelProps<T> {
    model: DDTypes.DDDataFields<T>[];
    data: T[];
    size?: ListSize;
    className: string;
    grid?: ListGridType;
    name: string;
    itemLayout?: ListItemLayout;
    wrapper?: React.ComponentClass<React.HTMLAttributes<any>>;
    dataSource: T[]; // from ListProps, no longer use it
    renderItem: (item: T, index: number) => React.ReactNode; // from ListProps, no longer use it
}

interface DDGrid<T extends DDTypes.BaseT> {
    props: DDGridProps<T>;
}

/**
 * Data Driven Grid
 * 
 * @class DDGrid
 * @extends {DDTypes.DDPanel<T>}
 * @template T
 */
class DDGrid<T extends DDTypes.BaseT> extends DDTypes.DDBasePanel<T>{
    static defaultProps = {
        wrapper: Card,
        dataSource: undefined,
        renderItem: undefined,
        model: [],
        data: [],
        name: ''
    }

    handleRenderItem(item: T): React.ReactNode {
        const { model, wrapper } = this.props;

        const children: React.ReactNode[] = [];

        for (let i = 0; i < model.length; i += 1) {
            const m = model[i];
            if (m.display === false) continue;
            const subclass: React.ComponentClass<DDTypes.DDElementProps<T>> = DDSwitchTypes(m.type);
            const child = React.createElement(subclass, {
                key: m.key,
                model: m,
                data: item,
                type: "grid",
                index: i,
                parent: this
            });
            children.push(child);
        }

        return React.createElement(wrapper!, { 
            className:classNames("grid-item"),
            title: item.title
        }, ...children);

    }

    render() {
        const { data, className, name } = this.props;

        return <List
            size={this.props.size}
            itemLayout={this.props.itemLayout}
            grid={this.props.grid}
            className={classNames(`grid-${name}`, className)}
            dataSource={data}
            renderItem={this.handleRenderItem.bind(this)}
            
        />
    }
}

export default DDGrid;