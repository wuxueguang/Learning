
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Card, Form, Input, Checkbox, Button } from 'antd';
import { observer, PropTypes } from 'mobx-react';
import { tailLayout, styles } from './styles';
import { Spin } from '@/components';

const C = props => {
  const { userInfo } = props;

  const [submitLoading, setSubmitLoading] = useState(false);
  const formProps = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
    onFinish: async () => {
      setSubmitLoading(true);
      userInfo.doLogin({
        name: 'John',
        password: '1114123112'
      });
    }
  };

  switch(userInfo.logined){
  case undefined:
    return <Spin spinning style={{width: '100vw', height: '100vh'}}/>;
  case true:
    return <Redirect to="/" />;
  case false:
    return (
      <div style={styles}>
        <Card>
          <Form
            {...formProps}
          >
            <Form.Item label="用户名">
              <Input />
            </Form.Item>
            <Form.Item label="密码">
              <Input.Password />
            </Form.Item>
            <Form.Item {...tailLayout} name="remember" valuePropName="checked">
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <Form.Item {...tailLayout}>
              <Button
                type="primary"
                htmlType="submit"
                loading={submitLoading}
              >提交</Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    );
  }
};

C.propTypes = {
  userInfo: PropTypes.observableObject,
};

export default observer(C);


