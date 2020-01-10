import React, { Component } from 'react'

const hocComponent = (WrappedComponent) => {
  class HocComponent extends Component {
    componentDidMount() {

    }

    proc = (instance) => {
      instance.say()
      console.log(instance.props.msg, 'msg')
    }

    render() {
      return <WrappedComponent {...this.props} ref={this.proc} />
    }
  }
  return HocComponent
}

export default hocComponent
