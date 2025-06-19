"use client";

import { ThemeProvider } from "@/app/components/ThemeProvider";
import { Theme } from "@/app/utils/theme";

/**
 * Application providers used for the app.
 *
 * The theme provider has to be mounted inside a client component. The context won't be
 * available otherwise.
 */
export function AppProviders({
  children,
  defaultTheme,
}: {
  children: React.ReactNode;
  defaultTheme?: Theme | null;
}) {
  return <ThemeProvider defaultTheme={defaultTheme}>{children}</ThemeProvider>;
}
