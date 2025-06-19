import { ThemeProviderContext } from "@/app/components/ThemeProvider";
import { use } from "react";

export function useTheme() {
  const context = use(ThemeProviderContext);

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
}
