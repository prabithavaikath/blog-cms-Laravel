// src/App.tsx
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

// PUBLIC PAGES
import PublicHome from "./pages/PublicHome";
import PublicPost from "./pages/PublicPost";

// AUTH
import Login from "./pages/auth/Login";

// ADMIN PAGES
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminPosts from './pages/admin/AdminPosts';
import AdminCategories from './pages/admin/AdminCategories';
import AdminMedia from './pages/admin/AdminMedia';
import AdminUsers from './pages/admin/AdminUsers';
import AdminSettings from './pages/admin/AdminSettings';
import AdminLayout from './components/admin/AdminLayout';

// Import your AuthAPI
import { AuthAPI } from "./lib/api";

// PrivateRoute Component
function PrivateRoute({ children }: { children: JSX.Element }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setIsAuthenticated(false);
        return;
      }

      try {
        await AuthAPI.me();
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Auth check failed:', error);
        localStorage.removeItem('token');
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, [location.pathname]);

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export default function App() {    
  const handleLogout = () => {
    AuthAPI.logout().finally(() => {
      window.location.href = '/login';
    });
  };

  return (
    <Routes>
      {/* Public site */}
      <Route path="/" element={<PublicHome />} />
      <Route path="/p/:slug" element={<PublicPost />} />

      {/* Auth */}
      <Route path="/login" element={<Login />} />

      {/* Admin routes */}
      <Route 
        path="/admin/*" 
        element={
          <PrivateRoute>
            <AdminLayout onLogout={handleLogout} />
          </PrivateRoute>
        }
      >
        <Route index element={<Navigate to="posts" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="posts" element={<AdminPosts />} />
        <Route path="categories" element={<AdminCategories />} />
        <Route path="media" element={<AdminMedia />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>

      {/* Redirect legacy /posts to /admin/posts */}
      <Route path="/posts" element={<Navigate to="/admin/posts" replace />} />
      
      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}