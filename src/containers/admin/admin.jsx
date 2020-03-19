import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Switch, Redirect } from 'react-router-dom'
import { Layout } from 'antd';
import Header from '../admin_header/header'
import LeftNav from '../admin_leftNav/leftNav'
import menus from '../../config/menu_config'
import adminChildComponents from '../../config/admin_component_config'
import './css/admin.less'
const { Footer, Sider, Content } = Layout;

class Admin extends Component {

  createRoute = (menuArr) => {
    return menuArr.map(menuObj => {
      if (!menuObj.children) {
        const currentPath = menuObj.path.split('/').reverse()[0]
        const currentComponent = Object.keys(adminChildComponents).find(component => {
          return currentPath === component
        })
        return (
          <Route key={menuObj.key} path={menuObj.path} component={adminChildComponents[currentComponent]} />
        )
      } else {
        return this.createRoute(menuObj.children)
      }
    })
  }

  render() {
    if (!this.props.isLogin) return <Redirect to='/login' />
    return (
      <Layout className='admin-root'>
        <Sider>
          <LeftNav />
        </Sider>
        <Layout>
          <Header />
          <Content className='admin-content'>
            <Switch>
              {this.createRoute(menus)}
              <Redirect to="/admin/home" />
            </Switch>
          </Content>
          <Footer className='admin-footer'>
						<span>推荐使用谷歌浏览器，获取最佳用户体验</span>
          </Footer>
        </Layout>
      </Layout>
    )
  }
}

export default connect(
  state => ({ name: state.userInfo.user.username, isLogin: state.userInfo.isLogin })
)(Admin)