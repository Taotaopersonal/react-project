import React, { Component } from 'react'
import {reqCategroy} from '../../ajax/index'

export default class Categroy extends Component {

  getCategroyInfo = async() => {
    const response = await reqCategroy()
    console.log(response);
  }

  render() {
    return (
      <div>
        <button onClick={this.getCategroyInfo}>点我获取商品分类信息</button>
      </div>
    )
  }
}
