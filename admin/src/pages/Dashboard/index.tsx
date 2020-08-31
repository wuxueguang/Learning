import React from "react";
import { Layout, Menu, Icon, Avatar, Dropdown, Drawer } from "antd";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { MiscTypes, ZoneTypes } from "@/types";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { RouteChildrenProps } from "react-router";
import PanelPage from "./panel";
import DetailPanelPage from "./detailPanel";
import SharedPage from '@/pages/Dashboard/Shared';
import CatalogsPanelPage from '../CatalogsPanel';
// import PricePanelPage from '../PricePanel';
import "./index.scss";
import { UserState } from "@/reducers/user";
import { ZoneAction, MenuAction, BusinessAction, UserAction } from "@/actions";
import { ZonesState } from "@/reducers/zones";
import { MenuState } from "@/reducers/menu";
import BusinessManage from "@/components/business/manage";

interface ReduxProps {
  User: UserState;
  Zones: ZonesState;
  Menu: MenuState;
  dispatch: Dispatch<any>;
}

interface DashboardPageProps {}

interface DashboardPage {
  props: ReduxProps & DashboardPageProps & RouteChildrenProps;
  state: {
    menu: MiscTypes.MenusItem[];
    menufold: boolean;
    mobileShowNav: boolean;
    mobileDraw: boolean;
    showSider: boolean;
    per: number;
    page: number;
  };
}
@(connect<{}, {}, {}, { User: UserState; Zones: ZonesState; Menu: MenuState }>(
  ({ User, Zones, Menu }) => ({ User, Zones, Menu }),
  dispatch => ({ dispatch })
) as any)
class DashboardPage extends React.Component {
  constructor(props: DashboardPageProps) {
    super(props);
    this.state = {
      menu: [],
      menufold: false,
      mobileShowNav: false,
      mobileDraw: false,
      showSider: false,
      per: 10,
      page: 1
    };
  }
  scroll: any = null;

  _debounce(fn, time) {
    let timer: any = null;
    return () => {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      timer = setTimeout(() => {
        fn.call(this);
        timer = null;
      }, time);
    };
  }
  onScroll() {
    this.scroll = this._debounce(this.scrollLazyLoad, 500);
    document.addEventListener("scroll", this.scroll);
  }

  async scrollLazyLoad() {
    let { current_page, total_page } = this.props.Zones.pagination!;
    if (current_page > total_page) {
      return;
    }
    const { per } = this.state;
    let num;
    let appHeight = document.getElementById("app")!.clientHeight;
    let scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;
    if (appHeight <= window.innerHeight + scrollTop) {
      num = current_page + 1;
      this.props.dispatch(await ZoneAction.get(per, num));
      // const result = await BusinessAction.get();
      // this.props.dispatch(result);
      this.props.dispatch(MenuAction.get());
      
    }
  }

  onResize() {
    this.setState({
      showSider: true
    });
    const _throttle = this._throttle();
    const _this = this;
    window.addEventListener("resize", () => {
      _throttle(_this.adaptWindow.bind(_this), 30);
    });
  }
  closeMobileDraw() {
    this.setState({
      mobileShowNav: false
    });
  }
  adaptWindow() {
    let width = window.innerWidth;
    if (width > 576) {
      this.setState({
        mobileDraw: false
      });
      if (width > 992) {
        this.state.menufold &&
          this.setState({
            menufold: false
          });
      } else {
        this.setState({
          menufold: true
        });
      }
    } else {
      this.setState({
        mobileDraw: true
      });
    }
  }
  removeScroll() {
    document.removeEventListener("scroll", this.scroll);
    this.scroll = null;
  }
  logout() {
    localStorage.removeItem("VEER_OFFLINE_AUTO_LOGIN_TOKEN");
    localStorage.removeItem("VEER_OFFLINE_AUTO_LOGIN_USERINFO");
    sessionStorage.removeItem("VEER_OFFLINE_AUTO_LOGIN_TOKEN");
    sessionStorage.removeItem("VEER_OFFLINE_AUTO_LOGIN_USERINFO");
    window.location.href = "/";
  }
  _throttle() {
    let timer: any;
    return (fn: any, t: number) => {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      timer = setTimeout(() => {
        fn.call();
        timer = null;
      }, t);
    };
  }

  async componentWillMount () {
    const { User } = this.props;
    if (User.user && User.user.uid) {
      this.props.dispatch(await UserAction.getPolicy(User.user.uid));
    }
    console.log('load~');
    
  }
  
  async componentDidMount() {
    const { dispatch } = this.props;
    const { per, page } = this.state;
    this.adaptWindow();
    this.onResize();
    if (/dashboard$/.test(location.pathname)) {
      this.onScroll();
    } else {
      document.removeEventListener("scroll", this.scroll);
      this.scroll = null;
    }
    try {
      this.props.dispatch(ZoneAction.clean());
      const result = await BusinessAction.get();
      this.props.dispatch(result);
      this.props.dispatch(await ZoneAction.get(per, page));
      this.props.dispatch(MenuAction.get());
      
    } catch (_) {
      console.log(_);
    }
    
  }
  async componentWillReceiveProps(nextProps: any) {
    const { per, page } = this.state;
    if (/dashboard$/.test(location.pathname)) {
      if (!this.scroll) {
        this.onScroll();
        this.props.dispatch(ZoneAction.clean());
        this.props.dispatch(await ZoneAction.get(per, page));
        this.props.dispatch(MenuAction.get());
      }
    } else {
      this.removeScroll();
    }
  }

  componentWillUnmount() {
    this.removeScroll();
  }

  renderMenu(menu: MiscTypes.MenusItem[]): React.ReactNode {
    return menu.map(e => {
      if (e.children) {
        let Instance = Menu.SubMenu;
        return (
          <Instance
            key={e.flag}
            title={
              <span>
                <Link
                  to={{ pathname: "/dashboard" }}
                  onClick={() => {
                    this.props.dispatch(MenuAction.change(e.flag || ""));
                  }}
                >
                  {e.type ? <Icon type={e.type} /> : ""}
                  <span>{e.name}</span>
                </Link>
              </span>
            }
          >
            {this.renderMenu(e.children)}
          </Instance>
        );
      } else {
        return (
          <Menu.Item key={e.flag}>
            {e.type ? <Icon type={e.type} /> : ""}
            <span>
              <Link
                to={{
                  pathname:
                    "/dashboard" +
                    (/^\//.test(e.target) ? e.target : "/" + e.target) +
                    (e.param && e.param!.id ? "/" + e.param!.id : ""),
                  state: e.param
                }}
                onClick={() => {
                  this.props.dispatch(MenuAction.change(e.flag || ""));
                }}
              >
                {e.name}
              </Link>
            </span>
          </Menu.Item>
        );
      }
    });
  }

  render() {
    let { menufold, mobileShowNav, mobileDraw, showSider } = this.state;
    const { select, Menuitem } = this.props.Menu;
    const menu = (
      <Menu>
        <Menu.Item key="0">
          <span onClick={this.logout.bind(this)}>退出</span>
        </Menu.Item>
      </Menu>
    );
    return (
      <Router>
        <Layout>
          {mobileDraw ? (
            <Drawer
              placement={"left"}
              closable={false}
              onClose={this.closeMobileDraw.bind(this)}
              visible={mobileShowNav}
            >
              <Layout.Sider>
                <div className="logo">
                  <Link to={{ pathname: "/dashboard" }}>
                    <img src="https://assets.veervr.tv/@vrups/db4dce51-5fa9-4e6b-adf5-06c98fe4dc01.png" />
                    <span>VeeR</span>
                  </Link>
                </div>
                <Menu
                  theme="dark"
                  mode="inline"
                  className="veer-offline-aside-menus"
                  selectedKeys={[select || ""]}
                >
                  {this.renderMenu(Menuitem)}
                </Menu>
              </Layout.Sider>
            </Drawer>
          ) : (
            ""
          )}

          {!mobileDraw && showSider ? (
            <Layout.Sider collapsed={menufold}>
              <div className="logo">
                <Link to={{ pathname: "/dashboard" }}>
                  <img src="https://assets.veervr.tv/@vrups/db4dce51-5fa9-4e6b-adf5-06c98fe4dc01.png" />
                  <span>VeeR</span>
                </Link>
              </div>
              <Menu
                theme="dark"
                mode="inline"
                className="veer-offline-aside-menus"
                selectedKeys={[select || ""]}
              >
                {this.renderMenu(Menuitem)}
              </Menu>
              )}
            </Layout.Sider>
          ) : (
            ""
          )}
          <Layout className="veer-offline-main-content">
            <Layout.Header>
              <Icon
                className="veer-offline-main-content-header-icon"
                type={`${menufold ? "menu-unfold" : "menu-fold"}`}
                onClick={() => {
                  if (mobileDraw) {
                    this.setState({
                      mobileShowNav: !mobileShowNav
                    });
                  } else {
                    this.setState({
                      menufold: !menufold
                    });
                  }
                }}
              />
              <div className="veer-offline-section-header-rt">
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
            </Layout.Header>
            <Layout.Content>
              <Route exact path="/dashboard" component={PanelPage} />
              <Route exact path="/dashboard/settings" component={BusinessManage} />
              <Route exact path="/dashboard/zone/:id/catalogs" component={CatalogsPanelPage} />
              {/* <Route exact path="/dashboard/zone/:id/price" component={PricePanelPage} /> */}
              <Route exact path="/dashboard/zone/:id" component={DetailPanelPage} />
              <Route exact path="/dashboard/shared" component={SharedPage} />
            </Layout.Content>
            <Layout.Footer />
          </Layout>
        </Layout>
      </Router>
    );
  }
}

export default DashboardPage as React.ComponentClass<DashboardPageProps>;
