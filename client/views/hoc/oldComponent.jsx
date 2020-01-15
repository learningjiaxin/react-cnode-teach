import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class OldComponent extends Component {
  static propTypes = {
    value: PropTypes.string,
    handleChange: PropTypes.func
  }

  componentDidMount() {

  }

  say = () => {
    console.log('hello, this is say')
  }

  render() {
    const { value, handleChange } = this.props
    return (
      <div>
        <input value={value} onChange={handleChange} />
      </div>
    )
  }
}
