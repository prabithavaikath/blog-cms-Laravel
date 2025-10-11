function Kpi({label, value, delta}) {
  return (
    <div className="card p-4">
      <div className="text-sm text-ink-400">{label}</div>
      <div className="mt-1 text-2xl font-semibold">{value}</div>
      <div className="mt-2 text-xs badge">{delta}</div>
    </div>
  )
}

export default function Dashboard() {
  // Replace with TanStack Query to fetch from /api
  const kpis = [
    {label: 'Published Posts', value: 18, delta: '+3 this week'},
    {label: 'Drafts', value: 5, delta: '2 need review'},
    {label: 'Categories', value: 7, delta: 'stable'},
    {label: 'Tags', value: 24, delta: '+5 new'},
  ]

  const recent = [
    {title: 'Hello World', status: 'published', author: 'Admin', date: '2025-10-10'},
    {title: 'Editor Tips', status: 'draft', author: 'Editor', date: '2025-10-09'},
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Overview</h1>
        <div className="flex gap-2">
          <button className="btn">New Post</button>
          <button className="btn-ghost">Import</button>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((k) => <Kpi key={k.label} {...k} />)}
      </div>

      <div className="card">
        <div className="p-4 border-b border-black/5 dark:border-white/10 flex items-center justify-between">
          <h2 className="font-semibold">Recent posts</h2>
          <a href="/admin/posts" className="text-brand-600 hover:underline">View all</a>
        </div>
        <div className="p-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-ink-400">
              <tr><th className="py-2">Title</th><th>Status</th><th>Author</th><th>Date</th><th></th></tr>
            </thead>
            <tbody>
              {recent.map((p, i) => (
                <tr key={i} className="border-t border-black/5 dark:border-white/10">
                  <td className="py-2">{p.title}</td>
                  <td><span className="badge">{p.status}</span></td>
                  <td>{p.author}</td>
                  <td>{p.date}</td>
                  <td className="text-right">
                    <a className="text-info-500 hover:underline" href="#">Edit</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
