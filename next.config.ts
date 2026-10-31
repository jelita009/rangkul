import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        // Gunakan nama unik seperti /backend-api agar tidak bentrok dengan rute lokal Next.js
        source: '/backend-api/:path*',
        destination: 'https://rangkul.bangkah.tech/api/v1/:path*',
      },
    ];
  },
  /* config options */
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;