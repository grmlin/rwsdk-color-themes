import { AppContext } from "@/worker";
import styles from "./global.css?url";

export const Document: React.FC<{
  children: React.ReactNode;
  ctx: AppContext;
}> = ({ children, ctx }) => (
  <html lang="en" className={ctx.theme !== "system" ? ctx.theme ?? "" : ""}>
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>@redwoodjs/starter-standard</title>
      <link rel="modulepreload" href="/src/client.tsx" />
      <link rel="stylesheet" href={styles} />

      {/* 
        Set the initial theme based on the system preferences, if the theme is 'system'. 
        This script should run in the head of the document to prevent any flashes of bright/dark content
      */}
      {ctx.theme === "system" && (
        <script>
          {`
            try {
              const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
                                .matches
                                ? 'dark'
                                : 'light';
              window.document.documentElement.classList.add(systemTheme)
            } catch (error) {
              console.error('Error setting system theme:', error)
            }
      `}
        </script>
      )}
    </head>
    <body>
      <div id="root">{children}</div>
      <script>import("/src/client.tsx")</script>
    </body>
  </html>
);
