import React, { Component } from 'react'

const hocComponent = (WrappedComponent) => {
  class HocComponent extends Component {
    componentDidMount() {

    }

    proc = (instance) => {
      instance.say()
    }

    handleClick = () => {
      console.log(this.refs.subComp.props)
    }

    render() {
      return (
        <div>
          <button type="button" onClick={this.handleClick.bind(this)}>
            click me
          </button>
          <WrappedComponent {...this.props} ref='subComp' />
        </div>
      )
    }
  }
  return HocComponent
}

export default hocComponent
