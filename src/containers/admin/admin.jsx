import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createDeleteUserInfoAction } from '../../redux/actions/login'
import { Redirect } from 'react-router-dom'
import { Layout } from 'antd';
import Header from './admin_header/header'
import './css/admin.less'
const { Footer, Sider, Content } = Layout;


class Admin extends Component {
  logOut = () => {
    this.props.logout()
  }
  render() {
    if (!this.props.isLogin) return <Redirect to='/login' />
    return (
      // <div>
      //   <h1>欢迎,{this.props.name}</h1>
      //   <button onClick={this.logOut}>退出登录</button>
      // </div>
      <Layout className='admin-root'>
        <Sider className='admin-sider'>Sider</Sider>
        <Layout>
          <Header/>
          <Content>Content</Content>
          <Footer>Footer</Footer>
        </Layout>
      </Layout>
    )
  }
}

export default connect(
  state => ({ name: state.userInfo.user.username, isLogin: state.userInfo.isLogin }),
  { logout: createDeleteUserInfoAction }
)(Admin)