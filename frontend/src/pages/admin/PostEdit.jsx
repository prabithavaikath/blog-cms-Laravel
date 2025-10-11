import { useState, useEffect } from 'react'
import { toast } from 'sonner'

export default function PostEdit() {
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [content, setContent] = useState('')

  useEffect(() => {
    setSlug(title.toLowerCase().trim()
      .replace(/[^\w\s-]/g,'').replace(/\s+/g,'-').replace(/-+/g,'-'))
  }, [title])

  const save = () => toast.success('Saved (demo)')

  return (
    <div className="grid lg:grid-cols-[1fr,320px] gap-6">
      <div className="space-y-4">
        <div className="card p-4">
          <label className="text-sm text-ink-400">Title</label>
          <input className="input w-full mt-1" value={title} onChange={e=>setTitle(e.target.value)} placeholder="Write an amazing title…" />
          <p className="mt-1 text-xs text-ink-400">Slug: <span className="font-mono">{slug || '—'}</span></p>
        </div>

        <div className="card p-4">
          <label className="text-sm text-ink-400">Excerpt</label>
          <textarea className="input w-full mt-1" rows={3} value={excerpt} onChange={e=>setExcerpt(e.target.value)} />
        </div>

        <div className="card p-4">
          <label className="text-sm text-ink-400">Content</label>
          <textarea className="input w-full mt-1" rows={12} value={content} onChange={e=>setContent(e.target.value)} placeholder="Write your post…" />
          {/* Swap the textarea for TipTap later */}
        </div>
      </div>

      <div className="space-y-4">
        <div className="card p-4 sticky top-4 space-y-3">
          <div className="flex gap-2">
            <button className="btn w-full" onClick={save}>Save</button>
            <button className="btn-ghost w-full">Preview</button>
          </div>
          <div>
            <label className="text-sm text-ink-400">Status</label>
            <select className="input w-full mt-1">
              <option>Draft</option>
              <option>Published</option>
            </select>
          </div>
          <div>
            <label className="text-sm text-ink-400">Category</label>
            <select className="input w-full mt-1"><option>—</option></select>
          </div>
          <div>
            <label className="text-sm text-ink-400">Tags</label>
            <input className="input w-full mt-1" placeholder="Comma separated" />
          </div>
        </div>
      </div>
    </div>
  )
}
