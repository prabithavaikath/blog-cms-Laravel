import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import api from '../lib/api';

export default function PostDetail() {
  const { slug } = useParams();
  const { data } = useQuery({
    queryKey: ['post', slug],
    queryFn: async () => (await api.get(`/api/posts/${slug}`)).data
  });
  if (!data) return null;
  return (
    <article className="max-w-2xl mx-auto p-6 prose">
      <h1 className="text-3xl font-bold mb-2">{data.title}</h1>
      {/* content is HTML in demo */}
      <div dangerouslySetInnerHTML={{ __html: data.content || '' }} />
    </article>
  );
}
