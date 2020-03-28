import React, { Component } from 'react'
import { PlusCircleOutlined } from '@ant-design/icons';
import { Card, Button, Table, Modal, Form, Input, message } from 'antd'
import { connect } from 'react-redux'
import {PAGE_SIZE} from '../../config'
import { createSaveCategroyAsyncAction } from '../../redux/actions/categroy'
import { reqAddCategory, reqUpdateCategory } from '../../ajax/index'
import './css/categroy.less'
const { Item } = Form

class Categroy extends Component {
  state = {
    visible: false,
  };

  componentDidMount() {
    this.props.saveCategroy()
  }

  showModal = (categoryObj) => {
    const { _id, name } = categoryObj
    if (_id && name) {
      this.id = _id
      this.name = name
      this.isUpdate = true
      this.setState({
        visible: true,
      });
      if(this.refs.categroyForm) this.refs.categroyForm.setFieldsValue({categoryName:name})
    } else {
      this.setState({
        visible: true,
      });
    }
  };

  handleOk = async () => {
    const { categoryName } = this.refs.categroyForm.getFieldsValue()
    if (!categoryName) return message.warning('分类名不能为空')
    let result
    this.isUpdate ? result = await reqUpdateCategory(this.id,categoryName) : result = await reqAddCategory(categoryName)
    const { status, msg } = result
    if (status === 0) {
      message.success(this.isUpdate ? '修改分类成功！' : '添加分类成功！')
      this.props.saveCategroy()
      this.handleCancel()
    } else {
      message.error(msg)
    }
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
    setTimeout(()=>{
      this.isUpdate=false
      this.refs.categroyForm.setFieldsValue({categoryName:''})
    },100)
  };

  UpdateCategoryList = (id, name) => {
    reqUpdateCategory(id, name)
  }

  render() {
    const { visible } = this.state;

    const columns = [
      {
        title: '分类名',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: '操作',
        align: 'center',
        width: '15%',
        render: (categoryObj) => <Button onClick={() => { this.showModal(categoryObj) }} type='link'>修改分类</Button>
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
            <PlusCircleOutlined />添加
          </Button>
        }
      >
        <Table
          rowKey='_id'
          columns={columns}
          dataSource={this.props.categroyArr}
          bordered
          loading={this.state.isLoading}
          pagination={{
            pageSize: PAGE_SIZE,
            showQuickJumper: true,
            hideOnSinglePage: true
          }}
        />
        <Modal
          title={this.isUpdate ? '修改分类' : '新增分类'}
          visible={visible}
          okText='确定'
          cancelText='取消'
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          maskClosable={false}
        >
          <Form ref='categroyForm'
          // 表单默认值，只有初始化以及重置时生效
            initialValues={{
              categoryName:this.name
            }}
          >
            <Item
              name='categoryName'
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


export default connect(
  state => ({ categroyArr: state.categroyList }),
  { saveCategroy: createSaveCategroyAsyncAction }
)(Categroy)
