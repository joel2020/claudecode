import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Route renamed in the dental-first rebuild (Stage 4).
      { source: "/hospitals", destination: "/clinics", permanent: true },
      { source: "/hospitals/:slug", destination: "/clinics/:slug", permanent: true },
    ];
  },
};

export default nextConfig;
