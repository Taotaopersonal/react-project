import React, { Component } from 'react'
import { PlusCircleOutlined } from '@ant-design/icons';
import { Card, Button, Table, Tag } from 'antd'
import { reqCategroy } from '../../ajax/index'
import './css/categroy.less'

const { Column, ColumnGroup } = Table;

export default class Categroy extends Component {

  getCategroyInfo = async () => {
    const response = await reqCategroy()
    console.log(response);
  }

  render() {

    const data = [
      {
        key: '1',
        firstName: 'John',
        lastName: 'Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        tags: ['nice', 'developer'],
      },
      {
        key: '2',
        firstName: 'Jim',
        lastName: 'Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        tags: ['loser'],
      },
      {
        key: '3',
        firstName: 'Joe',
        lastName: 'Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
      },
    ];
    return (
      <Card className='card'
        bordered
        extra={<Button type="primary" shape="round" icon={<PlusCircleOutlined />}>添加</Button>}
        onTabChange={key => {
          this.onTabChange(key, 'key');
        }}
      >
        <Table dataSource={data}>
          <ColumnGroup title="Name">
            <Column title="First Name" dataIndex="firstName" key="firstName" />
            <Column title="Last Name" dataIndex="lastName" key="lastName" />
          </ColumnGroup>
          <Column title="Age" dataIndex="age" key="age" />
          <Column title="Address" dataIndex="address" key="address" />
          <Column
            title="Tags"
            dataIndex="tags"
            key="tags"
            render={tags => (
              <span>
                {tags.map(tag => (
                  <Tag color="blue" key={tag}>
                    {tag}
                  </Tag>
                ))}
              </span>
            )}
          />
          <Column
            title="操作"
            align='center'
            key="action"
            render={(text, record) => (
              <span>
                <Button style={{ marginRight: 16 }}>Invite {record.lastName}</Button>
                <Button>添加分类</Button>
              </span>
            )}
          />
        </Table>
      </Card>
    )
  }
}
