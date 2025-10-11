import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000',
  withCredentials: true, // needed for Sanctum cookies
})

// Call this once before login-protected calls
export async function initCsrf() {
  await api.get('/sanctum/csrf-cookie')
}

export async function login(email, password) {
  await initCsrf()
  return api.post('/api/auth/login', { email, password })
}

export async function logout() {
  return api.post('/api/auth/logout')
}

export async function listPosts(params) {
  return api.get('/api/posts', { params })
}

export async function getPost(id) {
  return api.get(`/api/posts/${id}`)
}

export async function savePost(id, payload) {
  return id ? api.put(`/api/posts/${id}`, payload) : api.post('/api/posts', payload)
}

export default api
