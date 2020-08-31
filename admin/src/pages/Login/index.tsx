import React, { Component, Dispatch, useState } from "react";
import { message } from "antd";
import { RouteChildrenProps } from "react-router";
import { connect } from "react-redux";
import DDForm from "@/components/DDForm";
import { UserAction } from "@/actions";
import { UserState } from "@/reducers/user";
import { DDTypes } from "@/components/DDTypes";
import { checkUserPolicy } from '@/components/withUserPolicy';

import "./index.scss";

interface ReduxProps {
  User: UserState;
  dispatch: Dispatch<any>;
}

interface LoginPage {
  props: ReduxProps & RouteChildrenProps;
  state: {
    form: {
      username: string;
      password: string;
      autologin: boolean;
    };
    model: DDTypes.DDDataFields<any>[];
  };
}
@(connect<{}, {}, {}, { User: UserState }>(
  ({ User }) => ({ User }),
  (dispatch: Dispatch<any>) => ({
    dispatch: dispatch
  })
) as any)
class LoginPage extends Component {
  constructor(props: any) {
    super(props);
    this.state = {
      form: {
        username: "",
        password: "",
        autologin: false
      },
      model: [
        {
          type: "string",
          dataIndex: "username",
          title: "用户名",
          key: "username"
        },
        {
          type: "password",
          dataIndex: "password",
          title: "密码",
          key: "password"
        },
        {
          type: "checkbox",
          dataIndex: "autologin",
          title: "自动登录",
          key: "autologin"
        }
      ]
    };
  }

  componentWillMount() {
    const { User } = this.props;
    if (User.token) {
      this.props.history.push("/dashboard");
    }
  }

  async handleLogin(e: React.FormEvent) {
    e.preventDefault();
    const { dispatch } = this.props;
    const { form } = this.state;
    try {
      const result = await UserAction.login(form.username, form.password);
      dispatch(result);
      dispatch(await UserAction.getPermission());
      dispatch(await UserAction.getPolicy(result.user.uid));
      if (!checkUserPolicy('offline_business_pc_web_login')) {
        message.error('无权限访问');
      } else {
        message.success("登录成功");
        if (form.autologin && this.props.User.token) {
          localStorage.setItem(
            "VEER_OFFLINE_AUTO_LOGIN_TOKEN",
            this.props.User.token
          );
          localStorage.setItem(
            "VEER_OFFLINE_PERMISSION",
            JSON.stringify(this.props.User.permission)
          );
          if (this.props.User.user) {
            localStorage.setItem(
              "VEER_OFFLINE_AUTO_LOGIN_USERINFO",
              JSON.stringify(this.props.User.user)
            );
          }
          
        } else {
          sessionStorage.setItem(
            "VEER_OFFLINE_AUTO_LOGIN_TOKEN",
            this.props.User.token || ""
          );
          sessionStorage.setItem(
            "VEER_OFFLINE_AUTO_LOGIN_USERINFO",
            JSON.stringify(this.props.User.user)
          );
          sessionStorage.setItem(
            "VEER_OFFLINE_PERMISSION",
            JSON.stringify(this.props.User.permission) || ''
          );
        }
        window.location.href = "/";
      }
      
    } catch (_) {
      // message.error("网络错误，请稍后再试");
    }
  }

  render() {
    return (
      <div className="veer-offline-login">
        <DDForm
          className="login-box"
          model={this.state.model}
          data={this.state.form}
          name="login"
          panelTitle="VeeR  线下商家管理系统"
          onSubmit={this.handleLogin.bind(this)}
        />
        <div className="veer-offline-login-footer">
          <div className="veer-offline-login-footer-text">
            <span>帮助</span>
            <span>隐私</span>
            <span>条款</span>
          </div>
          <div>
            copyright&nbsp;&nbsp;&copy;&nbsp;&nbsp;2019&nbsp;VeeR &nbsp;VR
          </div>
        </div>
      </div>
    );
  }
}

export default LoginPage;
