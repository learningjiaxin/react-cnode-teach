import React, { Component } from 'react'
import {
    Link,
} from 'react-router-dom'
import Route from '../cofig/router'

export default class App extends Component {
    componentDidMount() {
        // do something here
    }
    render() {
        return (
            <div>
                <Link to='/' >首页</Link><br />
                <Link to='/detail'>详情页</Link>
                <Route />
            </div>
        )
    }
}
