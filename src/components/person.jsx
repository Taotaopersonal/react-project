import React, { Component } from 'react'

export default class Person extends Component {
  add = () => {
    let {nameNode,ageNode} = this.refs
		this.props.add({name:nameNode.value,age:ageNode.value})
		nameNode.value = ''
		ageNode.value = ''
  }
  render() {
    return (
      <div>
        <h2>当前总人数：{this.props.personCount}  上面的计算总和为:{this.props.count}</h2>
        姓名 <input ref='nameNode' type="text" /> &nbsp;
        年龄 <input ref='ageNode' type="text" /> &nbsp;
        <button onClick={this.add}>添加</button>
        
        <ul>
          {this.props.persons.map((personObj,index) => {
            return <li key={index}>姓名：{personObj.name} 年龄：{personObj.age}</li>
          })}
        </ul>
      </div>
    )
  }
}
