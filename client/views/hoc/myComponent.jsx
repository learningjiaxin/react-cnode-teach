import React, { Component } from 'react'
import PropTypes from 'prop-types'
import OldComponent from './oldComponent'
import HocComponent from './hocComponent'

class TextAreaComponent extends Component {
  static propTypes = {
    value: PropTypes.string,
    handleChange: PropTypes.func,
  }

  render() {
    const { value, handleChange } = this.props
    return <textarea value={value} onChange={handleChange} />
  }
}

const NewComponent = HocComponent(OldComponent)
const NewTextArea = HocComponent(TextAreaComponent)
export default class MyComponent extends Component {
  componentDidMount() {

  }

  render() {
    return (
      <div>
        <NewComponent />
        <NewTextArea />
      </div>
    )
  }
}
