import "react";

/**
 * Types for Google's preferred-sources widget.
 * See src/components/PreferredSource.tsx.
 */
declare module "react" {
  // `T` is unused but must be declared to merge with React's own
  // HTMLAttributes<T>; dropping it changes the signature and the merge fails.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface HTMLAttributes<T> {
    /** Google's publisher.js locates its button container by this bare,
     *  valueless HTML attribute, which isn't part of React's known DOM prop
     *  set. Declared here instead of forcing a cast at the usage site. */
    "google-add-preferred-source-btn"?: "";
  }
}

declare global {
  interface PreferredSourceApi {
    /** Renders the button into every `google-add-preferred-source-btn`
     *  container currently in the document. Safe to call repeatedly. */
    init(options: { theme?: "light" | "dark"; lang?: string }): void;
    /** Opens the "add as preferred source" flow. For binding to custom UI —
     *  unused while we render Google's own button. */
    addPreferredSource(): void;
  }

  /** Callback queue. Before publisher.js loads this is a plain array; after,
   *  it's an object whose `push` invokes the callback immediately. Both shapes
   *  accept `.push(fn)`, which is what makes the idiom safe to call at any
   *  point in the load cycle — so only that one method is modelled. */
  interface PreferredSourceQueue {
    push(callback: (api: PreferredSourceApi) => void): void;
  }

  interface Window {
    PREFERRED_SOURCE?: PreferredSourceQueue;
  }
}
