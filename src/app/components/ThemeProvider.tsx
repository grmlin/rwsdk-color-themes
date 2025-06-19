"use client";

import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { isTheme, setDocumentClassName, Theme } from "@/app/utils/theme";
import { setThemeFn } from "@/app/functions/theme-functions";

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme | null;
}

interface ThemeProviderState {
  theme: Theme;
  setTheme: (theme: Theme) => Promise<void>;
}

export const ThemeProviderContext = createContext<
  ThemeProviderState | undefined
>(undefined);

export function ThemeProvider({ children, defaultTheme }: ThemeProviderProps) {
  /**
   * local theme state reflecting the current theme.
   * Updating the cookie won't rerender the `Document`, so we have to track it here.
   */
  const [themeState, setThemeState] = useState<Theme>(() => {
    return defaultTheme ?? "system";
  });

  /**
   * Calback to persist the theme change in a cookie
   */
  const persistTheme = useCallback(async (theme: Theme) => {
    if (isTheme(theme)) {
      // update the local theme state
      setThemeState(theme);
      // update the document class name
      setDocumentClassName(theme);
      // call the server function to set the theme cookie
      await setThemeFn(theme);
    }
  }, []);

  /**
   * memoize the context value to avoid unnecessary re-renders
   */
  const contextValue = useMemo(
    () => ({
      theme: themeState,
      setTheme: async (theme: Theme) => {
        await persistTheme(theme);
      },
    }),
    [persistTheme, themeState]
  );

  return (
    <ThemeProviderContext value={contextValue}>{children}</ThemeProviderContext>
  );
}
