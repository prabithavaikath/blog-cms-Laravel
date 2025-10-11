import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AdminPosts() {
  const { user, logout } = useAuth();
  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Admin — Posts</h1>
        <div className="flex items-center gap-3">
          <span className="text-sm">Hi, {user?.name}</span>
          <button className="text-sm underline" onClick={logout}>Logout</button>
        </div>
      </div>
      <Link to="/admin/posts/new" className="inline-block bg-black text-white px-3 py-2 rounded">New Post</Link>
      <p className="mt-6 opacity-70">For the demo, create a post via “New Post” and then publish it.</p>
    </div>
  );
}
