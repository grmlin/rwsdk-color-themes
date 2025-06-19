import { Document } from "@/app/Document";
import { setCommonHeaders } from "@/app/headers";
import { Home } from "@/app/pages/Home";
import { userRoutes } from "@/app/pages/user/routes";
import { isTheme, Theme } from "@/app/utils/theme";
import { type User, db, setupDb } from "@/db";
import { env } from "cloudflare:workers";
import * as cookie from "cookie";
import { layout, prefix, render, route } from "rwsdk/router";
import { defineApp, ErrorResponse } from "rwsdk/worker";
import { Session } from "./session/durableObject";
import { sessions, setupSessionStore } from "./session/store";
import { Root } from "@/app/pages/Root";
import { AppLayout } from "@/app/components/AppLayout";
export { SessionDurableObject } from "./session/durableObject";

export type AppContext = {
  session: Session | null;
  user: User | null;
  theme: Theme | null;
};

export default defineApp([
  setCommonHeaders(),
  async ({ ctx, request, headers }) => {
    await setupDb(env);
    setupSessionStore(env);

    try {
      ctx.session = await sessions.load(request);
    } catch (error) {
      if (error instanceof ErrorResponse && error.code === 401) {
        await sessions.remove(request, headers);
        headers.set("Location", "/user/login");

        return new Response(null, {
          status: 302,
          headers,
        });
      }

      throw error;
    }

    if (ctx.session?.userId) {
      ctx.user = await db.user.findUnique({
        where: {
          id: ctx.session.userId,
        },
      });
    }
  },
  // read the current theme from the theme cookie
  async ({ ctx, request }) => {
    let theme;
    try {
      const cookies = cookie.parse(request.headers.get("Cookie") ?? "");
      if (isTheme(cookies.theme)) {
        theme = cookies.theme;
      }
    } catch (error) {
      console.log("Error parsing cookies:", error);
    }
    ctx.theme = isTheme(theme) ? theme : "system";
  },
  render(Document, layout(AppLayout, [
    route("/", [Root]),
    route("/protected", [
      ({ ctx }) => {
        if (!ctx.user) {
          return new Response(null, {
            status: 302,
            headers: { Location: "/user/login" },
          });
        }
      },
      Home,
    ]),
    prefix("/user", userRoutes),
  ])),
]);
