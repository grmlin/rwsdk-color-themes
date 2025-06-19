import { AppProviders } from "@/app/components/AppProviders";
import { LayoutProps } from "rwsdk/router";

/**
 * A base layout, has to be a server component to access the request info and context
 */
export function AppLayout({ children, requestInfo }: LayoutProps) {
  return (
    <AppProviders defaultTheme={requestInfo?.ctx?.theme}>
      {children}
    </AppProviders>
  );
}
