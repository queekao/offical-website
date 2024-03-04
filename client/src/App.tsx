// import axios from 'axios'
import React from 'react'
import { Routes, Route } from 'react-router-dom'
// const NotFound = lazy(() => import('./pages/NotFound'))
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import { ModelContextProvider } from './contexts/ModalContext'
function App(): React.ReactElement {
  // axios.get(`${process.env.REACT_APP_API_URL}`).then(res => {
  //   console.log(res)
  // })

  return (
    <>
      {/* <Suspense fallback={<div>loading...</div>}> */}
      <ModelContextProvider>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </ModelContextProvider>
      {/* </Suspense> */}
    </>
  )
}

export default App
