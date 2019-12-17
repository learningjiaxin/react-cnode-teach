import React from 'react'
import {
  Link,
} from 'react-router-dom'
import validator from 'validator'
import Routes from '../config/router'


export default class App extends React.Component {
  constructor() {
    super()
    this.textFocus = this.textFocus.bind(this)
  }

  componentDidMount() {
    // do something here
  }

  textFocus = (e) => {
    console.log(e.target.value, 'e.target.value', validator.isEmail(e.target.value))
  }

  render() {
    return (
      <div key="banner">
        <div>
          <Link to="/">首页</Link>
          <br />
          <Link to="/detail">详情页</Link>
          <br />
          <input type="text" name="" id="" onChange={this.textFocus} />
          {/* <button onClick={this.textFocus}>提交</button> */}
        </div>
        <Routes />
      </div>
    )
  }
}
