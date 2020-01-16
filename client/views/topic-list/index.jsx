import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import Button from '@material-ui/core/Button'
import AppState from '../../store/app-state'

@inject('appState') @observer
export default class TopicList extends Component {
  constructor(props) {
    super(props)
    this.changeName = this.changeName.bind(this)
  }

  componentDidMount() {

  }

  bootstrap() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const { appState } = this.props
        appState.changeName('Jokey')
        resolve(true)
      }, 1000)
    })
  }

  changeName(evt) {
    const { appState } = this.props;
    appState.changeName(evt.target.value)
  }

  render() {
    const { appState } = this.props
    return (
      <div>
        <Helmet>
          <title>
            This is topic list
          </title>
          <meta name='description' content='This is description' />
        </Helmet>
        <Button variant="contained" color="primary">
          This is a button
        </Button>
        <input onChange={this.changeName} />
        {appState.msg}
      </div>
    )
  }
}

TopicList.propTypes = {
  appState: PropTypes.instanceOf(AppState)
}
