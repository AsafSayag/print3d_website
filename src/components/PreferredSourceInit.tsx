"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Renders (and re-renders) the preferred-sources button. See PreferredSource.
 *
 * This exists because publisher.js only scans the document once, on load. It
 * has no route awareness, while the container it fills is in the footer of
 * every page: after a client-side navigation React hands it a *fresh, empty*
 * container node and the button silently disappears. Re-running `init` on each
 * pathname change puts it back.
 *
 * The script is loaded with `preferred-sources-control="manual"` so its own
 * auto-init stays out of the way and this effect is the single thing that ever
 * initializes the button — first paint included.
 *
 * `push` is Google's documented queue idiom and is deliberately used over
 * touching the API object directly: before the script loads it appends to a
 * plain array that gets drained on load, and after, it invokes the callback
 * immediately. So this is correct no matter which order the two land in — and
 * with `lazyOnload` the effect usually does run first.
 */
export function PreferredSourceInit({
  theme,
  lang,
}: {
  theme: "light" | "dark";
  lang: string;
}) {
  const pathname = usePathname();

  useEffect(() => {
    // The cast covers the queue's pre-load shape: a bare `[]`, which only
    // structurally matches PreferredSourceQueue once publisher.js swaps it for
    // the real object.
    const queue = (window.PREFERRED_SOURCE ??= [] as unknown as PreferredSourceQueue);
    queue.push((api) => {
      api.init({ theme, lang });
    });
  }, [pathname, theme, lang]);

  return null;
}
