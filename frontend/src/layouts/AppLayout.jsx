import { useState } from 'react'
import { Menu, Sun, Moon, LogOut, Search } from 'lucide-react'
import { Toaster, toast } from 'sonner'
import { Link, Outlet, NavLink } from 'react-router-dom'
import clsx from 'clsx'

export default function AppLayout() {
  const [open, setOpen] = useState(true)
  const [dark, setDark] = useState(() => document.documentElement.classList.contains('dark'))

  const toggleTheme = () => {
    const el = document.documentElement
    el.classList.toggle('dark')
    setDark(el.classList.contains('dark'))
    toast.success(`Switched to ${el.classList.contains('dark') ? 'Dark' : 'Light'} mode`)
  }

  const nav = [
    { to: '/admin', label: 'Dashboard' },
    { to: '/admin/posts', label: 'Posts' },
    { to: '/admin/categories', label: 'Categories' },
    { to: '/admin/tags', label: 'Tags' },
  ]

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-[auto,1fr]">
      {/* Sidebar */}
      <aside className={clsx("hidden lg:flex flex-col p-4 gap-4 border-r border-black/5 dark:border-white/10", open ? "w-64" : "w-20")}>
        <div className="flex items-center gap-3">
          <button className="btn-ghost" onClick={() => setOpen(s => !s)}><Menu size={20} /></button>
          {open && <Link to="/admin" className="font-semibold text-lg">Blog CMS</Link>}
        </div>
        <nav className="mt-2 space-y-1">
          {nav.map(i => (
            <NavLink
              key={i.to}
              to={i.to}
              className={({isActive}) => clsx(
                "flex items-center gap-3 px-3 py-2 rounded-xl transition",
                isActive ? "bg-brand-500 text-white" : "hover:bg-black/5 dark:hover:bg-white/5"
              )}
            >
              <span className="w-2 h-2 rounded-full bg-brand-500/60" />
              {open && <span>{i.label}</span>}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main */}
      <div className="flex flex-col">
        {/* Topbar */}
        <header className="sticky top-0 z-10 glass flex items-center gap-3 px-4 py-3">
          <button className="lg:hidden btn-ghost" onClick={() => setOpen(s => !s)}><Menu size={20} /></button>
          <div className="relative ml-auto">
            <Search className="absolute left-3 top-2.5 opacity-60" size={16} />
            <input className="input pl-9 pr-3 py-2 w-64" placeholder="Search posts…" />
          </div>
          <button className="btn-ghost" onClick={toggleTheme}>{dark ? <Sun size={18}/> : <Moon size={18}/>}</button>
          <button className="btn-ghost" onClick={() => toast('Logged out (demo)')}><LogOut size={18}/></button>
        </header>

        {/* Content */}
        <main className="p-4 lg:p-6 space-y-6">
          <Outlet />
        </main>

        <Toaster richColors closeButton />
      </div>
    </div>
  )
}
