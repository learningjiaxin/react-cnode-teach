import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class OldComponent extends Component {
  propTypes = {
    msg: PropTypes.string,
  }

  componentDidMount() {

  }

  render() {
    const { msg } = this.props
    return (
      <div>
        HocComponent
        {msg}
      </div>
    )
  }
}
