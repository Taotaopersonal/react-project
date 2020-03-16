import React, { Component } from 'react'
import CountContainer from './containers/countContainer'
import PersonContainer from './containers/personContainer'

export default class App extends Component {
  render() {
    return (
      <div>
        <CountContainer />
        <PersonContainer/>
      </div>
    )
  }
}
