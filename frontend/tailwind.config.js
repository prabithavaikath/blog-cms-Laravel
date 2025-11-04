export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        body: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        brand: {
          50:"#f4f3ff",100:"#ebe9fe",200:"#d9d6fe",300:"#c1b8fd",400:"#a08efb",
          500:"#7c64f6",600:"#6546ea",700:"#5637c8",800:"#452ea1",900:"#392a7b",
        },
        accent: { 500:"#ec4899", 600:"#db2777" },
        info:   { 500:"#3b82f6" },
        ink:    { 900:"#0b1020", 700:"#1a2036", 400:"#9aa3b2" },
      },
      boxShadow: {
        soft: "0 6px 30px -12px rgba(124,100,246,0.35)",
      },
      backgroundImage: {
        blog:
          "radial-gradient(60% 50% at 10% 10%, rgba(124,100,246,.30) 0, rgba(124,100,246,0) 60%), radial-gradient(70% 60% at 90% 20%, rgba(236,72,153,.25) 0, rgba(236,72,153,0) 60%), radial-gradient(80% 80% at 50% 100%, rgba(59,130,246,.25) 0, rgba(59,130,246,0) 60%)",
      },
    },
  },
  plugins: [],
};
