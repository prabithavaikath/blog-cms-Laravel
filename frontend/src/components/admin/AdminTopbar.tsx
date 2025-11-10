import React, { useState, useEffect } from 'react';

interface AdminTopbarProps {
  onMenuToggle: () => void;
  onLogout?: () => void;
}

const AdminTopbar: React.FC<AdminTopbarProps> = ({ onMenuToggle, onLogout }) => {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem('adminTheme');
    const isDark = storedTheme === 'dark' || (!storedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
    setDarkMode(isDark);
    
    if (isDark) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    localStorage.setItem('adminTheme', newDarkMode ? 'dark' : 'light');
  };

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    } else {
      // Fallback logout
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 dark:border-slate-800/70 bg-white/80 dark:bg-slate-900/70 backdrop-blur">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        <button 
          onClick={onMenuToggle}
          className="lg:hidden p-2 rounded-lg border border-slate-200 dark:border-slate-800"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
        </button>
        
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-brand-500 via-accent-500 to-blue-500"></span>
          <strong>Aurora Admin</strong>
          <span className="ml-2 text-xs px-2 py-0.5 rounded-full border border-slate-200 dark:border-slate-700">
            DEV
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-2 text-xs">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
            <span className="text-slate-500 dark:text-slate-400">All systems nominal</span>
          </div>
          
          <button 
            onClick={toggleTheme}
            className="px-3 py-1.5 text-sm rounded-lg border border-slate-200 dark:border-slate-800"
          >
            Theme
          </button>
          
          <div className="relative">
            <button 
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="flex items-center gap-2 px-2 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800"
            >
              <img className="w-6 h-6 rounded-full" src="https://i.pravatar.cc/48?img=12" alt="user"/>
              <span className="text-sm">admin@aurora</span>
            </button>
            
            {userMenuOpen && (
              <div className="absolute right-0 mt-2 w-40 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl">
                <a className="block px-3 py-2 text-sm hover:bg-slate-50 dark:hover:bg-slate-800" href="#">
                  Profile
                </a>
                <a className="block px-3 py-2 text-sm hover:bg-slate-50 dark:hover:bg-slate-800" href="#">
                  Settings
                </a>
                <button 
                  onClick={handleLogout}
                  className="w-full text-left block px-3 py-2 text-sm hover:bg-slate-50 dark:hover:bg-slate-800"
                >
                  Log out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminTopbar;