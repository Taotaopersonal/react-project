import React, { Component } from 'react'
import Logo from './images/logo.png'
import './css/login.less'
import Loginform from './login_from/login_from';

export default class Login extends Component {

  render() {
    return (
      <div id='login'>
        <header className="login-header">
          <img src={Logo} alt="logoPicture" />
          <h1>商品管理系统</h1>
        </header>
        <div className="login-content">
          <h2>用户登录</h2>
          <Loginform/>
        </div>
      </div>
    )
  }
}

