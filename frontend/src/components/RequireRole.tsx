// src/components/RequireRole.tsx
import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api";

type Props = { allow: string[]; children: React.ReactNode };

export default function RequireRole({ allow, children }: Props) {
  const { data: me, isLoading } = useQuery({
    queryKey: ["auth", "me"],
    queryFn: async () => (await api.get("/auth/me")).data,
  });

  if (isLoading) return <div className="p-4 text-sm">Checking access…</div>;
  if (!me || !allow.includes(me.role)) {
    return (
      <div className="p-6 rounded-2xl border border-amber-200 dark:border-amber-900/40 bg-amber-50 dark:bg-amber-900/10">
        <div className="font-semibold">Not allowed</div>
        <div className="text-sm text-amber-800 dark:text-amber-200">
          You don’t have permission to view this page.
        </div>
      </div>
    );
  }
  return <>{children}</>;
}
