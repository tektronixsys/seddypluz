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
import siteIconUrl from "../assets/logo-icon.png";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Toaster } from "sonner";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <p className="eyebrow text-lavender-deep">404</p>
        <h1 className="mt-4 font-display text-5xl text-foreground">Page not found</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          The page you're looking for has drifted away like petals in the wind.
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center justify-center border border-plum/40 bg-plum px-6 py-3 text-xs uppercase tracking-[0.3em] text-ivory transition-colors hover:bg-lavender-deep"
          >
            Return home
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
        <h1 className="font-display text-3xl text-foreground">Something didn't bloom</h1>
        <p className="mt-2 text-sm text-muted-foreground">Try refreshing or return home.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="border border-plum/40 bg-plum px-5 py-2.5 text-xs uppercase tracking-[0.3em] text-ivory hover:bg-lavender-deep"
          >
            Try again
          </button>
          <a
            href="/"
            className="border border-plum/40 px-5 py-2.5 text-xs uppercase tracking-[0.3em] text-plum hover:bg-blush"
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
      { title: "Seddypluz Beauty Studio — Bridal & Editorial Makeup Artistry" },
      {
        name: "description",
        content:
          "Luxury bridal makeup, gele styling, beauty transformations & training by Seddypluz Beauty Studio. Where artistry meets elegance.",
      },
      { name: "author", content: "Seddypluz Beauty Studio" },
      {
        property: "og:title",
        content: "Seddypluz Beauty Studio — Bridal & Editorial Makeup Artistry",
      },
      {
        property: "og:description",
        content:
          "Luxury bridal makeup, gele styling, beauty transformations & training. Where artistry meets elegance.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: siteIconUrl, type: "image/png" },
      { rel: "shortcut icon", href: siteIconUrl, type: "image/png" },
      { rel: "apple-touch-icon", href: siteIconUrl },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "icon", href: "/site-icon.png", type: "image/png" },
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
      <Outlet />
      <Toaster />
    </QueryClientProvider>
  );
}
