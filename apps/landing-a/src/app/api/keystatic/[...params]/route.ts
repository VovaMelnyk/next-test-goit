import { makeRouteHandler } from "@keystatic/next/route-handler";
import keystaticConfig from "@/../keystatic.config";

const { POST: _POST, GET: _GET } = makeRouteHandler({
  config: keystaticConfig,
});

// Replace request URL host with X-Forwarded-Host if present
// so OAuth callback URLs use the router domain, not the landing domain
function withForwardedHost(
  handler: (req: Request) => Promise<Response>
): (req: Request) => Promise<Response> {
  return async (req: Request) => {
    const forwardedHost = req.headers.get("x-forwarded-host");
    if (forwardedHost) {
      const url = new URL(req.url);
      url.host = forwardedHost;
      url.protocol = "https:";
      req = new Request(url.toString(), req);
    }
    return handler(req);
  };
}

export const GET = withForwardedHost(_GET);
export const POST = withForwardedHost(_POST);
