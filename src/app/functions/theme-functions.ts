"use server";

import { isTheme, Theme } from "@/app/utils/theme";
import { requestInfo } from "rwsdk/worker";

export async function setThemeFn(theme: Theme) {
  if (isTheme(theme)) {
    const { headers } = requestInfo;
    console.log("Setting theme:", theme);
    headers.set(
      "Set-Cookie",
      `theme=${theme}; Path=/; HttpOnly; Secure; SameSite=Lax`
    );

    return theme;
  }
}
