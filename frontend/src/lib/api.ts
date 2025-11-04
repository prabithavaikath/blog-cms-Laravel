// src/lib/api.ts
import axios from "axios";

export const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8000/api";

export const api = axios.create({ baseURL: API_URL });

export function setToken(token?: string) {
  if (token) api.defaults.headers.common.Authorization = `Bearer ${token}`;
  else delete api.defaults.headers.common.Authorization;
}

// auto-attach saved token
const saved = localStorage.getItem("token");
if (saved) setToken(saved);

// 401 → clear token and kick to /login
api.interceptors.response.use(
  (r) => r,
  (err) => {
    if (err?.response?.status === 401) {
      localStorage.removeItem("token");
      setToken(undefined);
      if (location.pathname !== "/login") location.href = "/login";
    }
    return Promise.reject(err);
  }
);

// —— Public endpoints for the blog ——
export const PublicAPI = {
  listPosts: async (page = 1) =>
    (await api.get("/public/posts", { params: { page } })).data,
  getPost: async (slug: string) =>
    (await api.get(`/public/posts/${slug}`)).data,
};

// —— Auth endpoints for admin ——
export const AuthAPI = {
  login: async (email: string, password: string) =>
    (await api.post("/auth/login", { email, password })).data,
  me: async () => (await api.get("/auth/me")).data,
};
