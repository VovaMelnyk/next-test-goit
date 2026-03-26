import { NextRequest, NextResponse } from "next/server";

const LANDING_MAP: Record<string, string> = {
  "landing-a": "https://next-test-goit-landing-a.vercel.app",
  "landing-b": "https://next-test-goit-landing-b.vercel.app",
};

function getLandingFromRequest(request: NextRequest): [string, string] | null {
  // Check Referer header
  const referer = request.headers.get("referer") || "";
  for (const [prefix, destination] of Object.entries(LANDING_MAP)) {
    if (referer.includes(`/${prefix}`)) {
      return [prefix, destination];
    }
  }

  // Check cookie (set by Keystatic page)
  const cookie = request.cookies.get("keystatic-landing")?.value;
  if (cookie && LANDING_MAP[cookie]) {
    return [cookie, LANDING_MAP[cookie]];
  }

  return null;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Direct landing routes: /landing-a/... → landing-a project
  for (const [prefix, destination] of Object.entries(LANDING_MAP)) {
    if (pathname === `/${prefix}` || pathname.startsWith(`/${prefix}/`)) {
      const url = new URL(pathname, destination);
      url.search = request.nextUrl.search;

      return NextResponse.rewrite(url, {
        headers: {
          host: new URL(destination).host,
          "x-forwarded-host": request.headers.get("host") || "",
        },
      });
    }
  }

  // Keystatic routes without basePath: /keystatic/... or /api/keystatic/...
  if (
    pathname.startsWith("/keystatic") ||
    pathname.startsWith("/api/keystatic")
  ) {
    const landing = getLandingFromRequest(request);

    if (landing) {
      const [prefix, destination] = landing;
      const url = new URL(`/${prefix}${pathname}`, destination);
      url.search = request.nextUrl.search;

      return NextResponse.rewrite(url, {
        headers: {
          host: new URL(destination).host,
          "x-forwarded-host": request.headers.get("host") || "",
        },
      });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/landing-a/:path*",
    "/landing-b/:path*",
    "/keystatic/:path*",
    "/api/keystatic/:path*",
  ],
};
