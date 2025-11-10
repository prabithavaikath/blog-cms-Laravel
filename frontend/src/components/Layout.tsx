import { NavLink, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api";

type LayoutProps = { children: React.ReactNode; onLogout?: () => void };

export default function Layout({ children, onLogout }: LayoutProps){
  const nav = useNavigate();
  const { data: me } = useQuery({ queryKey:["auth","me"], queryFn: async()=> (await api.get("/admin")).data });
  const logout = () => { localStorage.removeItem("token"); onLogout ? onLogout() : nav("/login", { replace:true }); };

  return (
    <div className="min-h-screen grid grid-rows-[auto_1fr] bg-slate-50 dark:bg-slate-950">
      <header className="h-14 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/70 backdrop-blur">
        <div className="max-w-7xl mx-auto h-full px-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#7c64f6] via-[#ec4899] to-[#3b82f6]" />
            <div className="font-extrabold">Admin</div>
            {me?.role && (
              <span className="ml-2 text-[11px] px-2 py-0.5 rounded-full border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300">
                {me.role}
              </span>
            )}
          </div>
          <div className="flex items-center gap-3 text-sm">
            <span className="hidden sm:block text-slate-600 dark:text-slate-300">{me?.name || me?.email || "—"}</span>
            <button onClick={logout} className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700">Logout</button>
          </div>
        </div>
      </header>

      <div className="grid lg:grid-cols-[240px_1fr] max-w-7xl w-full mx-auto gap-6 p-4">
        <aside className="h-max rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3 sticky top-16">
          <nav className="flex flex-col text-sm">
            <SideLink to="/posts" label="Posts" />
            <SideLink to="/categories" label="Categories" />
            <SideLink to="/users" label="Users" />
            <SideLink to="/settings" label="Settings" />
          </nav>
        </aside>
        <main className="min-h-[60vh]">{children}</main>
      </div>
    </div>
  );
}

function SideLink({ to, label }: { to: string; label: string }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        [
          "px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800",
          isActive ? "bg-slate-100 dark:bg-slate-800 font-semibold" : "",
        ].join(" ")
      }
    >
      {label}
    </NavLink>
  );
}
