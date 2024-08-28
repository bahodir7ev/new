import { createContext, useMemo, useState } from 'react'

export const AuthContext = createContext(null)

function AuthProvider({ children }) {
  const initialToken = localStorage.getItem('token') || ''
  const [token, setToken] = useState(initialToken)

  let isAuth = useMemo(() => {
    return !!token && !!token.trim().length
  }, [token])

  function setUser(token) {
    setToken(token)
    localStorage.setItem('token', token)
  }

  function logout() {
    setToken('')
    localStorage.removeItem('token')
  }

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        token,
        setUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
