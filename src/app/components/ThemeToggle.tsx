"use client";

import { useTheme } from "@/app/hooks/use-theme";
import { isTheme } from "@/app/utils/theme";
import { ChangeEvent, useCallback } from "react";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  const handleThemeChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const theme = event.target.value;
      if (isTheme(theme)) {
        await setTheme(theme);
      }
    },
    [setTheme]
  );

  return (
    <>
      <h3>Change theme</h3>
      <div>
        <input
          type="radio"
          id="light"
          name="theme"
          value="light"
          checked={theme === "light"}
          onChange={handleThemeChange}
        />
        <label htmlFor="light">Light</label>
      </div>
      <div>
        <input
          type="radio"
          id="dark"
          name="theme"
          value="dark"
          checked={theme === "dark"}
          onChange={handleThemeChange}
        />
        <label htmlFor="dark">Dark</label>
      </div>
      <div>
        <input
          type="radio"
          id="system"
          name="theme"
          value="system"
          checked={theme === "system"}
          onChange={handleThemeChange}
        />
        <label htmlFor="system">System</label>
      </div>
    </>
  );
}
