import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Hide the Next.js dev-tools indicator (bottom-left) so it doesn't overlap
     the Hebrew accessibility widget. Dev-only; has no effect in production. */
  devIndicators: false,

  experimental: {
    /* Inline the (small, Tailwind-atomic) CSS into <head> as <style> instead of
       a render-blocking <link>. Removes the CSS request from the critical path
       → faster FCP/LCP for first-time visitors. Production-only; no effect in
       dev. Trade-off: returning visitors re-download the ~21KB CSS with the HTML
       rather than from cache — acceptable for a marketing site where first-load
       (ads / search landings) is what's measured. */
    inlineCss: true,
  },

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

  /* Baseline security headers — there was none of this before. `script-src`/
     `style-src` need 'unsafe-inline' because the app has no CSP-nonce plumbing:
     Next's own hydration payload and every `dangerouslySetInnerHTML` JSON-LD
     block are unnonced inline <script>s, and `experimental.inlineCss` above
     puts Tailwind's CSS inline too. That keeps this CSP from stopping inline
     script injection — it still blocks loading a stranger's script/iframe/
     object from a third-party origin, clickjacking (frame-ancestors), and
     form-hijacking (form-action). Tightening it to nonces later would close
     the remaining gap, but that's a separate, larger change (needs
     middleware.ts to mint a nonce and every JsonLd usage to receive it). */
  async headers() {
    const csp = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: https:",
      "font-src 'self' data:",
      "frame-src https://www.google.com",
      "connect-src 'self'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'self'",
    ].join("; ");

    return [
      {
        source: "/:path*",
        headers: [
          { key: "Content-Security-Policy", value: csp },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Strict-Transport-Security",
            value: "max-age=15552000; includeSubDomains",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
