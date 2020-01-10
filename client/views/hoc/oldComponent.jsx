import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class OldComponent extends Component {
  static propTypes = {
    msg: PropTypes.string,
  }

  componentDidMount() {

  }

  say = () => {
    console.log('hello, this is say')
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
