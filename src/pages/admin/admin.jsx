import React, { Component } from 'react'
import { getstorage } from '../../ITPCA/storage'
import users from '../../ITPCA/user'
import { Layout } from 'antd';
import './leftstyle.less';
import './admin.less'
import Left from './left'

import {Route } from 'react-router-dom'
import Team from './smallpages/team.jsx'
import Home from './smallpages/home.jsx'
import User from './smallpages/user.jsx'

const {
  Header, Content, Footer, Sider,
} = Layout;
export default class Admin extends Component {

  constructor(props) {
    super(props)
    const user = getstorage();
    if (!user || !user._id) {
      return this.props.history.push('/login')
    }
    users.id = user //在内存储存用户信息
  }

  state = {
    collapsed: false,
    
  };

  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  }

  render() {
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
          <Header style={ { background: 'gray', padding: 0 } } />

          <Content style={ { margin: '20px 15px 15px 16px' } }>
            <div style={ { padding: 24, background: '#fff', minHeight: 360 } }>

              <Route path='/home' component={Home} />
              <Route path='/team' component={Team} />
              <Route path='/user' component={User} />
          
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
