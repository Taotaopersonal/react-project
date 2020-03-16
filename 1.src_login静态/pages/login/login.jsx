import React, { Component } from 'react'
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import Logo from './images/logo.png'
import './css/login.less'

export default class Login extends Component {
  onFinish = values => {
    console.log('表单提交了');
  };

  //自定义校验
  pwdValidator = (rule, value) => {
    if (!value) return Promise.reject('密码不能为空!')
    else if (value.length <= 4) return Promise.reject('密码必须大于4位!')
    else if (value.length >= 12) return Promise.reject('密码必须小于12位!')
    else if(!(/^\w+$/).test(value)) return Promise.reject('密码必须是字母、数字或下划线组成！')
    return Promise.resolve()
  }
  render() {
    /*
    用户名/密码的的合法性要求
      1). 必须输入
      2). 必须大于等于4位
      3). 必须小于等于12位
      4). 必须是字母、数字或下划线组成
  */
    const { Item } = Form
    return (
      <div id='login'>
        <header className="login-header">
          <img src={Logo} alt="logoPicture" />
          <h1>商品管理系统</h1>
        </header>
        <div className="login-content">
          <h1>用户登录</h1>
          <Form
            name="normal_login"
            className="login-form"
            onFinish={this.onFinish}
          >
            <Item
              name='username'
              rules={[
                { required: true, message: '用户名必须输入!' },
                { min: 4, message: '用户名必须大于4位!' },
                { max: 12, message: '用户名必须小于12位!' },
                { pattern: /^\w+$/, message: '用户名必须是字母、数字或下划线组成!' }
              ]}>
              <Input
                prefix={<UserOutlined />} placeholder="用户名" allowClear />
            </Item>

            <Item
              name='password'
              rules={[
                { validator: this.pwdValidator }
              ]}
            >
              <Input
                prefix={<LockOutlined />}
                type="password"
                placeholder="密码"
              />
            </Item>

            <Item>
              <Button type="primary" htmlType="submit" className='login-form-button'>
                登录
               </Button>
            </Item>
          </Form>
        </div>
      </div>
    )
  }
}

