import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/landing-a/:path*",
        destination:
          "https://next-test-goit-landing-a.vercel.app/landing-a/:path*",
      },
      {
        source: "/landing-b/:path*",
        destination:
          "https://next-test-goit-landing-b.vercel.app/landing-b/:path*",
      },
    ];
  },
};

export default nextConfig;
