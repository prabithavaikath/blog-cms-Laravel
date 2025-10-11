import React, { useEffect, useState } from 'react'
import api from '../lib/api'

function Dashboard() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      api.defaults.headers.common.Authorization = `Bearer ${token}`
      api.get('/api/me').then(res => setUser(res.data))
    }
  }, [])

  return <div>{user ? `Hi, ${user.name}` : 'Loading...'}</div>
}

export default Dashboard
