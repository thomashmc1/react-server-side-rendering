
import express from 'express'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { RoutingContext, match } from 'react-router'
import createLocation from 'history/lib/createLocation'
import routes from './client/routes'
import { createStore, combineReducers} from 'redux'
import { Provider } from 'react-redux'
import * as reducers from './client/reducers'
import { applyMiddleware } from 'redux'
import promiseMiddleware from './client/lib/promiseMiddleware'

const app = express();

app.use((req, res) => {
  const location = createLocation(req.url)
  const reducer = combineReducers(reducers)
  const store = applyMiddleware(promiseMiddleware)(createStore)(reducer)

  match({ routes, location}, (err, redirectLocation, renderProps) => {
    if(err){
      return res.status(500).end('Internal Server Error')
    }

    if(!renderProps){
      return res.status(404).end('Not Found')
    }

    const InitialComponent = (
      <Provider store={store}>
        <RoutingContext {...renderProps} />
      </Provider>
    )

    const initialState = store.getState()
    const componentHTML = renderToString(InitialComponent)

    const HTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Isomorphic Redux Demo</title>
          <script type="application/javascript">
            window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
          </script>
        </head>
        <body>
          <div id="react-view"><div>${componentHTML}</div></div>
          <script type="application/javascript" src="/bundle.js"></script>
        </body>
      </html>
    `
    res.end(HTML)
  })

})

export default app
