import { useQuery } from '@tanstack/react-query'
import api from '../lib/apiClient'
import { Navigate, useLocation } from 'react-router-dom'

export default function RequireAuth({ children }) {
  const { data, isLoading } = useQuery({
    queryKey: ['me'],
    queryFn: () => api.get('/api/auth/user').then(r => r.data),
  })
  const loc = useLocation()
  if (isLoading) return null
  if (!data) return <Navigate to="/login" state={{ from: loc }} replace />
  return children
}
