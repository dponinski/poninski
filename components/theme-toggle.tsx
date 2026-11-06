"use client";

import { useEffect, useState } from "react";
import { THEME_STORAGE_KEY as STORAGE_KEY, type Theme } from "@/lib/theme";

function resolvedTheme(): Theme {
  const explicit = document.documentElement.dataset.theme;
  if (explicit === "light" || explicit === "dark") return explicit;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    setTheme(resolvedTheme());
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => setTheme(resolvedTheme());
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  const next: Theme = theme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      className="theme-toggle"
      aria-label={theme ? `Switch to ${next} theme` : "Toggle theme"}
      title={theme ? `Switch to ${next} theme` : "Toggle theme"}
      onClick={() => {
        document.documentElement.dataset.theme = next;
        try {
          localStorage.setItem(STORAGE_KEY, next);
        } catch {
          // Storage can be unavailable (private mode); the toggle still works.
        }
        setTheme(next);
      }}
    >
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
        {theme === "dark" ? (
          <>
            <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.75" />
            <path
              d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="1.75"
            />
          </>
        ) : (
          <path
            d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z"
            stroke="currentColor"
            strokeLinejoin="round"
            strokeWidth="1.75"
          />
        )}
      </svg>
    </button>
  );
}
