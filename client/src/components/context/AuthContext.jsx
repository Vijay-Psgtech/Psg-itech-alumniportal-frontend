/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useMemo, useState } from 'react'

const defaultUser = {
  id: 'local-user',
  name: 'Demo User',
  email: 'demo@psgitech.ac.in',
  role: 'admin',
  isAdmin: true,
  department: 'CSE',
  batchYear: new Date().getFullYear(),
}

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('authUser')
    return stored ? JSON.parse(stored) : defaultUser
  })

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      login(nextUser = defaultUser) {
        setUser(nextUser)
        localStorage.setItem('authUser', JSON.stringify(nextUser))
      },
      logout() {
        setUser(null)
        localStorage.removeItem('authUser')
        localStorage.removeItem('token')
      },
      setUser,
    }),
    [user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
