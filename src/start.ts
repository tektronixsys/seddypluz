import { createStart, createMiddleware } from "@tanstack/react-start";

import { renderErrorPage } from "./lib/error-page";

const errorMiddleware = createMiddleware().server(async ({ next }) => {
  try {
    return await next();
  } catch (error) {
    // Re-throw errors that already have a status code (framework-level redirects, etc.)
    if (error != null && typeof error === "object" && "statusCode" in error) {
      throw error;
    }

    console.error("[Start Middleware Error]:", error);

    // Re-throw the error — let TanStack Start's own handler serialize it
    // as JSON for _serverFn calls. Only produce HTML for page-level SSR
    // requests, but even there, prefer re-throwing so server.ts handles it.
    throw error;
  }
});

export const startInstance = createStart(() => ({
  requestMiddleware: [errorMiddleware],
}));
