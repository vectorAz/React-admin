import React, { Component } from 'react'
import { getstorage } from '../../ITPCA/storage'
import users from '../../ITPCA/user'
import { Layout } from 'antd';
import './leftstyle.less';
import './admin.less'
import Left from './left'
import HeadersMain from './HeadersMain'
import {Route,Switch,Redirect } from 'react-router-dom'
import Team from './smallpages/team.jsx'
import Home from './smallpages/home.jsx'
import Category from './category';
import Product from './product/product-menu';
import Role from './role';
import User from './user';
import Line from './charts/line';
import Pie from './charts/pie';
import Bar from './charts/bar';
const {
  Header, Content, Footer, Sider,
} = Layout;
export default class Admin extends Component {

  constructor(props) {
    super(props)
    const user = getstorage();
    
    if ( user && users.id) {
      users.id = user //在内存储存用户信息z

    }
  }

  state = {
    collapsed: false,
    
  };

  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  }

  render() {

    if(!this.user && !users.id){
      return  <Redirect to='/login' />
    }

    const {collapsed}=this.state
   const opacity=collapsed?0:1

    return (
      <Layout style={ { minHeight: '100vh' } }>
         <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={this.onCollapse}
        >
          
          <Left opacity={opacity}/>
        </Sider>
    
    
        <Layout>
          <Header style={ { background: '#fff', padding: 0 ,height:100} } >
          <HeadersMain />

          </Header>

          <Content style={ { margin: '20px 15px 15px 16px' } }>
            <div style={ { padding: 24, background: '#fff', minHeight: 360 } }>
            <Switch>
              <Route path='/home' component={Home} />
              <Route path='/team' component={Team} />
              <Route path='/user' component={User} />
              <Route path="/category" component={Category}/>
              <Route path="/product" component={Product}/>
              <Route path="/role" component={Role}/>
              <Route path="/charts/line" component={Line}/>
              <Route path="/charts/bar" component={Bar}/>
              <Route path="/charts/pie" component={Pie}/>
              <Redirect to='/home' />
            </Switch>
          
           </div>
          </Content>

          <Footer style={ { textAlign: 'center' } }>
            Ant Design ©2018 Created by Ant UED
        </Footer>
        </Layout>
      </Layout>
    )
  }
}
