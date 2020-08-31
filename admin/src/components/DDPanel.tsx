import React from 'react';
import { Card, Button, Row, Col, Statistic, Badge } from "antd";
import { DDTypes, DDSwitchTypes } from './DDTypes';
import classNames from 'classnames';
import { CardProps } from 'antd/lib/card';

interface DDPanelProps<T extends DDTypes.BaseT> extends CardProps, DDTypes.DDBasePanelProps<T> {
    model: DDTypes.DDDataFields<T>[];
    data: T;
    name: string;
}

interface DDPanel<T extends DDTypes.BaseT> {
    props: DDPanelProps<T>;
}

/**
 * Data Driven Table
 * provide data objects and the model that described data
 *
 * @class DDTable
 * @extends {DDTypes.DDPanel<T>}
 * @template T
 */
class DDPanel<T extends DDTypes.BaseT> extends DDTypes.DDBasePanel<T>{

    render() {
        const { model, name, data } = this.props;    
        return <Card
            className={classNames(`panel-${name}`)}
            title={this.props.data.title}
        >
            <div className="veer-offline-zone">
                <div className="veer-offline-zone-header">
                    <span className="veer-offline-zone-header-name">
                        {data.name}
                    </span>
                    <Button type="default">编辑信息</Button>
                    <Button type="default">操控体验区</Button>
                </div>
                <div className="veer-offline-zone-content">
                    <Row>
                        <Col span={6}>
                            <Statistic title="总内容数" value={17} />
                        </Col>
                        <Col span={6}>
                            <Statistic 
                            title="总订单数量" 
                            value={347}  
                            />
                        </Col>
                        <Col span={6}>
                            <Statistic 
                            title="总销售额" 
                            value={6560} 
                            suffix="元" 
                            />
                        </Col>
                    </Row>
                </div>
                <div className="veer-offline-zone-footer">
                    <Row>
                        <Col span={4}>
                            <Badge 
                            status="default" 
                            text={`使用中${20}`}
                            />
                        </Col>
                        <Col span={4}>
                            <Badge 
                            status="processing" 
                            text={`闲置${3}`}
                            />
                        </Col>
                        <Col span={4}>
                            <Badge 
                            status="warning" 
                            text={`管理员模式${3}`}
                            />
                        </Col>
                        <Col span={4}>
                            <Badge 
                            status="default" 
                            text={`离线${0}`}
                            />
                        </Col>
                    </Row>
                </div>
            </div>
        </Card>
    }
}

export default DDPanel;