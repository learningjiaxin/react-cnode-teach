import React, { Component } from 'react'
import axios from 'axios'

// 不需要eslint检测
/* eslint-disabled */
export default class TestApi extends Component {
  constructor() {
    super()
    this.getTopics = this.getTopics.bind(this)
    this.login = this.login.bind(this)
    this.markAll = this.markAll.bind(this)
  }

  getTopics = () => {
    axios.get('/api/topics')
      .then((resp) => {
        console.log(resp)
      }).catch((err) => {
        console.error(err)
      })
  }

  login = () => {
    console.log('logingldkjflskj')
    axios.post('/api/user/login', {
      accessToken: 'aac67d0b-bb6e-4061-bf55-9c142cff6659',
    }).then((resp) => {
      console.log(resp, 'login')
    }).catch((err) => {
      console.error(err, 'login')
    })
  }

  markAll = () => {
    axios.post('/api/message/mark_all?needAccessToken=true')
      .then((resp) => {
        console.log(resp)
      }).catch((err) => {
        console.error(err)
      })
  }

  render() {
    return (
      <div>
        <button onClick={this.getTopics} type='button'>topics</button>
        <button onClick={this.login} type='button'>login</button>
        <button onClick={this.markAll} type='button'>markAll</button>
      </div>
    )
  }
}
/* eslint-disabled */
