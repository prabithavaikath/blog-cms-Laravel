import React, { useState } from 'react';

interface Post {
  id: number;
  title: string;
  status: string;
  author: string;
  updated: string;
}

const AdminPosts: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([
    { id: 1, title: 'Card layouts that read like newspapers', status: 'Published', author: 'Mira Rao', updated: '2025-10-10' },
    { id: 2, title: 'Build gradients that don\'t scream 2012', status: 'Draft', author: 'Noah Singh', updated: '2025-10-12' },
    { id: 3, title: 'Ship a 100 Lighthouse blog without pain', status: 'Published', author: 'Rhea Park', updated: '2025-10-13' }
  ]);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Posts</h1>
        <div className="flex items-center gap-2">
          <input 
            type="text"
            placeholder="Search title…"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="hidden sm:block rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-2 text-sm"
          />
          <button className="rounded-xl bg-gradient-to-r from-brand-600 via-accent-600 to-blue-500 text-white px-4 py-2 text-sm font-semibold shadow-soft">
            New Post
          </button>
        </div>
      </div>

      <div className="mt-4 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 dark:bg-slate-900">
            <tr className="text-left">
              <th className="p-3">Title</th>
              <th className="p-3">Status</th>
              <th className="p-3">Author</th>
              <th className="p-3">Updated</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800 bg-white dark:bg-slate-950">
            {filteredPosts.map(post => (
              <tr key={post.id}>
                <td className="p-3">
                  <div className="font-medium">{post.title}</div>
                  <div className="text-xs text-slate-500">ID: {post.id}</div>
                </td>
                <td className="p-3">
                  <span className={`px-2 py-1 text-xs rounded-full border ${
                    post.status === 'Published' 
                      ? 'border-emerald-300 text-emerald-700 dark:border-emerald-700/40 dark:text-emerald-300'
                      : 'border-amber-300 text-amber-700 dark:border-amber-700/40 dark:text-amber-300'
                  }`}>
                    {post.status}
                  </span>
                </td>
                <td className="p-3">{post.author}</td>
                <td className="p-3">{post.updated}</td>
                <td className="p-3 text-right">
                  <button className="px-2 py-1 rounded border border-slate-200 dark:border-slate-800">
                    Edit
                  </button>
                  <button className="ml-2 px-2 py-1 rounded border border-slate-200 dark:border-slate-800">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
        <div>Page 1 of 1</div>
        <div className="flex gap-2">
          <button className="px-2 py-1 rounded border border-slate-200 dark:border-slate-800">Prev</button>
          <button className="px-2 py-1 rounded border border-slate-200 dark:border-slate-800">Next</button>
        </div>
      </div>
    </div>
  );
};

export default AdminPosts;