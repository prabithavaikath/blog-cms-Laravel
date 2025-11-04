// ──────────────────────────────────────────────────────────────────────────────
// FILE: src/components/public/Sidebar.tsx
// ──────────────────────────────────────────────────────────────────────────────
export default function Sidebar(){
return (
<aside className="space-y-4">
<div className="rounded-xl border border-slate-200 dark:border-slate-800 p-4 bg-white dark:bg-slate-900">
<div className="font-semibold">About</div>
<p className="text-sm mt-1 text-slate-600 dark:text-slate-400">Snappy, minimal blog UI. Replace with your brand copy.</p>
</div>
<div className="rounded-xl border border-slate-200 dark:border-slate-800 p-4 bg-white dark:bg-slate-900">
<div className="font-semibold">Newsletter</div>
<form className="mt-2 flex"> <input placeholder="Email" className="flex-1 rounded-l-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-2 text-sm"/> <button className="rounded-r-lg border border-l-0 px-3 text-sm">Join</button> </form>
</div>
</aside>
);
}