import React, { Component } from 'react'
import { Card, Button, Select, Input, Table, message } from 'antd'
import { SearchOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { PAGE_SIZE } from '../../config'
import { reqProductByPage, reqChangeProductStatus, reqSearchProductByPage } from '../../ajax/index'

const { Option } = Select;


export default class Commodity extends Component {
  state = {
    list: [],
    total: 0,
    loading: false,
    searchType: 'productName',
    keyWord: ''
  }

  handleChange = value => {
    console.log(`selected ${value}`);
  }

  getProductList = async (page) => {
    this.setState({ loading: true })
    const { searchType, keyWord } = this.state
    console.log(searchType, keyWord)
    let result = this.isSearch ? await reqSearchProductByPage(searchType, keyWord, page, PAGE_SIZE) : await reqProductByPage(page, PAGE_SIZE)
    console.log(result)
    const { status, data, msg } = result
    if (status === 0) {
      const { total, list } = data
      this.setState({ list, total, loading: false })
    } else {
      message.error(msg)
      this.setState({ loading: false })
    }
  }

  changeStatus = async (id, currentStatus) => {
    let targetStatus = currentStatus === 1 ? 2 : 1
    let { status, msg } = await reqChangeProductStatus(id, targetStatus)
    if (status === 0) {
      let info = targetStatus === 1 ? '上架' : '下架'
      message.success(`${info}成功`)
      let arr = [...this.state.list]
      arr.forEach(item => {
        if (item._id === id) item.status = targetStatus
      })
      this.setState({ list: arr })
    } else {
      message.error(msg)
    }
  }

  componentDidMount() {
    this.getProductList(1)
  }

  render() {
    const columns = [
      {
        title: '商品名称',
        dataIndex: 'name',
        key: 'name',
        width: '20%',
        align: 'center'
      },
      {
        title: '商品描述',
        dataIndex: 'desc',
        key: 'desc',
        width: '65%',
        align: 'center'
      },
      {
        title: '价格',
        dataIndex: 'price',
        key: 'price',
        align: 'center',
        render: (a) => '￥' + a
      },
      {
        title: '状态',
        key: 'status',
        align: 'center',
        render: (currentObj) => (
          <div>
            <Button onClick={() => { this.changeStatus(currentObj._id, currentObj.status) }} type={currentObj.status === 1 ? 'primary' : 'danger'}>{currentObj.status === 1 ? '下架' : '上架'}</Button>
            <br />
            <span>{currentObj.status === 1 ? '在售' : '售罄'}</span>
          </div>
        )
      },
      {
        title: '操作',
        dataIndex: 'opera',
        key: 'opera',
        align: 'center',
        render: () => (
          <div>
            <Button type='link'>详情</Button>
            <br />
            <Button type='link'>修改</Button>
          </div>
        )
      },
    ];
    return (
      <Card
        className='categroy-card'
        title={
          <div>
            <Select
              defaultValue="productName"
              style={{ width: 120 }}
              onChange={(value) => { this.setState({ searchType: value }) }}
            >
              <Option value="productName">按名称搜索</Option>
              <Option value="productDesc">按描述搜索</Option>
            </Select>
            <Input
              placeholder="请输入搜索关键字"
              style={{ width: '20%', marginLeft: '10px', marginRight: '10px' }}
              onChange={(event) => { this.setState({ keyWord: event.target.value }) }}
            />
            <Button
              type='primary'
              shape='round'
              onClick={() => { this.isSearch = true; this.getProductList(1) }}
            ><SearchOutlined />搜索
            </Button>
          </div>
        }
        extra={<Button
          type='primary'
          shape='round'
        >
          <PlusCircleOutlined />添加商品
        </Button>}
      >
        <Table
          bordered
          dataSource={this.state.list}
          columns={columns}
          rowKey='_id'
          pagination={{
            total: this.state.total,
            pageSize: PAGE_SIZE,
            hideOnSinglePage: true
          }}
          onChange={(pageObj) => {
            this.getProductList(pageObj.current)
          }}
          loading={this.state.loading}
          locale={{
            emptyText:'未查询到相关商品!'
          }}
        />
      </Card>
    )
  }
}
