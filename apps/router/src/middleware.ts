import { NextRequest, NextResponse } from "next/server";

const LANDING_MAP: Record<string, string> = {
  "landing-a": "https://next-test-goit-landing-a.vercel.app",
  "landing-b": "https://next-test-goit-landing-b.vercel.app",
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  for (const [prefix, destination] of Object.entries(LANDING_MAP)) {
    if (pathname === `/${prefix}` || pathname.startsWith(`/${prefix}/`)) {
      const url = new URL(pathname, destination);
      url.search = request.nextUrl.search;

      return NextResponse.rewrite(url, {
        headers: { host: new URL(destination).host },
      });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/landing-a/:path*", "/landing-b/:path*"],
};
