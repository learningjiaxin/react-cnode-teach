import React from 'react';
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'mobx-react'
import App from './views/App'
import AppState from './store/app-state'

const root = document.getElementById('root')
const render = (Component) => {
  ReactDOM.hydrate(
    <Provider appState={new AppState()}>
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
    const NextApp = require('./views/App').default
    render(NextApp)
  })
}
