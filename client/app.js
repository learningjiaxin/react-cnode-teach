import React from 'react';
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'mobx-react'
import App from './views/App'
import appState from './store/app-state'

const root = document.getElementById('root')
const render = (Component) => {
  ReactDOM.hydrate(
    <Provider appState={appState}>
      <Router>
        <Component />
      </Router>
    </Provider>,
    root,
  )
}
render(App)
if (module.hot) {
  module.hot.accept('./views/App', () => {
    console.log('NextAppNextAppsdfsdfsdf')
    const NextApp = require('./views/App').default
    render(NextApp)
  })
}
