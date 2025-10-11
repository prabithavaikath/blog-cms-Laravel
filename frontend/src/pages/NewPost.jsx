import { useState } from 'react';
import api from '../lib/api';

export default function NewPost() {
  const [title,setTitle] = useState('');
  const [slug,setSlug] = useState('');
  const [excerpt,setExcerpt] = useState('');
  const [content,setContent] = useState('<p>Write here…</p>');
  const [msg,setMsg] = useState('');

  const create = async (e) => {
    e.preventDefault();
    const post = (await api.post('/api/posts',{ title, slug, excerpt, content })).data;
    await api.post(`/api/posts/${post.id}/publish`);
    setMsg('Post created & published!');
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-xl font-semibold mb-4">New Post</h1>
      {msg && <p className="text-green-600 mb-2">{msg}</p>}
      <form onSubmit={create} className="space-y-3">
        <input className="border w-full p-2" placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)}/>
        <input className="border w-full p-2" placeholder="Slug (unique)" value={slug} onChange={e=>setSlug(e.target.value)}/>
        <textarea className="border w-full p-2" placeholder="Excerpt" value={excerpt} onChange={e=>setExcerpt(e.target.value)} />
        <textarea className="border w-full p-2 h-40" placeholder="Content (HTML ok)" value={content} onChange={e=>setContent(e.target.value)} />
        <button className="bg-black text-white px-4 py-2 rounded">Create & Publish</button>
      </form>
    </div>
  );
}
