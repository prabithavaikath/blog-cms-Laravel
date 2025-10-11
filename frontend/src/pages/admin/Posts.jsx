import { useQuery } from '@tanstack/react-query'
import { listPosts } from '../../lib/apiClient'
import SkeletonRow from '../../components/SkeletonRow'
import { Link } from 'react-router-dom'
import { useState } from 'react'

export default function Posts() {
  const [q, setQ] = useState('')
  const { data, isLoading } = useQuery({
    queryKey: ['posts', q],
    queryFn: () => listPosts(q ? { search: q } : undefined).then(r => r.data),
  })

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Posts</h1>
        <Link className="btn" to="/admin/posts/new">New Post</Link>
      </div>

      <div className="card p-3 flex gap-2">
        <input className="input w-full" placeholder="Search title or tag…" value={q} onChange={e=>setQ(e.target.value)} />
      </div>

      <div className="card p-0 overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-left text-ink-400">
            <tr><th className="p-3">Title</th><th>Status</th><th>Updated</th><th></th></tr>
          </thead>
          <tbody>
            {isLoading && Array.from({length:6}).map((_,i)=>(
              <tr key={i}><td className="p-3" colSpan={4}><SkeletonRow/></td></tr>
            ))}
            {!isLoading && data?.data?.length === 0 && (
              <tr><td className="p-6 text-center text-ink-400" colSpan={4}>No posts yet.</td></tr>
            )}
            {data?.data?.map(post=>(
              <tr key={post.id} className="border-t border-black/5 dark:border-white/10">
                <td className="p-3">{post.title}</td>
                <td>{post.status}</td>
                <td>{new Date(post.updated_at).toLocaleString()}</td>
                <td className="p-3 text-right">
                  <Link className="text-info-500 hover:underline" to={`/admin/posts/${post.id}`}>Edit</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
