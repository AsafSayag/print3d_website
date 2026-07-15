# Project Page Builder

Runbook for creating a new `/projects/<slug>` case-study page. Every project is
its own hand-built folder — there is **no `[slug]` dynamic route**. All four
existing projects (`gindi-kfar-azar`, `dafna-tidhar`, `sela-baitar-hadera`,
`shbiro-rishon-letzion`) follow the one canonical design described here; copy the
closest one and swap its values.

## The design — two signature sections

Every project page is composed in `_components/ProjectView.tsx` as:

```
main
 ├─ HeroSlider    ← SECTION 1: crossfade image carousel (from gindi)
 ├─ TechnicalSpec ← SECTION 2: dark מפרט טכני over a bg image, with a
 │                             frosted-glass, centered spec panel (from shbiro)
 ├─ Gallery
 ├─ AboutProject  (optional — include when the project has "about" copy)
 ├─ Faq
 └─ Footer
```

**Section 1 — `HeroSlider`** (`_components/HeroSlider.tsx`): a full-viewport
(`100svh`) image carousel that crossfades every 5s, with left/right arrows, dots,
and a scroll cue (`ScrollHint.tsx`). Any manual interaction pauses auto-advance.
It's a `"use client"` component; props are `{ slides, alt, eyebrow, title }`.

**Section 2 — `TechnicalSpec`** (`_components/TechnicalSpec.tsx`): a dark,
full-bleed section. A background photo (`SPEC_BG`) sits behind a heavy navy
shadow gradient; the spec rows render inside a **centered, frosted-glass panel**
(`backdrop-filter: blur(18px) saturate(150%)`, translucent white, rounded border)
so the text stays clearly legible over the photo. Heading and all rows are
center-aligned. `pending` rows show a dashed "להשלמה" pill with an optional hint.

Both `HeroSlider.tsx`, `TechnicalSpec.tsx`, `ScrollHint.tsx`, `Gallery.tsx`,
`AboutProject.tsx`, and `Lightbox.tsx` are generic and copied verbatim per
project — they take everything as data from the co-located `content.ts`.

## Inputs required from the Builder

Ask for all of these before starting. If any are missing, use the fallbacks
below rather than blocking. The three asset inputs map into `content.ts`
**respectively** as noted.

1. **Slug** — URL segment, e.g. `dafna-tidhar`.
2. **Title** (Hebrew) — e.g. `תדהר, דפנה`. → `HERO.title`
3. **Client name** — e.g. `תדהר`.
4. **Scale** — e.g. `1:100`. → `HERO.scale`
5. **Image paths** (the carousel + gallery set) — the full set of source images.
   No fixed count — **5 images is enough** for a full project page (hero +
   4 gallery shots feeding the carousel); don't ask the Builder for more than
   they have. **Always ask for these first and wait** before touching
   images. → `GALLERY_IMAGES`, which in turn feeds `HERO_SLIDES`.
6. **The hero image** — the "leader"/cover shot (first paint + catalog
   thumbnail). → `HERO.src`. And the **full-bleed hero** — the dramatic opening
   shot. → `FULL_BLEED_HERO`.
7. **The background image for מפרט טכני** — every project gets its own
   dedicated `bg_placeholder.webp`, distinct from `HERO.src`/`FULL_BLEED_HERO`
   (this is now the convention across all four projects). → `SPEC_BG`. If the
   Builder doesn't call one out explicitly, copy `FULL_BLEED_HERO` (or
   `HERO.src` if there's no full-bleed shot) into a new `bg_placeholder.webp`
   file as a starting point — never point `SPEC_BG` directly at another
   role's file path.
8. **Full מפרט טכני content** for every `SPECS` row — see below.

## Image fallback — only if the Builder cannot supply paths

If, after being asked directly, the Builder has no paths to give, you may source
images yourself — but only against explicit per-role specs, and confirm the
fallback source (existing repo assets, stock/generated placeholders) first.

- **`HERO.src` (leader/thumbnail)** — landscape, ~1600px+, one clear
  establishing view, uncluttered, reads well cropped to ~800px.
- **`FULL_BLEED_HERO`** — landscape, ~1920px+, the most dramatic/atmospheric
  shot; distinct from `HERO.src`.
- **`SPEC_BG`** — a moody, mostly-uniform shot that reads well heavily darkened
  behind text; saved as its own `bg_placeholder.webp` file (copy from
  `FULL_BLEED_HERO`/`HERO.src` if nothing dedicated is supplied — but always as
  a real, separate file on disk, not just a reused path).
- **Gallery images** — same model, varied angles, consistent lighting, ~1200px+.

## Rule: every image joins the hero loop

All images (hero + full-bleed + every gallery photo) appear in `HERO_SLIDES`,
with **no duplicates**. Derive it — don't hand-pick:

```ts
export const HERO_SLIDES = [
  FULL_BLEED_HERO,
  HERO.src,
  ...GALLERY_IMAGES.filter((src) => src !== FULL_BLEED_HERO && src !== HERO.src),
];
```

(`shbiro` has no `FULL_BLEED_HERO`, so it uses
`[HERO.src, ...GALLERY_IMAGES.filter((src) => src !== HERO.src)]`.)

## Build steps

1. **Convert AND resize images — never ship a raw camera/phone export.**
   Source photos routinely arrive at 12–24MP (4000px+ on the long edge);
   shipped as-is they bloat every page's hero and gallery for no visible
   quality gain (`next/image`/the browser downsizes on display anyway, but
   still has to download and decode the oversized original first). Before
   anything else, check each source image's longest edge:
   - **If it's over 2000px, resize it down to 2000px on the longest edge**
     (keep aspect ratio), *then* re-encode to `.webp -quality 82`. One-shot
     with ImageMagick: `magick <source> -resize '2000x2000>' -quality 82
     <dest>.webp` (the `>` means "only shrink, never enlarge" — safe to run
     on every file unconditionally). If the source is already a `.webp`,
     the same `magick` command works directly on it (it decodes and
     re-encodes in one step — no need for a separate `dwebp`/`cwebp` pass).
   - If it's already ≤2000px, `cwebp -q 82` (no resize) is enough.
   - This 2000px cap applies to **every** role — hero, full-bleed hero,
     `bg_placeholder`, and every gallery shot — including gallery images
     even though they also open in the full-screen `Lightbox`; 2000px is
     still sharp at typical monitor widths and the `Lightbox`'s own
     `sizes="92vw"` lets `next/image` downsize further per-device anyway.
   Then, into `public/project_pages/<slug_with_underscores>_project/` (all
   project-page asset folders live under the shared `public/project_pages/`
   directory, not directly in `public/`):
   - Hero → `<name>_hero.webp`
   - Full-bleed hero → `design_1_hero.webp`
   - מפרט טכני background → `bg_placeholder.webp` (its own dedicated file —
     every project has one; copy from the full-bleed hero if no separate shot
     was supplied)
   - Everything else → `IMG_01.webp`, `IMG_02.webp`, … (sequential, no gaps)
2. **Catalog thumbnail.** Resize the hero to ~800px wide →
   `public/projects/<slug>.webp` (`magick <source> -resize '800x' -quality 82
   <dest>.webp`, or `cwebp -q 82 -resize 800 0 …` from a non-webp source).
   This file feeds small grid/card thumbnails on `/portfolio` and the
   homepage — it must never be left at full source resolution (this has
   happened before: a project shipped with a 3024×4032, ~2MB "thumbnail").
3. **Create `src/app/projects/<slug>/`:**
   - `content.ts` — exports `SEO_TITLE_TAG`, `IMAGE_ALT`, `HERO` (with
     `eyebrow`, `title`, `scale`, `src`), `FULL_BLEED_HERO`, **`SPEC_BG`**,
     `SpecRow` type, `SPECS`, `ABOUT` (if used), `GALLERY_IMAGES`, `HERO_SLIDES`
     (per the rule above). Copy the shape from `dafna-tidhar/content.ts`.
   - `_components/ProjectView.tsx` — the layout above. Copy from an existing
     project; only the `content.ts` import path changes.
   - `_components/HeroSlider.tsx`, `ScrollHint.tsx`, `TechnicalSpec.tsx`,
     `Gallery.tsx`, `AboutProject.tsx`, `Lightbox.tsx` — copy unchanged from an
     existing project. `TechnicalSpec.tsx` reads `SPEC_BG`, `SPECS`, `IMAGE_ALT`
     from `../content` itself, so it takes no props.
   - `page.tsx` — a plain server component: `Header` + `ProjectView`, with
     `metadata` from `SEO_TITLE_TAG` / `IMAGE_ALT`. (`shbiro` passes
     `<Header transparent />` so the dark carousel reads under the header.)
4. **Register the project** in both catalog sources:
   - `src/lib/portfolioContent.ts` — add to `PORTFOLIO_PROJECTS`
     (`id`, `title`, `client`, `scale`, `type`, `image`, `href`).
   - `src/components/Portfolio.tsx` — add to the local `PROJECTS` array
     (`src`, `title`, `scale`, `span: ""`, `href`).
5. **Verify** in-browser (dev server):
   - Hero slider cycles every image, no duplicates/missing, arrows + dots work.
   - מפרט טכני shows the bg photo + shadow with the spec text in a legible glass
     panel, centered; `pending` rows show the "להשלמה" pill.
   - Gallery grid shows every `GALLERY_IMAGES` photo; lightbox opens/cycles.
   - New card appears on `/portfolio` and the homepage `#portfolio` section and
     links to `/projects/<slug>`.
   - No console errors, no 404s on any `/project_pages/<slug>_project/*.webp`
     (incl. `SPEC_BG`).
   - Every path referenced in `content.ts` (`HERO.src`, `FULL_BLEED_HERO`,
     `SPEC_BG`, every `GALLERY_IMAGES` entry) resolves to a real file in
     `public/project_pages/<slug>_project/`, and every file in that folder is referenced by
     `content.ts` — no orphans, no dangling references. If images were added
     or removed by hand outside this flow, re-check this before trusting the
     page.
   - **No oversized images.** Spot-check every file just written with
     `magick identify -format "%wx%h\n" <file>` (or loop the whole project
     folder) — nothing should exceed 2000px on its longest edge, and the
     `public/projects/<slug>.webp` catalog thumbnail should be ~800px wide.
     Re-run step 1's resize on anything that slipped through.

## Spec sheet (מפרט טכני) — expected rows

Each row is `{ label, value }` or `{ label, pending: true, pendingHint }`. The
established row set, in order:

- שם המודל
- סוג המודל
- קנה מידה
- מידות המודל
- שיטות ייצור
- חומרים וגימורים
- תאורה
- אלמנטים במודל
- ייעוד
- משך ייצור

**Fallback rule:** if the Builder doesn't provide full content, copy an existing
project's `SPECS` array as the starting template — same labels/shape, swap in
whatever project-specific values are known, and leave anything genuinely unknown
as `pending: true` with a `pendingHint` rather than guessing.

## Gallery

`GALLERY_IMAGES` = every supplied image, with `FULL_BLEED_HERO` included last
(where the project has one). This feeds both the static gallery grid
(`Gallery.tsx`) and, via the rule above, the hero slider.
