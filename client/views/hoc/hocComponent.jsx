import React, { Component } from 'react'

const hocComponent = (WrappedComponent) => {
  class HocComponent extends Component {
    render() {
      return <WrappedComponent {...this.props} />
    }
  }
  return HocComponent
}

export default hocComponent
