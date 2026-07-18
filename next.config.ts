import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Hide the Next.js dev-tools indicator (bottom-left) so it doesn't overlap
     the Hebrew accessibility widget. Dev-only; has no effect in production. */
  devIndicators: false,

  /* Permanent (308) redirects from the old URL architecture to the new one.
     Kept indefinitely so existing links / indexed pages resolve cleanly.
       /blog       → /knowledge        (it's a knowledge center, not a blog)
       /blog/:slug → /knowledge/:slug  (articles live under the hub)
       /portfolio  → /projects         (listing shares its items' prefix) */
  async redirects() {
    return [
      { source: "/blog", destination: "/knowledge", permanent: true },
      { source: "/blog/:slug", destination: "/knowledge/:slug", permanent: true },
      { source: "/portfolio", destination: "/projects", permanent: true },
    ];
  },
};

export default nextConfig;
