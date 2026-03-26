import type { NextConfig } from "next";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  basePath,
  async rewrites() {
    if (!basePath) return [];
    return {
      beforeFiles: [
        {
          source: "/api/keystatic/:path*",
          destination: `${basePath}/api/keystatic/:path*`,
          basePath: false,
        },
      ],
    };
  },
};

export default nextConfig;
