import { AppProviders } from "@/app/components/AppProviders";
import { ThemeProvider } from "@/app/components/ThemeProvider";
import { ThemeToggle } from "@/app/components/ThemeToggle";
import { RequestInfo } from "rwsdk/worker";

export function Root() {
  return (
    <div>
      <ThemeToggle />
    </div>
  );
}
