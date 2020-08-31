import React, { Component, Dispatch, useState } from "react";
import { Layout, Dropdown, Avatar, Icon, Menu, message } from "antd";
import { RouteChildrenProps } from "react-router";
import { connect } from "react-redux";
import DDForm from "@/components/DDForm";
import { UserAction } from "@/actions";
import { UserState } from "@/reducers/user";
import { DDTypes } from "@/components/DDTypes";
import { checkUserPolicy } from '@/components/withUserPolicy';

import "./index.scss";

interface ReduxProps {
  User: UserState
}

interface Header {
  props: ReduxProps;
}

class Header extends Component {
  static defaultProps = {
    User: {}
  }

  logout() {
    localStorage.removeItem("VEER_OFFLINE_AUTO_LOGIN_TOKEN");
    localStorage.removeItem("VEER_OFFLINE_AUTO_LOGIN_USERINFO");
    sessionStorage.removeItem("VEER_OFFLINE_AUTO_LOGIN_TOKEN");
    sessionStorage.removeItem("VEER_OFFLINE_AUTO_LOGIN_USERINFO");
    window.location.href = "/";
  }

  render() {
    console.log(this.props.User)
    const menu = (
      <Menu>
        <Menu.Item key="0">
          <span onClick={this.logout.bind(this)}>退出</span>
        </Menu.Item>
      </Menu>
    );
    return (
      <div className="veer-offline-main-content">
          <div className="veer-offline-section-header-rt">
            <img src="https://assets.veervr.tv/@vrups/db4dce51-5fa9-4e6b-adf5-06c98fe4dc01.png" />
            <Icon
              type="bell"
              className="veer-offline-section-header-rt-brll"
            />
            <Dropdown overlay={menu} trigger={["click"]}>
              <Avatar
                src=""
                className="veer-offline-section-header-rt-avatar"
              />
            </Dropdown>
            <span>
              {this.props.User.user && this.props.User.user.username}
            </span>
          </div>
      </div>
    );
  }
}

export default Header;
