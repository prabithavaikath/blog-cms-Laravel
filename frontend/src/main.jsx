import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import AuthProvider, { useAuth } from './context/AuthContext'
import Home from './pages/Home'
import PostDetail from './pages/PostDetail'
import Login from './pages/Login'
import AdminPosts from './pages/AdminPosts'
import NewPost from './pages/NewPost'
import './index.css'

const qc = new QueryClient();

function Private({ children }) {
  const { user, ready } = useAuth();
  if (!ready) return null;
  return user ? children : <Navigate to="/login" replace />;
}

const router = createBrowserRouter([
  { path: '/', element: <Home/> },
  { path: '/post/:slug', element: <PostDetail/> },
  { path: '/login', element: <Login/> },
  { path: '/admin/posts', element: <Private><AdminPosts/></Private> },
  { path: '/admin/posts/new', element: <Private><NewPost/></Private> },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={qc}>
      <AuthProvider>
        <RouterProvider router={router}/>
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
)
