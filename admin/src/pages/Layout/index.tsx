
import React, { Suspense } from 'react';
import {Layout, Affix , Row, Col} from 'antd';
import Header from '@/components/Header'
import Sider from '@/components/Sider'
import './index.scss';
import Store from "@/store_old";

class LayoutPage extends React.Component {
  render() {
    const { User } = Store.getState();
    if(!User.token){
      return(<div></div>);
    } else {
      return (
        <Layout>
          <Layout.Header>
            <Header User={User}/>
          </Layout.Header>
          <Layout>
            <Layout.Sider>
              <Sider/>
            </Layout.Sider>
            <Layout style={{ padding: '0 24px 24px' }}>
            <Layout.Content className="ant-layout-has-sider">
                <Layout>
                    {this.props.children}
                </Layout>
            </Layout.Content>
            </Layout>
          </Layout>
        </Layout>
      );
    }
  }
}

export default LayoutPage;
