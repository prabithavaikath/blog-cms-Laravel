// ──────────────────────────────────────────────────────────────────────────────
// FILE: src/App.tsx (Routes: public site + admin login)
// ──────────────────────────────────────────────────────────────────────────────
import { Navigate, Route, Routes } from "react-router-dom";

// PUBLIC PAGES
import PublicHome from "./pages/PublicHome";
import PublicPost from "./pages/PublicPost";

// AUTH
import Login from "./pages/auth/Login";

// ADMIN (guarded) — keep these if you already have them
import Layout from "./components/Layout";            // adjust if your Layout path differs
import Posts from "./pages/Posts";                   // adjust/remove if not created yet
import Categories from "./pages/Categories";         // adjust/remove if not created yet
import Users from "./pages/Users";                   // adjust/remove if not created yet
import Settings from "./pages/Settings";             // adjust/remove if not created yet
import RequireRole from "./components/RequireRole";  // adjust/remove if not created yet

function PrivateRoute({ children }: { children: JSX.Element }) {
  const authed = !!localStorage.getItem("token");
  return authed ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <Routes>
      {/* Public site */}
      <Route path="/" element={<PublicHome />} />
      <Route path="/p/:slug" element={<PublicPost />} />

      {/* Auth */}
      <Route path="/login" element={<Login />} />

      {/* Admin (guarded) */}
      <Route
        path="/posts"
        element={
          <PrivateRoute>
            <Layout onLogout={() => { localStorage.removeItem("token"); location.href = "/login"; }}>
              <Posts />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/categories"
        element={
          <PrivateRoute>
            <Layout onLogout={() => { localStorage.removeItem("token"); location.href = "/login"; }}>
              <RequireRole allow={["Admin"] as any}>
                <Categories />
              </RequireRole>
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/users"
        element={
          <PrivateRoute>
            <Layout onLogout={() => { localStorage.removeItem("token"); location.href = "/login"; }}>
              <RequireRole allow={["Admin"] as any}>
                <Users />
              </RequireRole>
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <PrivateRoute>
            <Layout onLogout={() => { localStorage.removeItem("token"); location.href = "/login"; }}>
              <Settings />
            </Layout>
          </PrivateRoute>
        }
      />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
