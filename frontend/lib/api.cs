import axios from "axios";
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000/api",
});
export function setToken(t?: string) {
  if (t) api.defaults.headers.common["Authorization"] = `Bearer ${t}`;
  else delete api.defaults.headers.common["Authorization"];
}
// Add these AuthAPI methods if they don't exist
export const AuthAPI = {
  async me() {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No token');
    
    const response = await fetch('/api/auth/me', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) throw new Error('Auth failed');
    return response.json();
  },
  
  async logout() {
    const token = localStorage.getItem('token');
    if (!token) return;
    
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.error('Logout error:', error);
    }
  }
};