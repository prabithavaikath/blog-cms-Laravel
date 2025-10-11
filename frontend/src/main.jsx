import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import AppLayout from './layouts/AppLayout.jsx'
import Dashboard from './pages/admin/Dashboard.jsx'
import Posts from './pages/admin/Posts.jsx'
import PostEdit from './pages/admin/PostEdit.jsx'
import './index.css'

const qc = new QueryClient()

const router = createBrowserRouter([
  {
    path: '/admin',
    element: <AppLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'posts', element: <Posts /> },
      { path: 'posts/:id', element: <PostEdit /> },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={qc}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
)
