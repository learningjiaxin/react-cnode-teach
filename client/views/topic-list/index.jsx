import React, { Component } from 'react'
import {
  observer,
  inject,
} from 'mobx-react'
import PropTypes from 'prop-types'
// import { AppState } from '../../store/app-state'

// 定义到provider上叫什么名字这里就叫什么名字
@inject('appState')
@observer
export default class TopicList extends Component {
  constructor() {
    super()
    this.changeName = this.changeName.bind(this)
  }

  componentDidMount() {
    // do something here
  }

  changeName(e) {
    const name = e.target.value
    const { appState } = this.props
    appState.changeName(name)
  }

  bootstrap() {
    console.log(123131312)
    return new Promise((resolve) => {
      const { appState } = this.propTypes
      setTimeout(() => {
        appState.count = 3
        resolve(true)
      })
    })
  }

  render() {
    const { appState } = this.props
    return (
      <div>
        <input type='text' onChange={this.changeName} />
        {appState.msg}
      </div>
    )
  }
}
TopicList.propTypes = {
  appState: PropTypes.object,
}
