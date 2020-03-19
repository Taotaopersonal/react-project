import React, { Component } from 'react'
import { Menu } from 'antd';
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { createSaveTitleAction } from '../../redux/actions/header'
import menus from '../../config/menu_config'
import logo from '../../static/images/logo.png'
import './css/leftNav.less'
const { Item, SubMenu } = Menu

class LeftNav extends Component {

  saveTitle = (title) => {
    this.props.save(title)
  }

  //通过当前路径信息获取当前header中应该展示的标题
  getTitleByPath = () => {
    let title = ''
    let key = this.props.location.pathname.split('/').reverse()[0]
    if(key === 'admin') key = 'home'
    menus.forEach(menuObj => {
      if (menuObj.children instanceof Array) {
        let result = menuObj.children.find(childObj => {
          return childObj.key === key
        })
        if (result) title = result.title
      } else {
        if (menuObj.key === key) title = menuObj.title
      }
    })
    this.props.save(title)
  }

  /* 通过外部菜单配置文件遍历动态生成菜单对象 */
  createMenu = menuArr => {
    return menuArr.map(menuObj => {
      if (!menuObj.children) {
        return (
          <Item key={menuObj.key} onClick={() => { this.props.save(menuObj.title) }} >
            <Link to={menuObj.path} >
              <menuObj.icon />
              <span style={{ marginLeft: '10px' }}>{menuObj.title}</span>
            </Link>
          </Item>
        )
      } else {
        return (
          <SubMenu
            key={menuObj.key}
            title={
              <span>
                <menuObj.icon />
                <span>{menuObj.title}</span>
              </span>
            }
          >
            {this.createMenu(menuObj.children)}
          </SubMenu >
        )
      }
    })
  }

  componentDidMount() {
    this.getTitleByPath()
  }

  render() {
    const currentArr = this.props.location.pathname.split('/')
    const currentPath = currentArr.reverse()[0]
    return (
      <div className='leftNav' >
        <header className='leftNav-header'>
          <img src={logo} alt="pic" />
          <h1 className='leftNav-header-title'>商品管理系统</h1>
        </header>
        <div>
          <Menu
            selectedKeys={[currentPath]} //一上来就选中谁
            defaultOpenKeys={currentArr}//默认展开哪个菜单
            mode="inline"//内嵌模式
            theme="dark"//暗色主题
          >
            {this.createMenu(menus)}
          </Menu>
        </div>
      </div >
    );
  }
}

export default connect(
  state => ({}),
  { save: createSaveTitleAction }
)(withRouter(LeftNav))