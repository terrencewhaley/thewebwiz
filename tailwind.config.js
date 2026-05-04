/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg:        "var(--bg)",
        "bg-2":    "var(--bg-2)",
        line:      "var(--line)",
        "line-2":  "var(--line-2)",
        ink:       "var(--ink)",
        "ink-2":   "var(--ink-2)",
        "ink-3":   "var(--ink-3)",
        accent:    "var(--accent)",
        "accent-ink": "var(--accent-ink)",
      },
      fontFamily: {
        display: ["Instrument Serif", "ui-serif", "Georgia", "serif"],
        sans:    ["Geist", "ui-sans-serif", "system-ui", "sans-serif"],
        mono:    ["Geist Mono", "ui-monospace", "Menlo", "monospace"],
      },
    },
  },
  plugins: [],
};
