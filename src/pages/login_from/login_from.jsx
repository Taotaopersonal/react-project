import React, { Component } from 'react'
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

export default class Loginform extends Component {
  render() {
    return (
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={this.onFinish}
      >
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: '用户名为空!',
            },
          ]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: '密码为空!',
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="密码"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>记住密码</Checkbox>
          </Form.Item>

          <a className="login-form-forgot" href="#1">
            忘记密码
        </a>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            登录
        </Button>
        或者 <a href="#1">点我注册</a>
        </Form.Item>
      </Form>
    )
  }
}

