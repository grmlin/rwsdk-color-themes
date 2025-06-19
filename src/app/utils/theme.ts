export const appThemes = ["light", "dark", "system"] as const;
export type Theme = (typeof appThemes)[number];

export function isTheme(value: unknown): value is Theme {
  return appThemes.includes(value as Theme);
}

export function setDocumentClassName(theme: Theme) {
  const root = globalThis.document?.documentElement;

  if (root != null) {
    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = globalThis.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";

      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }
}
