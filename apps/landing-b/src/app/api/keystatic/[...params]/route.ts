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
      req = new Request(url.toString(), req);
    }
    return handler(req);
  };
}

export const GET = fixRequestUrl(_GET);
export const POST = fixRequestUrl(_POST);
