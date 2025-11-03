import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchPosts, deletePost } from "./api";

export default function PostsTable() {
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({ queryKey: ["posts"], queryFn: fetchPosts });
  const del = useMutation({
    mutationFn: (id: number) => deletePost(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["posts"] }),
  });

  if (isLoading) return <div>Loading…</div>;
  const rows = data?.data || [];

  return (
    <table className="w-full text-sm">
      <thead>
        <tr>
          <th className="p-2 text-left">Title</th>
          <th>Status</th>
          <th>Updated</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {rows.map((p: any) => (
          <tr key={p.id} className="border-t">
            <td className="p-2">{p.title}</td>
            <td>{p.status}</td>
            <td>{p.updated_at?.slice(0,10)}</td>
            <td className="text-right p-2">
              <button onClick={() => del.mutate(p.id)} className="px-2 py-1 border rounded">
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
