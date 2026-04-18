import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  reactStrictMode: false,
  transpilePackages: ["@t3-oss/env-nextjs", "@t3-oss/env-core"],
  experimental: {
    optimizePackageImports: ["@mantine/core", "@mantine/hooks"],
  },
  allowedDevOrigins: ["pdf.uplax-dev.localhost"],
};

export default nextConfig;
