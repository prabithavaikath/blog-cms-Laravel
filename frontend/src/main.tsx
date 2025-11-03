import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PostsTable from "./features/posts/PostsTable";
import { setToken } from "./lib/api";
import "./index.css";

const qc = new QueryClient();

// auth guard-lite
const token = localStorage.getItem("token") || undefined;
setToken(token);

function App() {
  const [email, setEmail] = React.useState("admin@example.com");
  const [password, setPassword] = React.useState("password");
  const [err, setErr] = React.useState<string | null>(null);
  const [t, setT] = React.useState<string | undefined>(token);

  async function doLogin() {
    try {
      const res = await fetch(import.meta.env.VITE_API_URL + "/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) { setErr("Invalid"); return; }
      const data = await res.json();
      localStorage.setItem("token", data.token);
      setToken(data.token);
      setT(data.token);
      setErr(null);
    } catch {
      setErr("Login failed");
    }
  }

  if (!t) {
    return (
      <div className="p-6 max-w-sm mx-auto">
        <h1 className="text-xl font-bold mb-4">Login</h1>
        <input className="border p-2 w-full mb-2" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" />
        <input className="border p-2 w-full mb-2" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" type="password" />
        {err && <div className="text-red-600 text-sm mb-2">{err}</div>}
        <button className="border px-3 py-2" onClick={doLogin}>Login</button>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Posts</h1>
      <PostsTable />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={qc}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
