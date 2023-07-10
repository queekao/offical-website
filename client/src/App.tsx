// import axios from 'axios'
import React from 'react'
import { Routes, Route } from 'react-router-dom'
// const NotFound = lazy(() => import('./pages/NotFound'))
import NotFound from './pages/NotFound'
function App(): React.ReactElement {
  // axios.get(`${process.env.REACT_APP_API_URL}`).then(res => {
  //   console.log(res)
  // })

  return (
    <>
      {/* <Suspense fallback={<div>loading...</div>}> */}
      <Routes>
        <Route path="/" element={<NotFound />}>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      {/* </Suspense> */}
    </>
  )
}

export default App
