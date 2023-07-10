import * as React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
/**
 *  React will attach to the HTML that exists inside the domNode, and take over managing the DOM inside it.
 *  An app fully built with React will usually only have one hydrateRoot call with its root component
 * */
ReactDOM.hydrateRoot(
  document.getElementById('root') as HTMLDivElement,
  <>
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </>
)
