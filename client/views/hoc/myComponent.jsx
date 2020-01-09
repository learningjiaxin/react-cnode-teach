import React, { Component } from 'react'
import OldComponent from './oldComponent'
import HocComponent from './hocComponent'

const NewComponent = HocComponent(OldComponent)
export default class MyComponent extends Component {
  componentDidMount() {

  }

  render() {
    return <NewComponent msg="hello" />
  }
}
