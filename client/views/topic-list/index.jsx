import React, { Component } from 'react'
import {
    observer,
    inject,
} from 'mobx-react'
import PropTypes from 'prop-types'
import AppState from '../../store/app-state'

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
        this.props.appState.changeName(e.target.value)
    }

    render() {
        return (
            <div>
                <input type="text" onChange={this.changeName} />
                {this.props.appState.msg}
            </div>
        )
    }
}
TopicList.propTypes = {
    appState: PropTypes.instanceOf(AppState),
}
