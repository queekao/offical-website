// import { useEffect, useState, ChangeEvent, useRef } from 'react'
import { useContext } from 'react'
import LoginForm from './components/LoginForm'
// import MyLogoutButton from './MyLogoutButton'
import { AuthContext } from './contexts/AuthContext'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ConfirmationPage from './pages/Confirmation'
import Header from './components/Navbar'
import PageContent from './pages/PageContent'
import ProfileCardContent from './components/ProfileCardContent'
function App() {
  const context = useContext(AuthContext)

  return (
    <>
      {context.isLogin && <Header />}
      <Routes>
        {!context.isLogin ? (
          <>
            <Route path="/" index element={<LoginForm />} />
            <Route
              path="/auth/:confirmation"
              index
              element={<ConfirmationPage />}
            />
          </>
        ) : (
          ''
        )}
        {context.isLogin && (
          <>
            <Route path="/" index element={<Home />} />
            <Route path="/content/:path" index element={<PageContent />} />
            <Route
              path="/content/:path/:id"
              index
              element={<ProfileCardContent />}
            />
          </>
        )}
      </Routes>
    </>
  )
}

export default App
