import React, { Component } from 'react'
import { PlusCircleOutlined } from '@ant-design/icons';
import { Card, Button, Table, Modal, Form, Input } from 'antd'
import {reqAddCategroy} from '../../ajax/index'
import { reqCategroy } from '../../ajax/index'
import './css/categroy.less'


export default class Categroy extends Component {
  state = {
    visible: false,
    categroyArr: []
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = async() => {
    let result = await reqAddCategroy(this.refs.categroyName.getFieldValue().categroyName)
    console.log(result);
    this.setState({
      visible: false,
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  getCategroyInfo = async () => {
    const response = await reqCategroy()
    this.setState({ categroyArr: response.data.reverse() })
  }

  componentDidMount() {
    this.getCategroyInfo()
  }

  render() {
    const { visible } = this.state;
    const { Item } = Form

    const columns = [
      {
        title: '分类名',
        dataIndex: 'name',
      },
      {
        title: '操作',
        align: 'center',
        width: '15%',
        render: () => <Button type='link'>修改分类</Button>
      },
    ];

    return (
      <Card
        className='categroy-card'
        extra={
          <Button
            type='primary'
            shape='round'
            onClick={this.showModal}
          >
            <PlusCircleOutlined />
            添加
          </Button>
        }
      >
        <Table
          rowKey='_id'
          columns={columns}
          dataSource={this.state.categroyArr}
          bordered
          pagination={{ pageSize: 4 }}
        />
        <Modal
          title="添加分类"
          visible={visible}
          okText='确定'
          cancelText='取消'
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          maskClosable={false}
        >
          <Form ref='categroyName'
          // initialValues={}
          >
            <Item
              name='categroyName'
              rules={[
                {
                  required: true,
                  message: '分类名不能为空',
                },
              ]}
            >
              <Input placeholder='请输入分类名' />
            </Item>
          </Form>
        </Modal>

      </Card>
    )
  }
}
