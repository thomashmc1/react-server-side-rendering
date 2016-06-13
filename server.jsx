
import express from 'express'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { RoutingContext, match } from 'react-router'
import createLocation from 'history/lib/createLocation'
import routes from 'routes'


const app = express();

app.use((req, res) => {
  const location = createLocation(req.url)

  match({ routes, location}, (err, redirectLocation, renderProps) => {
    if(err){
      console.error(err)
      return res.status(500).end('Internal Server Error')
    }

    if(!renderProps){
      return res.status(404).end('Not Found')
    }
    
    const InitialComponent = (
      <RoutingContext {...renderProps} />
    )

    const componentHTML = renderToString(InitialComponent)

    const HTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Isomorphic Redux Demo</title>
        </head>
        <body>
          <div id="react-view">${componentHTML}</div>
          <script type="application/javascript" src="/bundle.js"></script>
        </body>
      </html>
    `
    res.end(HTML)
  })

})

export default app