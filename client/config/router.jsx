import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import TopicList from '../views/topic-list/index'
import TopicDetail from '../views/topic-detail/index'
import ApiTest from '../views/test/api-test'
import MyComponent from '../views/hoc/myComponent'

export default () => [
  <Route path="/" exact render={() => <Redirect to="/list" />} key="first" />,
  <Route path="/list" component={TopicList} key="list" />,
  <Route path="/detail" component={TopicDetail} key="detail" />,
  <Route path="/test" component={ApiTest} key="test" />,
  <Route path="/hoc" component={MyComponent} key="hoc" />
]
