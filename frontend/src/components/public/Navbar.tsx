import { Link, NavLink } from 'react-router-dom';
export default function Navbar(){
return (
<header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-950/70 backdrop-blur border-b border-slate-200/70 dark:border-slate-800/70">
<div className="max-w-6xl mx-auto h-14 px-4 flex items-center justify-between">
<Link to="/" className="flex items-center gap-2">
<span className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#7c64f6] via-[#ec4899] to-[#3b82f6]"/>
<span className="font-extrabold">Blog</span>
</Link>
<nav className="hidden sm:flex items-center gap-4 text-sm">
<NavLink to="/" className={({isActive})=>`px-2 py-1 rounded ${isActive?'bg-slate-100 dark:bg-slate-800':''}`}>Home</NavLink>
<a href="#categories" className="px-2 py-1 rounded">Categories</a>
<a href="#about" className="px-2 py-1 rounded">About</a>
<Link to="/login" className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800">Admin</Link>
</nav>
</div>
</header>
);
}