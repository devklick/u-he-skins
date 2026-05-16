import { useEffect, useState } from "react";

const themes = ["light", "dark"] as const;
type Theme = (typeof themes)[number];

function isTheme(value: unknown): value is Theme {
  return typeof value === "string" && themes.includes(value as Theme);
}

type UseThemeReturn = [Theme, { toggle: () => void }];

export function useTheme(): UseThemeReturn {
  const [theme, _setTheme] = useState<Theme>("light");

  useEffect(() => {
    const userTheme = localStorage.getItem("theme");

    if (userTheme && isTheme(userTheme)) {
      setTheme(userTheme);
      return;
    }

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    setTheme(media.matches ? "dark" : "light");

    const updateTheme = (event: MediaQueryListEvent) => {
      const newTheme = event.matches ? "dark" : "light";
      setTheme(newTheme);
    };

    media.addEventListener("change", updateTheme);

    return () => media.removeEventListener("change", updateTheme);
  }, []);

  const setTheme = (newTheme: Theme) => {
    _setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const toggle = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return [theme, { toggle }];
}
