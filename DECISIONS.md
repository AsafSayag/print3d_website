# DECISIONS — Print3D Homepage

Non-trivial choices made while building, and why.

## Stack
- **Next.js 16 (App Router)** — the brief specified Next 15, but `create-next-app@latest`
  installs 16 (React 19, Tailwind v4, Turbopack by default). 16 is a superset for our
  needs; no App-Router APIs we use changed. Static export of a single page.
- **framer-motion** used only for scroll-in reveals (`Reveal`, whileInView) and small
  UI transitions (drawer, FAQ). NOT used for the hero reveal or the sequence (see below).

## Hero reveal is CSS, not framer
`framer-motion` reliably plays a component's **mount** animation, but in this
React 19 / Next 16 setup a **late `animate`-prop change** (revealed flips ~3.5s after
mount, once the video ends) did not re-trigger the animation. Verified in-browser:
`revealed` state was `true` yet the motion elements stayed in their hidden values.
The hero content reveal is therefore driven by **plain CSS transitions** toggled on the
`revealed` boolean — this animates reliably on a delayed state change, keeps the `<h1>`
in the DOM from first paint (SEO/LCP), and is GPU-cheap. The scroll hint bounce is a CSS
keyframe for the same reason.

## Hero: desktop video vs mobile poster
Per the brief (and clarified with the client), the "היכל המודלים" video is a
desktop-only background. Detection uses `(max-width: 768px), (pointer: coarse)` — so
touch devices get the static `hero-poster-mobile.jpg` and content appears immediately.
The video is sped up (`playbackRate 1.45`) so its 5.04s source runs in ~3.5s, and the
logo/heading/buttons only fade in **after** the video ends (client's explicit request,
overriding the mid-play reveal timings in the original spec). Fallback: if the video has
not started within 2.5s, content reveals over the poster.

## ScrollSequence (the critical component)
- **Vanilla Canvas + rAF**, no library. A tall outer container (240–320vh) creates the
  scroll "cost"; a `position: sticky` inner viewport pins it. Scroll position → target
  frame; each rAF eases `current` toward `target` (0.15) so motion is smooth and
  bidirectional by scroll velocity, releasing naturally at both ends.
- Source video is **16:9** (3852×2152), not square — so the module is a centered 16:9
  card (`min(720px, 86vw)`) on `--navy-950`, framed like a museum object. Not full-bleed.
- **121 WebP frames**, desktop 1120w (~2.2MB) / mobile 720w (~1.2MB). Staged load: first
  20 eagerly, the rest in the background; nearest-loaded frame is drawn so the canvas is
  never blank. A `setTimeout(begin, 800)` fallback guarantees loading even if the
  IntersectionObserver never fires (it didn't in headless preview).
- Canvas reveal (`ready`) is set on the **first successful paint** (guarded by a ref),
  which is robust against the React StrictMode double-invoke that could swallow the
  frame-0 `onload`.
- Fallbacks: `prefers-reduced-motion` → static last-frame `<img>`, no pin.

## Assets
Real assets pulled from print3d.ltd: 6 full-resolution model photos (used in Services +
Portfolio) and the logo reference. The wordmark is rebuilt as crisp type (Montserrat)
with the signature tilted steel cube, so it stays sharp at any size and inverts cleanly
for dark/light surfaces. Client logos render as refined text wordmarks in the marquee.
Brochure is a placeholder one-page PDF until the real file is supplied.

## Typography
Frank Ruhl Libre (display, 500/700) · Assistant (body, 400/600) · Montserrat
(numbers/Latin, 500/700), all via `next/font/google` with hebrew+latin subsets.

## Gold discipline
Gold (`--gold-500`) appears only on the primary CTA, the thin accent line under section
headings, and stat numbers — nowhere else, per the brief.