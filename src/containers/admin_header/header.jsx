import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Modal, Button } from 'antd'
import { FullscreenOutlined, FullscreenExitOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import screenfull from 'screenfull'
import dayjs from 'dayjs'
import { createDeleteUserInfoAction } from '../../redux/actions/login'
import { createSaveTitleAction } from '../../redux/actions/header'
import { createDeleteCategroyAction } from '../../redux/actions/categroy'
import './css/header.less'
import { reqWeather } from '../../ajax'
const { confirm } = Modal;


class Header extends Component {
  state = {
    isFull: false,
    date: dayjs().format('YYYY年 MM月 DD日 HH:mm:ss'),
    dayPictureUrl: '',
    weather: '',
    temperature: ''
  }

  fullScreen = () => {
    screenfull.toggle()
  }

  logOut = () => {
    confirm({
      title: '确定退出吗?',
      icon: <ExclamationCircleOutlined />,
      content: '退出前请保存信息',
      cancelText: '取消',
      okText: '确定',
      onOk: () => {
        this.props.logout()
        this.props.deleteTitle('')
        this.props.deleteCategroy()
      }
    });

  }

  getWeather = async () => {
    const { dayPictureUrl, weather, temperature } = await reqWeather()
    this.setState({ dayPictureUrl, weather, temperature })
  }

  componentDidMount() {
    screenfull.onchange(() => {
      let isFull = !this.state.isFull
      this.setState({ isFull })
    })

    this.timer = setInterval(() => {
      this.setState({ date: dayjs().format('YYYY年 MM月 DD日 HH:mm:ss') })
    }, 1000)

    this.getWeather()
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  render() {
    const { isFull, date, dayPictureUrl, weather, temperature } = this.state
    return (
      <header className='header'>
        <div className="header-top">
          <Button onClick={this.fullScreen} size='small'>
            {isFull ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
          </Button>
          <span className='user'>欢迎,{this.props.name}</span>
          <Button onClick={this.logOut} type="link">退出登录</Button>
        </div>
        <div className="header-bottom">
          <div className="header-bottom-left">
            <h1>{this.props.title}</h1>
          </div>
          <div className="header-bottom-right">
            <span>{date}</span>
            <img src={dayPictureUrl} alt="pic" />
            <span>{weather} 温度: {temperature}</span>
          </div>
        </div>
      </header>
    )
  }
}

export default connect(
  state => ({ name: state.userInfo.user.username, title: state.title }),
  {
    logout: createDeleteUserInfoAction,
    deleteTitle: createSaveTitleAction,
    deleteCategroy:createDeleteCategroyAction
  }
)(Header)