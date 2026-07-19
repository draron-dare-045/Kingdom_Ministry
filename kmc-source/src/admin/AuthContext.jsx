import { createContext, useContext, useEffect, useState } from 'react'
import { api } from '../api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('kmc_admin_token'))
  const [username, setUsername] = useState(() => localStorage.getItem('kmc_admin_user'))
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    if (!token) {
      setChecking(false)
      return
    }
    api
      .verify()
      .then((res) => {
        if (!res.valid) throw new Error('invalid')
      })
      .catch(() => {
        logout()
      })
      .finally(() => setChecking(false))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const login = async (u, p) => {
    const res = await api.login(u, p)
    localStorage.setItem('kmc_admin_token', res.token)
    localStorage.setItem('kmc_admin_user', res.username)
    setToken(res.token)
    setUsername(res.username)
  }

  const logout = () => {
    localStorage.removeItem('kmc_admin_token')
    localStorage.removeItem('kmc_admin_user')
    setToken(null)
    setUsername(null)
  }

  return (
    <AuthContext.Provider value={{ token, username, isAuthed: Boolean(token), checking, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
