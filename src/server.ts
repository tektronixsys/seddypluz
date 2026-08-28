import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m.default ?? m) as ServerEntry,
    );
  }
  return serverEntryPromise;
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!isH3SwallowedErrorBody(body)) return response;

  const captured = consumeLastCapturedError();
  const errorObj = captured ?? new Error(`h3 swallowed SSR error: ${body}`);
  console.error(errorObj);
  return new Response(renderErrorPage(errorObj), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function isH3SwallowedErrorBody(body: string): boolean {
  try {
    const payload = JSON.parse(body) as { unhandled?: unknown; message?: unknown };
    return payload.unhandled === true && payload.message === "HTTPError";
  } catch {
    return false;
  }
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    const url = new URL(request.url);
    const isRpcOrApi =
      url.pathname.startsWith("/_serverFn") ||
      url.pathname.startsWith("/api") ||
      url.pathname.startsWith("/_build") ||
      request.headers.get("accept")?.includes("application/json");

    try {
      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);

      // Never replace API or server function RPC responses (_serverFn) with HTML
      if (isRpcOrApi) {
        return response;
      }

      return await normalizeCatastrophicSsrResponse(response);
    } catch (error) {
      console.error("Fatal SSR server handler error:", error);
      if (isRpcOrApi) {
        return new Response(
          JSON.stringify({
            error: true,
            message: error instanceof Error ? error.message : String(error),
          }),
          {
            status: 500,
            headers: { "content-type": "application/json" },
          },
        );
      }
      return new Response(renderErrorPage(error), {
        status: 500,
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }
  },
};
