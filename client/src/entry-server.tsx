import * as React from 'react'
// import ReactDOMServer from 'react-dom/server'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import App from './App'

export function render(url: string): any {
  // const stream = renderToPipeableStream(
  //   <React.StrictMode>
  //     <StaticRouter location={url}>
  //       <App />
  //     </StaticRouter>
  //   </React.StrictMode>,
  //   options
  // )
  // return stream
  return renderToString(
    <React.StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </React.StrictMode>
  )
}
