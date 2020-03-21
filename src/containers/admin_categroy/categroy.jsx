import React, { Component } from 'react'
import { PlusCircleOutlined } from '@ant-design/icons';
import { Card, Button, Table, Modal, Form, Input, message } from 'antd'
import { connect } from 'react-redux'
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
    console.log(categoryObj);
    this.setState({
      visible: true,
    });
  };

  handleOk = async () => {
    const { categoryName } = this.refs.categroyForm.getFieldsValue()
    if (!categoryName) return message.warning('分类名不能为空')
    let result = await reqAddCategory(categoryName)
    const { status, msg } = result
    if (status === 0) {
      this.props.saveCategroy()
      this.setState({ visible: false });
      this.refs.categroyForm.resetFields('')
    } else {
      message.error(msg)
    }
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
    this.refs.categroyForm.resetFields('')
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
        key:'name'
      },
      {
        title: '操作',
        align: 'center',
        width: '15%',
        render: (categoryObj) => <Button onClick={() => {this.showModal(categoryObj)}} type='link'>修改分类</Button>
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
            pageSize: 6,
            showQuickJumper: true,
            hideOnSinglePage: true
          }}
        />
        <Modal
          title="新增分类"
          visible={visible}
          okText='确定'
          cancelText='取消'
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          maskClosable={false}
        >
          <Form ref='categroyForm'
            initialValues={this.name}
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
              <Input ref='inputNode' placeholder='请输入分类名' />
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
