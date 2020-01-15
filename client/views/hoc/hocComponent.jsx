import React, { Component } from 'react'

const hocComponent = (WrappedComponent) => {
  class HocComponent extends Component {
    constructor() {
      super()
      this.state = {
        value: ''
      }

      this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount() {

    }

    handleChange = (event) => {
      this.setState({
        value: event.target.value
      })
    }

    render() {
      const { value } = this.state
      const newProp = {
        value,
        handleChange: this.handleChange
      }
      return (
        <div>
          <WrappedComponent {...this.props} {...newProp} />
          {value}
        </div>
      )
    }
  }
  return HocComponent
}

export default hocComponent
