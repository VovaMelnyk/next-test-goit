import { makeRouteHandler } from "@keystatic/next/route-handler";
import keystaticConfig from "@/../keystatic.config";

const { POST: _POST, GET: _GET } = makeRouteHandler({
  config: keystaticConfig,
});

function fixRequestUrl(
  handler: (req: Request) => Promise<Response>
): (req: Request) => Promise<Response> {
  return async (req: Request) => {
    const forwardedHost = req.headers.get("x-forwarded-host");
    if (forwardedHost) {
      const url = new URL(req.url);
      url.host = forwardedHost;
      url.protocol = "https:";
      const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
      if (basePath && url.pathname.startsWith(basePath)) {
        url.pathname = url.pathname.slice(basePath.length);
      }
      const init: RequestInit = {
        method: req.method,
        headers: req.headers,
        redirect: req.redirect,
      };
      if (req.method !== "GET" && req.method !== "HEAD") {
        init.body = req.body;
        // @ts-expect-error duplex is required for streaming bodies
        init.duplex = "half";
      }
      req = new Request(url.toString(), init);
    }
    return handler(req);
  };
}

export const GET = fixRequestUrl(_GET);
export const POST = fixRequestUrl(_POST);
