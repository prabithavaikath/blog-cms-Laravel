// ──────────────────────────────────────────────────────────────────────────────
// FILE: src/components/public/PostCard.tsx
// ──────────────────────────────────────────────────────────────────────────────
import { Link } from 'react-router-dom';
export default function PostCard({p}:{p:any}){
return (
<article className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:shadow-sm transition">
{p.cover_url && <img src={p.cover_url} alt="" className="w-full h-44 object-cover"/>}
<div className="p-4">
<Link to={`/p/${p.slug}`} className="text-lg font-semibold hover:underline line-clamp-2">{p.title}</Link>
<div className="mt-1 text-xs text-slate-500">{p.category?.name||'-'} • {p.updated_at?.slice(0,10)}</div>
<p className="mt-2 text-sm text-slate-700 dark:text-slate-300 line-clamp-3">{p.excerpt}</p>
</div>
</article>
);
}