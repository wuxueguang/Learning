import React from 'react';
import ProTable from '@ant-design/pro-table';
import { Form } from 'antd';
import { CertificateInfoCollector } from './components';
import styles from './index.css';


const columns = [{
  hideInSearch: true,
  title: '证件类型',
  dataIndex: 'certificateType',
}, {
  hideInSearch: true,
  title: '证件号码',
  dataIndex: 'certificateNo'
}, {
  hideInTable: true,
  title: '证件信息',
  dataIndex: 'dd',
  renderFormItem: () => {
    return (
      <Form.Item name="certificate">
        <CertificateInfoCollector />
      </Form.Item>
    );
  }
},];

export default () => {
  return (
    <>
      <ProTable
        columns={columns}
        request={params => console.log(params)}
      />
    </>
  );
}
