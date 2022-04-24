
import React from 'react';
import { func } from 'prop-types';
import { Form, Input, Button, Icon } from 'antd';
import { useHistory } from 'react-router-dom';

const Login = Form.create()(props => {
  const { form, doLogin } = props;
  const history = useHistory();

  const submitHandler = () => {
    form.validateFields().then(values => {
      doLogin(values).then(() => history.push('/'));
    });
  };

  return (
    <Form
      className="form-login"
    >
      <Form.Item
        className="input-name"
      >
        {form.getFieldDecorator('name')(
          <Input placeholder="请输入用户名" prefix={<Icon type="user"/>} />
        )}
      </Form.Item>
      <Form.Item
        className="input-password"
      >
        {form.getFieldDecorator('password')(
          <Input.Password
            placeholder="请输入用户密码"
            prefix={<Icon type="lock"/>}
          />
        )}
      </Form.Item>
      <Form.Item className="btn-submit">
        <Button
          type="primary"
          style={{width: '100%'}}
          onClick={submitHandler}
        >登录</Button>
      </Form.Item>
    </Form>
  );
});

Login.propTypes = {
  doLogin: func,
};

export default Login;
