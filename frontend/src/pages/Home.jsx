import { useQuery } from '@tanstack/react-query';
import api from '../lib/api';
import { Link } from 'react-router-dom';

export default function Home() {
  const { data } = useQuery({
    queryKey: ['posts'],
    queryFn: async () => (await api.get('/api/posts')).data
  });
  const items = data?.data || [];
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Latest Posts</h1>
      <ul className="space-y-4">
        {items.map(p => (
          <li key={p.id} className="border rounded p-4">
            <Link to={`/post/${p.slug}`} className="text-lg font-semibold">{p.title}</Link>
            <p className="text-sm opacity-80">{p.excerpt}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
