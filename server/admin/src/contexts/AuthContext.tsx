import React, { createContext, useState, useEffect } from 'react'

interface AuthContextType {
  isLogin: boolean
  onLogin: (data: any) => void
  onLogout: () => void
}
interface Props {
  children: React.ReactNode
}
export const AuthContext = createContext<AuthContextType>({
  isLogin: false,
  onLogin: () => {},
  onLogout: () => {}
})
// this <Props> is for defining the type of component
export const AuthContextProvider: React.FC<Props> = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false)
  const getLocal = localStorage.getItem('You logged In') as any
  useEffect(() => {
    if (getLocal) {
      setIsLogin(true)
    }
  }, [])
  const logoutHandler = () => {
    setIsLogin(false)
    localStorage.removeItem('You logged In')
    alert('已登出')
  }
  const loginHandler = (data: any) => {
    setIsLogin(true)
    localStorage.setItem('You logged In', data.data.confirmationCode)
  }

  const contextValue: AuthContextType = {
    isLogin,
    onLogin: loginHandler,
    onLogout: logoutHandler
  }

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  )
}
