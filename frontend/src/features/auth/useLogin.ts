import { useState } from "react";
import { api, setToken } from "../../lib/api";

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string|undefined>();
  async function login(email: string, password: string) {
    setLoading(true); setError(undefined);
    try {
      const { data } = await api.post("/auth/login", { email, password });
      setToken(data.token);
      localStorage.setItem("token", data.token);
      return true;
    } catch {
      setError("Invalid");
      return false;
    } finally {
      setLoading(false);
    }
  }
  return { login, loading, error };
}
