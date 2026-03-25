import { NextRequest, NextResponse } from "next/server";

const LANDING_MAP: Record<string, string> = {
  "landing-a": "https://next-test-goit-landing-a.vercel.app",
  "landing-b": "https://next-test-goit-landing-b.vercel.app",
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Direct landing routes: /landing-a/... → landing-a project
  for (const [prefix, destination] of Object.entries(LANDING_MAP)) {
    if (pathname === `/${prefix}` || pathname.startsWith(`/${prefix}/`)) {
      const url = new URL(pathname, destination);
      url.search = request.nextUrl.search;

      return NextResponse.rewrite(url, {
        headers: { host: new URL(destination).host },
      });
    }
  }

  // Keystatic API calls without basePath: /api/keystatic/...
  // Determine which landing based on Referer header
  if (pathname.startsWith("/api/keystatic")) {
    const referer = request.headers.get("referer") || "";
    for (const [prefix, destination] of Object.entries(LANDING_MAP)) {
      if (referer.includes(`/${prefix}`)) {
        const url = new URL(`/${prefix}${pathname}`, destination);
        url.search = request.nextUrl.search;

        return NextResponse.rewrite(url, {
          headers: { host: new URL(destination).host },
        });
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/landing-a/:path*", "/landing-b/:path*", "/api/keystatic/:path*"],
};
