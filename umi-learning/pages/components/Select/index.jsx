import React from 'react';
import { Select as AntdSelect } from 'antd';

const Select = props => {
  const opts = Array.isArray(props.dataSource) ? props.dataSource : [];

  const restProps = {...props};
  delete restProps.dataSource;

  return (
    <AntdSelect
      allowClear
      maxTagCount={1}
      maxTagTextLength={5}
      placeholder="请选择"

      {...restProps}
    >
      {
        opts.map(({value, label, id, title, name}) => {
          return (
            <AntdSelect.Option key={value || id} value={value|| id}>{title || label || name}</AntdSelect.Option>
          )
        })
      }
    </AntdSelect>
  )
};

export default Select;