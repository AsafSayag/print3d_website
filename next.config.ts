import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Hide the Next.js dev-tools indicator (bottom-left) so it doesn't overlap
     the Hebrew accessibility widget. Dev-only; has no effect in production. */
  devIndicators: false,
};

export default nextConfig;
