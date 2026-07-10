import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { ResponsibleAIFooter } from "@/components/responsible-ai-footer";
import { ActivityProvider } from "@/lib/activity-store";
import { Toaster } from "@/components/ui/sonner";
import { Separator } from "@/components/ui/separator";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-heading font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-heading font-semibold">This page didn't load</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong. You can try again or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Dashboard — Draftsman" },
      {
        name: "description",
        content:
          "Your AI productivity command center. Draft emails, summarize meetings, and plan tasks in one place.",
      },
      { name: "author", content: "Draftsman" },
      { property: "og:title", content: "Dashboard — Draftsman" },
      {
        property: "og:description",
        content:
          "Your AI productivity command center. Draft emails, summarize meetings, and plan tasks in one place.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Dashboard — Draftsman" },
      { name: "twitter:description", content: "Your AI productivity command center. Draft emails, summarize meetings, and plan tasks in one place." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/68e11c51-b924-422f-8a47-e1d5a2238f2c/id-preview-57b4675f--5bf5d0ec-aab0-4918-84c2-56e9e0f02c00.lovable.app-1783684449020.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/68e11c51-b924-422f-8a47-e1d5a2238f2c/id-preview-57b4675f--5bf5d0ec-aab0-4918-84c2-56e9e0f02c00.lovable.app-1783684449020.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Epilogue:wght@300;400;500;600;700&family=Urbanist:wght@400;500;600;700;800&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <ActivityProvider>
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset className="bg-background">
            <header className="h-14 flex items-center gap-3 border-b px-4 md:px-6 sticky top-0 z-10 bg-background/80 backdrop-blur">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="h-4" />
              <span className="font-heading font-semibold text-sm tracking-tight">
                Workspace
              </span>
              <div className="ml-auto flex items-center gap-3">
                <span className="hidden sm:inline text-xs text-muted-foreground">
                  Signed in as Aris Thorne
                </span>
                <div className="size-8 rounded-full bg-secondary grid place-items-center text-[11px] font-semibold">
                  AT
                </div>
              </div>
            </header>
            <main className="flex-1">
              <div className="max-w-7xl mx-auto p-6 md:p-8">
                <Outlet />
              </div>
            </main>
            <ResponsibleAIFooter />
          </SidebarInset>
        </SidebarProvider>
        <Toaster />
      </ActivityProvider>
    </QueryClientProvider>
  );
}
