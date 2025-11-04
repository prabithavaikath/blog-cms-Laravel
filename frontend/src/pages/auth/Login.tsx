// src/pages/auth/Login.tsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthAPI, setToken } from "../../lib/api";

export default function Login() {
  const nav = useNavigate();
  const [email, setEmail] = useState("admin@example.com");
  const [password, setPassword] = useState("password");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await AuthAPI.login(email.trim(), password);
      const token = res?.token || res?.access_token || res?.data?.token;
      if (!token) throw new Error("Token missing in response");
      localStorage.setItem("token", token);
      setToken(token);
      nav("/posts");
    } catch (err: any) {
      setError(err?.response?.data?.message || err?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen grid place-items-center bg-slate-50 dark:bg-slate-950">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#7c64f6] via-[#ec4899] to-[#3b82f6]" />
          <div>
            <div className="font-extrabold">Admin</div>
            <div className="text-xs text-slate-500">Sign in to continue</div>
          </div>
        </div>
        <form onSubmit={submit} className="mt-6 space-y-4">
          <label className="block text-sm">
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-2 text-sm"
            />
          </label>
          <label className="block text-sm">
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-2 text-sm"
            />
          </label>
          {error && (
            <div className="rounded-lg border border-rose-300/50 bg-rose-50 text-rose-700 dark:bg-rose-900/20 dark:text-rose-200 text-xs p-2">
              {error}
            </div>
          )}
          <button
            disabled={loading}
            className="w-full rounded-xl bg-gradient-to-r from-[#7c64f6] via-[#ec4899] to-[#3b82f6] text-white py-2 text-sm font-semibold"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
          <div className="text-center text-xs text-slate-500">
            Back to <Link to="/" className="underline">Home</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
