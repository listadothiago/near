"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark" | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("near-theme");
    if (stored === "light" || stored === "dark") setTheme(stored);
  }, []);

  function toggle() {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    const current = theme ?? (prefersDark ? "dark" : "light");
    const next = current === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    localStorage.setItem("near-theme", next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle color theme"
      className="font-mono text-[0.78rem] text-muted border border-border rounded-lg px-3 py-1.5 hover:border-accent hover:text-accent-ink transition-colors"
    >
      {theme === "dark" ? "dark" : theme === "light" ? "light" : "auto"}
    </button>
  );
}
