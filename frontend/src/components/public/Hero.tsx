// ──────────────────────────────────────────────────────────────────────────────
// FILE: src/components/public/Hero.tsx
// ──────────────────────────────────────────────────────────────────────────────
export default function Hero(){
return (
<section className="bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950">
<div className="max-w-6xl mx-auto px-4 py-10">
<h1 className="text-3xl sm:text-4xl font-extrabold">Insights, tutorials, and updates</h1>
<p className="mt-2 text-slate-600 dark:text-slate-400 max-w-2xl">A clean, fast blog UI built with React + Tailwind. Fetches posts from your Laravel API.</p>
</div>
</section>
);
}