import { makeRouteHandler } from "@keystatic/next/route-handler";
import keystaticConfig from "@/../keystatic.config";

const { POST: _POST, GET: _GET } = makeRouteHandler({
  config: keystaticConfig,
});

// Fix request URL for OAuth flow:
// 1. Use X-Forwarded-Host so callback URLs use the router domain
// 2. Strip basePath so redirect_uri matches between login and callback
function fixRequestUrl(
  handler: (req: Request) => Promise<Response>
): (req: Request) => Promise<Response> {
  return async (req: Request) => {
    const forwardedHost = req.headers.get("x-forwarded-host");
    if (forwardedHost) {
      const url = new URL(req.url);
      url.host = forwardedHost;
      url.protocol = "https:";
      // Strip basePath from the path so it matches the login redirect_uri
      const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
      if (basePath && url.pathname.startsWith(basePath)) {
        url.pathname = url.pathname.slice(basePath.length);
      }
      req = new Request(url.toString(), req);
    }
    return handler(req);
  };
}

export const GET = fixRequestUrl(_GET);
export const POST = fixRequestUrl(_POST);
