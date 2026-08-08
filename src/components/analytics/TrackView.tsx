"use client";

import { useEffect, useRef } from "react";
import { trackEvent } from "@/lib/analyticsClient";
import type { AnalyticsEventName, AnalyticsParams } from "@/lib/analytics";

/**
 * View-event trackers for the two content types worth counting individually:
 * project case studies and knowledge-centre articles.
 *
 * Both render `null` and take only plain strings, so the pages using them stay
 * Server Components — the parent resolves the project/article on the server and
 * passes down the handful of values that describe it. Nothing is measured in
 * the browser that the server did not already know, so there is nothing that
 * can hydrate differently.
 */

/**
 * Fires `event` once per distinct payload. The payload doubles as the effect's
 * dependency and as the de-duplication key, which means React 19's remount of
 * effects in development cannot double-count, while a client-side navigation to
 * a different project or article — where the component instance is reused and
 * only the props change — correctly reports a new view.
 */
function useViewEvent<E extends AnalyticsEventName>(
  event: E,
  params: AnalyticsParams[E]
) {
  const payload = JSON.stringify(params);
  const sentRef = useRef<string | null>(null);

  useEffect(() => {
    const signature = `${event}|${payload}`;
    if (sentRef.current === signature) return;
    sentRef.current = signature;
    trackEvent(event, JSON.parse(payload) as AnalyticsParams[E]);
  }, [event, payload]);
}

export function TrackProjectView({
  projectName,
  projectCategory,
  projectSlug,
}: {
  projectName: string;
  projectCategory?: string;
  projectSlug?: string;
}) {
  useViewEvent("project_view", {
    project_name: projectName,
    project_category: projectCategory,
    project_slug: projectSlug,
  });
  return null;
}

export function TrackArticleView({
  articleName,
  articleCategory,
  articleSlug,
}: {
  articleName: string;
  articleCategory?: string;
  articleSlug?: string;
}) {
  useViewEvent("article_view", {
    article_name: articleName,
    article_category: articleCategory,
    article_slug: articleSlug,
  });
  return null;
}
