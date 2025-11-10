import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { route: '/admin', label: 'Dashboard', icon: 'M3 12l9-9 9 9-9 9-9-9z' },
    { route: '/admin/posts', label: 'Posts', icon: 'M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z' },
    { route: '/admin/categories', label: 'Categories', icon: 'M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z' },
    { route: '/admin/media', label: 'Media', icon: 'M21 19V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14l4-4h12l2 2z' },
    { route: '/admin/users', label: 'Users', icon: 'M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5zm0 2c-5.33 0-8 2.67-8 5v1h16v-1c0-2.33-2.67-5-8-5z' },
    { route: '/admin/settings', label: 'Settings', icon: 'M19.14 12.94a7.5 7.5 0 1 1-7.08-7.08 7.5 7.5 0 0 1 7.08 7.08z' },
  ];

  const isActive = (route: string) => {
    if (route === '/admin') {
      return location.pathname === '/admin';
    }
    return location.pathname.startsWith(route);
  };

  const handleNavigation = (route: string) => {
    navigate(route);
    onClose();
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      <aside 
        className={`fixed lg:static inset-y-0 left-0 w-72 lg:w-auto bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 p-4 z-50 lg:z-auto transition-transform duration-200 ease-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <nav className="space-y-1 text-sm">
          {menuItems.map((item) => (
            <button
              key={item.route}
              onClick={() => handleNavigation(item.route)}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left ${
                isActive(item.route)
                  ? 'bg-slate-100 dark:bg-slate-800'
                  : 'hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d={item.icon}/>
              </svg>
              {item.label}
            </button>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default AdminSidebar;