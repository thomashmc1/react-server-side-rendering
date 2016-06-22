import React from 'react'
import { Route } from 'react-router'

import App from './components/index.jsx'
import Home from './components/Home'

export default (
  <Route name='app' path='/' component={App}>
    <Route path="home" component={Home} />
  </Route>
)
