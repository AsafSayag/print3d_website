"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import { usePathname } from "next/navigation";

/** How far below the viewport the footer may still be when publisher.js starts
 *  loading — roughly two phone screens, so the button is usually rendered by
 *  the time the reader actually reaches it. */
const LOAD_MARGIN = "0px 0px 1500px 0px";

/**
 * Renders the preferred-sources container, loads publisher.js once it nears
 * the viewport, and (re)initializes the button. See PreferredSource.
 *
 * Deferred loading: an IntersectionObserver on the container flips `near`, and
 * only then is the <Script> rendered. next/script dedupes by `id`, so after a
 * client-side navigation (fresh component instance) the script is not fetched
 * a second time.
 *
 * Re-init: publisher.js only scans the document once, on load. It has no route
 * awareness, while the container it fills is in the footer of every page:
 * after a client-side navigation React hands it a *fresh, empty* container node
 * and the button silently disappears. Re-running `init` on each pathname change
 * (once the script is wanted) puts it back.
 *
 * The script is loaded with `preferred-sources-control="manual"` so its own
 * auto-init stays out of the way and this effect is the single thing that ever
 * initializes the button — first paint included.
 *
 * `push` is Google's documented queue idiom and is deliberately used over
 * touching the API object directly: before the script loads it appends to a
 * plain array that gets drained on load, and after, it invokes the callback
 * immediately. So this is correct no matter which order the two land in.
 */
export function PreferredSourceInit({
  theme,
  lang,
}: {
  theme: "light" | "dark";
  lang: string;
}) {
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement | null>(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const el = ref.current;
    // IntersectionObserver is in every browser .browserslistrc targets.
    if (!el || near) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: LOAD_MARGIN },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [near]);

  useEffect(() => {
    if (!near) return;
    // The cast covers the queue's pre-load shape: a bare `[]`, which only
    // structurally matches PreferredSourceQueue once publisher.js swaps it for
    // the real object.
    const queue = (window.PREFERRED_SOURCE ??= [] as unknown as PreferredSourceQueue);
    queue.push((api) => {
      api.init({ theme, lang });
    });
  }, [near, pathname, theme, lang]);

  return (
    <>
      <div
        ref={ref}
        google-add-preferred-source-btn=""
        data-theme={theme}
        data-lang={lang}
        className="min-h-[60px] w-full"
      />
      {near && (
        <Script
          id="google-preferred-source"
          strategy="afterInteractive"
          preferred-sources-control="manual"
          src="https://news.google.com/swg/js/v1/publisher.js"
        />
      )}
    </>
  );
}
