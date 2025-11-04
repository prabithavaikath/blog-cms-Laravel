// ──────────────────────────────────────────────────────────────────────────────
// FILE: src/components/public/Footer.tsx
// ──────────────────────────────────────────────────────────────────────────────
export default function Footer(){
return (
<footer className="mt-16 border-t border-slate-200 dark:border-slate-800">
<div className="max-w-6xl mx-auto px-4 py-8 text-sm text-slate-500 flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between">
<div>© {new Date().getFullYear()} Blog.</div>
<div className="flex gap-4">
<a href="#privacy" className="hover:underline">Privacy</a>
<a href="#terms" className="hover:underline">Terms</a>
</div>
</div>
</footer>
);
}