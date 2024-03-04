import * as React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import GlobalStyle from './globalStyles'
import { Global } from '@emotion/react'

/**
 *  React will attach to the HTML that exists inside the domNode, and take over managing the DOM inside it.
 *  An app fully built with React will usually only have one hydrateRoot call with its root component
 * */
ReactDOM.hydrateRoot(
  document.getElementById('root') as HTMLDivElement,
  <>
    <React.StrictMode>
      <BrowserRouter>
        <Global styles={GlobalStyle} />
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </>
)
