import React, { Component } from "react";
import ReactDOM from "react-dom";
import { LocaleProvider } from 'antd';
import zhCN from 'antd/es/locale-provider/zh_CN';
import { Provider as StoreProvider } from "react-redux";
import { Route, Redirect, Switch } from "react-router-dom";
import { UserAction } from "@/actions";

let Router;
if (typeof document !== "undefined") {
  Router = require("react-router-dom").BrowserRouter;
} else {
  Router = require("react-router-dom").StaticRouter;
}
import Store from "@/store_old";
import LoginPage from "@/pages/Login";
import Layout from '@/pages/Layout';
import getRouteConfig from './routers';

import "./index.scss";

class AppPage extends Component {

  async componentDidMount() {
    const result = await UserAction.getPermission()
    Store.dispatch(result)
    localStorage.setItem(
      "VEER_OFFLINE_PERMISSION",
      JSON.stringify(result.permission)
    );
    sessionStorage.setItem(
      "VEER_OFFLINE_PERMISSION",
      JSON.stringify(result.permission) || ''
    );
  }

  render() {
    // TO DO 
    // 权限判断
    const authorized = !!Store.getState().User.token;
    if (authorized) {
      return (
        <React.Suspense fallback={<span>loadding...</span>}>
            <Router>
              <Layout>
                <Switch>
                  <Route path="/signin" component={LoginPage} />
                  <Route path="/home" component={() => (
                      <div style={{ padding: '20px' }}>welcome</div>
                    )} />
                  {getRouteConfig().map((route, index) => (
                    <Route key={index} exact {...route} />
                  ))}
                  <Route
                    component={() => (
                      <div style={{ padding: '20px' }}>404, 确保你有相应的权限</div>
                    )}
                  />
                </Switch>
              </Layout>
            </Router>
        </React.Suspense>
      );
    } else {
      return (
        <Router>
          <Switch>
            <Route path="/" component={LoginPage} />
          </Switch>
        </Router>
      )
    }
  }
}
ReactDOM.render(
  <LocaleProvider locale={zhCN}>
    <StoreProvider store={Store}>
      <AppPage />
    </StoreProvider>
  </LocaleProvider>,
  document.getElementById("app")
);
