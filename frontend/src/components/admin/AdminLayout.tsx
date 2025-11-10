import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import AdminTopbar from './AdminTopbar';

interface AdminLayoutProps {
  onLogout?: () => void;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ onLogout }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <AdminTopbar onMenuToggle={() => setSidebarOpen(!sidebarOpen)} onLogout={onLogout} />
      
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 grid lg:grid-cols-[260px_1fr] gap-6">
        <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="min-h-[70vh]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;