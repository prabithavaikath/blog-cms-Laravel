import { createContext, useContext, useEffect, useState } from 'react'
import api, { setAuthToken } from '../lib/api'

const AuthCtx = createContext(null)
export const useAuth = () => useContext(AuthCtx)

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [ready, setReady] = useState(false) // same as your "ready"

  // On app start: attach token (if any) BEFORE calling /api/me
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      setReady(true)
      return
    }
    setAuthToken(token)
    api.get('/api/me')
      .then(res => setUser(res.data))
      .catch(() => {
        // token invalid/expired → clear it
        localStorage.removeItem('token')
        setAuthToken(null)
        setUser(null)
      })
      .finally(() => setReady(true))
  }, [])

  const login = async (email, password) => {
    // No CSRF in token flow
    const { data } = await api.post('/api/auth/login', { email, password })
    // Persist and attach token for subsequent requests
    localStorage.setItem('token', data.token)
    setAuthToken(data.token)
    const me = await api.get('/api/me')
    setUser(me.data)
  }

  const logout = async () => {
    try { await api.post('/api/auth/logout') } catch {}
    localStorage.removeItem('token')
    setAuthToken(null)
    setUser(null)
  }

  return (
    <AuthCtx.Provider value={{ user, login, logout, ready }}>
      {children}
    </AuthCtx.Provider>
  )
}
