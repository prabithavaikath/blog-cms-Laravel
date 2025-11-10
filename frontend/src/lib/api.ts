import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

// Create axios instance - NO withCredentials needed for token-based auth
export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});

// Add token to all requests automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle responses
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      removeToken();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const setToken = (token: string) => {
  localStorage.setItem('token', token);
};

export const removeToken = () => {
  localStorage.removeItem('token');
  delete api.defaults.headers.common['Authorization'];
};

// Auth API - NO CSRF needed!
export const AuthAPI = {
  async login(email: string, password: string) {
    // Direct login request - no CSRF cookie needed
    const response = await api.post('/api/login', { 
      email, 
      password 
    });
    
    return response.data;
  },
  
  async me() {
    const response = await api.get('/api/admin');
    return response.data;
  },
  
  async logout() {
    try {
      await api.post('/api/auth/logout');
    } finally {
      removeToken();
    }
  }
};

// Public API
export const PublicAPI = {
  listPosts: async (page = 1) => {
    const response = await api.get('/public/posts', { params: { page } });
    return response.data;
  },
  
  getPost: async (slug: string) => {
    const response = await api.get(`/public/posts/${slug}`);
    return response.data;
  },
};

// Admin API
export const AdminAPI = {
  posts: {
    list: async () => (await api.get("/api/posts")).data,
    create: async (data: any) => (await api.post("/api/posts", data)).data,
    update: async (id: number, data: any) => (await api.put(`/api/posts/${id}`, data)).data,
    delete: async (id: number) => (await api.delete(`/api/posts/${id}`)).data,
  },
  categories: {
    list: async () => (await api.get("/api/categories")).data,
    create: async (data: any) => (await api.post("/api/categories", data)).data,
    update: async (id: number, data: any) => (await api.put(`/api/categories/${id}`, data)).data,
    delete: async (id: number) => (await api.delete(`/api/categories/${id}`)).data,
  },
};