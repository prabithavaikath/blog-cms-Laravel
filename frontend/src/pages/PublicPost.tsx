// FILE: src/pages/PublicPost.tsx
// ──────────────────────────────────────────────────────────────────────────────
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Navbar from '../components/public/Navbar';
import Footer from '../components/public/Footer';
import { PublicAPI } from '../lib/api';


export default function PublicPost(){
const { slug } = useParams();
const {data,isLoading,error} = useQuery({ queryKey:['public', slug], queryFn:()=>PublicAPI.getPost(slug!) });
if (isLoading) return <div className="p-6">Loading…</div>;
if (error) return <div className="p-6">Post not found</div>;
const p = data;
return (
<div className="min-h-screen bg-white dark:bg-slate-950">
<Navbar/>
<article className="max-w-3xl mx-auto px-4 py-10">
<Link to="/" className="text-sm">← Back</Link>
<h1 className="mt-2 text-3xl font-extrabold">{p.title}</h1>
<div className="text-xs text-slate-500">{p.category?.name||'-'} • {p.updated_at?.slice(0,10)} • by {p.author?.name||'-'}</div>
{p.cover_url && <img src={p.cover_url} alt="" className="mt-4 w-full rounded-xl"/>}
<div className="prose dark:prose-invert max-w-none mt-6 whitespace-pre-wrap leading-7">{p.content}</div>
</article>
<Footer/>
</div>
);
}