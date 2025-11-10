import { useEffect } from "react";

export default function BlogPage() {
  useEffect(() => {
    // ---- Theme init (exact behavior as the script) ----
    const root = document.documentElement;
    const stored = localStorage.getItem("theme");
    if (stored === "dark" || (!stored && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      root.classList.add("dark");
    }

    function toggleTheme() {
      root.classList.toggle("dark");
      localStorage.setItem("theme", root.classList.contains("dark") ? "dark" : "light");
    }

    const btnDesktop = document.getElementById("toggleTheme");
    const btnMobile = document.getElementById("toggleThemeMobile");
    btnDesktop?.addEventListener("click", toggleTheme);
    btnMobile?.addEventListener("click", toggleTheme);

    // ---- Mobile menu (same logic) ----
    const openBtn = document.getElementById("openMenu");
    const panel = document.getElementById("mobilePanel");
    const onOpen = () => {
      if (!panel) return;
      const expanded = panel.getAttribute("aria-expanded") === "true";
      panel.setAttribute("aria-expanded", String(!expanded));
    };
    openBtn?.addEventListener("click", onOpen);

    return () => {
      btnDesktop?.removeEventListener("click", toggleTheme);
      btnMobile?.removeEventListener("click", toggleTheme);
      openBtn?.removeEventListener("click", onOpen);
    };
  }, []);

  return (
    <div className="bg-white text-slate-800 dark:bg-slate-950 dark:text-slate-100 font-body selection:bg-brand-300/50">
      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur supports-backdrop-blur:bg-white/70 bg-white/80 dark:bg-slate-950/70 border-b border-slate-900/10 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Brand */}
            <a href="#" className="flex items-center gap-2 group">
              <span className="relative grid place-items-center w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 via-accent-500 to-info-500 text-white shadow-soft">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.77 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z"/>
                </svg>
              </span>
              <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-brand-700 via-accent-600 to-info-500">
               Online Learning Platform
              </span>
            </a>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-6 text-sm">
              <a href="#latest" className="hover:text-brand-600 dark:hover:text-brand-300">Latest</a>
              <a href="#topics" className="hover:text-brand-600 dark:hover:text-brand-300">Topics</a>
              <a href="#about" className="hover:text-brand-600 dark:hover:text-brand-300">About</a>
              <a href="#contact" className="hover:text-brand-600 dark:hover:text-brand-300">Contact</a>
            </nav>

            <div className="hidden md:flex items-center gap-3">
              <div className="relative">
                <input id="search" type="text" placeholder="Search articles…" className="peer w-56 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 px-3 py-2 text-sm outline-none focus:ring-2 ring-brand-400/50" />
                <svg className="pointer-events-none absolute right-3 top-2.5 h-5 w-5 text-slate-400 peer-focus:text-brand-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"/></svg>
              </div>
              <button id="toggleTheme" className="rounded-xl border border-slate-200 dark:border-slate-800 px-3 py-2 text-sm hover:border-brand-400/60 hover:bg-brand-50/40 dark:hover:bg-slate-800">Dark</button>
              <a href="login" className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-600 via-accent-600 to-info-500 px-4 py-2 text-sm font-semibold text-white shadow-soft hover:opacity-95">Login</a>
            </div>

            {/* Mobile */}
            <button id="openMenu" className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-xl border border-slate-200 dark:border-slate-800">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
            </button>
          </div>

          {/* Mobile Nav Panel */}
          <div id="mobilePanel" className="collapsible md:hidden transition-all" aria-expanded="false">
            <div className="py-3 space-y-3">
              <input type="text" placeholder="Search articles…" className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 px-3 py-2 text-sm outline-none focus:ring-2 ring-brand-400/50" />
              <nav className="grid gap-2 text-sm">
                <a className="px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800" href="#latest">Latest</a>
                <a className="px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800" href="#topics">Topics</a>
                <a className="px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800" href="#about">About</a>
                <a className="px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800" href="#contact">Contact</a>
                <a className="px-3 py-2 rounded-lg bg-gradient-to-r from-brand-600 via-accent-600 to-info-500 text-white" href="#subscribe">Subscribe</a>
                <button id="toggleThemeMobile" className="px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800">Toggle Dark</button>
              </nav>



              
            </div>
          </div>
        </div>
      </header>

      {/* Hero / Featured */}
      <section className="relative isolate">
        <div className="absolute inset-0 -z-10 bg-blog opacity-60 dark:opacity-70"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid lg:grid-cols-12 gap-8 items-stretch">
            {/* Feature Card */}
            <article className="lg:col-span-8 bg-white/70 dark:bg-slate-900/60 backdrop-blur rounded-2xl border border-slate-200/60 dark:border-slate-800/60 overflow-hidden shadow-soft">
              <div className="aspect-[16/9] bg-gradient-to-tr from-brand-600 via-accent-600 to-info-500"></div>
              <div className="p-6 sm:p-8">
                <div className="flex items-center gap-2 text-xs uppercase tracking-wide">
                  <span className="px-2 py-1 rounded-full bg-brand-100 text-brand-700 dark:bg-brand-600/20 dark:text-brand-200">Featured</span>
                  <time className="text-slate-500 dark:text-slate-400">Oct 14, 2025</time>
                  <span aria-hidden className="text-slate-400">•</span>
                  <span className="text-slate-500 dark:text-slate-400">8 min read</span>
                </div>
                <h1 className="mt-3 text-2xl sm:text-3xl font-extrabold">Designing a Calm, Rich Blog UI with Tailwind</h1>
                <p className="mt-3 text-slate-600 dark:text-slate-300">
                  A practical walk-through of building a premium blog experience with gradients, soft shadows, and accessible dark mode—without any heavy JS frameworks.
                </p>
                <div className="mt-5 flex items-center gap-4">
                  <img className="w-10 h-10 rounded-full ring-2 ring-white dark:ring-slate-900" src="https://i.pravatar.cc/80?img=44" alt="Author" />
                  <div className="text-sm">
                    <div className="font-semibold">Pramitha Vaikath</div>
                    <div className="text-slate-500 dark:text-slate-400">Editor in Chief</div>
                  </div>
                  <a href="#read" className="ml-auto inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold text-white bg-slate-900 dark:bg-white dark:text-slate-900 hover:opacity-90">
                    Read Now
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M13 5l7 7-7 7v-4H4v-6h9V5z"/></svg>
                  </a>
                </div>
              </div>
            </article>

            {/* Sidebar Quick Widgets */}
            <aside className="lg:col-span-4 space-y-6">
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 backdrop-blur p-5">
                <h3 className="font-bold">Trending</h3>
                <ul className="mt-4 space-y-3 text-sm">
                  <li className="flex gap-3">
                    <span className="mt-1 inline-block w-2 h-2 rounded-full bg-accent-500"></span>
                    <a href="#" className="hover:underline">7 Tailwind patterns for content-heavy sites</a>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-1 inline-block w-2 h-2 rounded-full bg-brand-500"></span>
                    <a href="#" className="hover:underline">Dark mode that actually respects users</a>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-1 inline-block w-2 h-2 rounded-full bg-info-500"></span>
                    <a href="#" className="hover:underline">Accessible cards with better focus rings</a>
                  </li>
                </ul>
              </div>
              <div id="subscribe" className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-brand-600 via-accent-600 to-info-500 p-6 text-white shadow-soft">
                <h3 className="font-bold text-lg">Get the newsletter</h3>
                <p className="mt-1 text-white/90 text-sm">No spam. Just weekly UI tips and best reads.</p>
                <form className="mt-4 flex">
                  <input type="email" required placeholder="you@example.com" className="w-full rounded-l-xl px-3 py-2 text-slate-900 focus:outline-none" />
                  <button className="rounded-r-xl bg-slate-950 px-4 py-2 text-sm font-semibold hover:opacity-90">Join</button>
                </form>
              </div>
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 backdrop-blur p-5" id="topics">
                <h3 className="font-bold">Topics</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {["Tailwind","React","UX","Accessibility","Performance"].map(t=>(
                    <a key={t} className="px-3 py-1.5 text-xs rounded-full border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800" href="#">{t}</a>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Latest Articles */}
      <main id="latest" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-xl sm:text-2xl font-extrabold">Latest Articles</h2>
          <a href="#" className="text-sm hover:text-brand-600 dark:hover:text-brand-300">View all</a>
        </div>

        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Cards */}
          {/* 1 */}
          <article className="group rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 backdrop-blur overflow-hidden hover:shadow-soft transition-shadow">
            <div className="relative">
              <img className="w-full h-48 object-cover" src="https://images.unsplash.com/photo-1493612276216-ee3925520721?q=80&w=1200&auto=format&fit=crop" alt="Article cover"/>
              <span className="absolute top-3 left-3 px-2 py-1 text-xs rounded-full bg-white/90 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800">Design</span>
            </div>
            <div className="p-5">
              <h3 className="font-bold group-hover:underline">Card layouts that read like newspapers</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 line-clamp-3">Learn how to combine hierarchy, rhythm, and contrast to make dense content easy to scan without feeling busy.</p>
              <div className="mt-4 flex items-center gap-3">
                <img className="w-8 h-8 rounded-full" src="https://i.pravatar.cc/64?img=24" alt="Author" />
                <div className="text-xs text-slate-500 dark:text-slate-400">By <span className="font-medium text-slate-700 dark:text-slate-200">Mira Rao</span> • 6 min read</div>
                <button className="ml-auto px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-800 text-xs">Save</button>
              </div>
            </div>
          </article>

          {/* 2 */}
          <article className="group rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 backdrop-blur overflow-hidden hover:shadow-soft">
            <div className="relative">
              <img className="w-full h-48 object-cover" src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop" alt="Article cover"/>
              <span className="absolute top-3 left-3 px-2 py-1 text-xs rounded-full bg-white/90 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800">Tailwind</span>
            </div>
            <div className="p-5">
              <h3 className="font-bold group-hover:underline">Build gradients that don’t scream 2012</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 line-clamp-3">Tame the rainbow: subtle overlays, hue constraints, and why 3-stop blends feel premium.</p>
              <div className="mt-4 flex items-center gap-3">
                <img className="w-8 h-8 rounded-full" src="https://i.pravatar.cc/64?img=11" alt="Author" />
                <div className="text-xs text-slate-500 dark:text-slate-400">By <span className="font-medium text-slate-700 dark:text-slate-200">Noah Singh</span> • 5 min read</div>
                <button className="ml-auto px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-800 text-xs">Save</button>
              </div>
            </div>
          </article>

          {/* 3 */}
          <article className="group rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 backdrop-blur overflow-hidden hover:shadow-soft">
            <div className="relative">
              <img className="w-full h-48 object-cover" src="https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf?q=80&w=1200&auto=format&fit=crop" alt="Article cover"/>
              <span className="absolute top-3 left-3 px-2 py-1 text-xs rounded-full bg-white/90 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800">Performance</span>
            </div>
            <div className="p-5">
              <h3 className="font-bold group-hover:underline">Ship a 100 Lighthouse blog without pain</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 line-clamp-3">Fonts, images, CLS traps, and low-JS patterns that make your content feel instant.</p>
              <div className="mt-4 flex items-center gap-3">
                <img className="w-8 h-8 rounded-full" src="https://i.pravatar.cc/64?img=7" alt="Author" />
                <div className="text-xs text-slate-500 dark:text-slate-400">By <span className="font-medium text-slate-700 dark:text-slate-200">Rhea Park</span> • 7 min read</div>
                <button className="ml-auto px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-800 text-xs">Save</button>
              </div>
            </div>
          </article>
        </div>

        {/* Pinned row */}
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 bg-white/70 dark:bg-slate-900/60">
            <h3 className="font-bold">Editor’s picks</h3>
            <div className="mt-4 grid sm:grid-cols-2 gap-4">
              {[
                ["Case Study","We cut bounce by 23% with better headings"],
                ["How-to","Dark mode CSS you actually need in 2025"],
                ["Playbook","Launching a content site without a framework"],
                ["Guide","Image pipelines that keep pages under 100KB"],
              ].map(([k,v])=>(
                <a key={v} href="#" className="group rounded-xl p-4 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800">
                  <div className="text-sm text-slate-500">{k}</div>
                  <div className="mt-1 font-semibold group-hover:underline">{v}</div>
                </a>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 p-6 bg-white/70 dark:bg-slate-900/60">
            <h3 className="font-bold">About </h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              We publish weekly articles on front-end design, performance, and accessible UI patterns.
            </p>
            <a href="#about" className="mt-3 inline-block text-sm font-semibold hover:text-brand-600 dark:hover:text-brand-300">Learn more →</a>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 via-accent-500 to-info-500"></span>
                <span className="font-bold">Prabitha Vaikath</span>
              </div>
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">A rich Tailwind blog UI starter. MIT Licensed.</p>
            </div>
            <div>
              <h4 className="font-semibold">Explore</h4>
              <ul className="mt-3 space-y-2 text-sm">
                <li><a className="hover:underline" href="#latest">Latest</a></li>
                <li><a className="hover:underline" href="#topics">Topics</a></li>
                <li><a className="hover:underline" href="#">Guides</a></li>
                <li><a className="hover:underline" href="#">Tutorials</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold">Company</h4>
              <ul className="mt-3 space-y-2 text-sm">
                <li><a className="hover:underline" href="#about">About</a></li>
                <li><a className="hover:underline" href="#contact">Contact</a></li>
                <li><a className="hover:underline" href="#">Privacy</a></li>
                <li><a className="hover:underline" href="#">Terms</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold">Stay in the loop</h4>
              <form className="mt-3 flex">
                <input type="email" placeholder="you@example.com" className="w-full rounded-l-xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 px-3 py-2 text-sm outline-none focus:ring-2 ring-brand-400/50" />
                <button className="rounded-r-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-4 py-2 text-sm font-semibold">Subscribe</button>
              </form>
            </div>
          </div>
          <div className="mt-10 text-xs text-slate-500">© 2025 Prabitha Vaikath.</div>
        </div>
      </footer>
    </div>
  );
}
