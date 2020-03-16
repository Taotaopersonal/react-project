import React, { Component } from 'react'
import store from '../redux/store'
import { createIncrementAction, createDecrementAction } from '../redux/count_action_creator'

export default class Count extends Component {

  //加法
  increment = () => {
    //1.获取用户输入
    let { value } = this.refs.numberNode
    store.dispatch(createIncrementAction(value))
  }

  //减法
  decrement = () => {
    let { value } = this.refs.numberNode
    store.dispatch(createDecrementAction(value))
  }

  //当前是奇数在加
  incrementIfOdd = () => {
    let { value } = this.refs.numberNode
    let count = store.getState()
    if (count % 2 === 1) {
      count += value
      store.dispatch(createIncrementAction(value))
    }
  }

  //延迟0.5秒减
  incrementAsync = () => {
    let { value } = this.refs.numberNode
    setTimeout(() => {
      store.dispatch(createDecrementAction(value))
    }, 500)
  }

  render() {
    return (
      <div>
        <h2>当前总数为：{store.getState()}</h2>
        <select ref="numberNode">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>&nbsp;
        <button onClick={this.increment}>+</button>&nbsp;
        <button onClick={this.decrement}>—</button>&nbsp;
        <button onClick={this.incrementIfOdd}>increment if odd</button>&nbsp;
        <button onClick={this.incrementAsync}>increment async</button>
      </div>
    )
  }
}
