/* eslint-disable no-multi-assign */
import React, { useState } from 'react';
import { Form, Input } from 'antd';

import { dataSource } from './data';

import Select from '../Select';

const patterns = {};
patterns['1'] = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
patterns['2'] = patterns['4'] = patterns['6'] = /.*/;
patterns['3'] = /^[1-9]\\d{5}[1-9]\\d{3}((0\\d)|(1[0-2]))(([0|1|2]\\d)|3[0-1])\\d{3}(\\d|x|X)$/;
patterns['5'] = /^[a-zA-Z0-9]{5,17}$/;
patterns['7'] = patterns['11'] = /^[a-zA-Z0-9]{10,20}$/;
patterns['8'] = /^[a-zA-Z0-9]{6,10}$/;
patterns['9'] = /^([0-9]{8}|[0-9]{10})$/;


const CertificateInfoCollector = () => {
  const [pattern, setPattern] = useState();

  return (
    <Form.Item noStyle>
      <Input.Group compact>
          <Form.Item name="certificatiesType" noStyle>
              <Select
                style={{width: '35%'}}
                dataSource={dataSource}
                onChange={val => setPattern(patterns[val])}
              />
          </Form.Item>
          <Form.Item
            noStyle
            label="证件号码"
            name="certificatiesId"
            rules={[
              {pattern, required: Boolean(pattern), message: '证件号格式不正确'}
            ]}
          >
            <div style={{display: 'inline-block', width: '65%', boxSizing: 'border-box', paddingLeft: 5}}>
              <Input style={{width: '100%'}} placeholder="请输入" />
            </div>
          </Form.Item>
      </Input.Group>
    </Form.Item>
  );
};

export default CertificateInfoCollector;