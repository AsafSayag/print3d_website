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

`Gallery.tsx` and `Lightbox.tsx` are **shared** — one copy each in
`src/components/project/`, imported by every project. Do not re-create them
per project.

`HeroSlider.tsx`, `TechnicalSpec.tsx`, `ScrollHint.tsx` and `AboutProject.tsx`
are still copied verbatim into each project's `_components/`. They take
everything as data from the co-located `content.ts`.

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
   images. → `GALLERY_ITEMS`, which in turn feeds `HERO_SLIDES`.
6. **Which shot leads** — the single image that opens the page: it becomes
   `IMG_01.webp`, which is the carousel's first slide, the full-bleed opening
   shot, and the source for the catalog thumbnail. Every other photo follows as
   `IMG_02.webp`, `IMG_03.webp`, … **in the order the Builder wants them
   shown** — that order is the order they play in.
   Also ask **which photos belong in the gallery but not the carousel** — those
   get the `GAL_` prefix instead (see the naming rules below).
7. **The background image for מפרט טכני** — every project gets its own
   `bg.webp`. → `SPEC_BG`. Prefer a dedicated shot if the Builder supplies one.
   If they don't call one out, copy `IMG_01.webp` to `bg.webp`. Either way it
   must be a **real, separate file** on disk — never point `SPEC_BG` at another
   role's file path. (`bg.webp` being a byte-copy of one of the `IMG_NN` files
   is fine and common; sharing a *path* is not.)
8. **Full מפרט טכני content** for every `SPECS` row — see below.

## Image fallback — only if the Builder cannot supply paths

If, after being asked directly, the Builder has no paths to give, you may source
images yourself — but only against explicit per-role specs, and confirm the
fallback source (existing repo assets, stock/generated placeholders) first.

- **`IMG_01.webp` (the leader)** — landscape, ~1920px+, the most dramatic
  establishing view: uncluttered, atmospheric, and still readable cropped to
  ~800px for the catalog thumbnail. It carries all the opening duty at once.
- **`SPEC_BG` / `bg.webp`** — a moody, mostly-uniform shot that reads well
  heavily darkened behind text; saved as its own `bg.webp` file (copy from
  `IMG_01.webp` if nothing dedicated is supplied — but always as a real,
  separate file on disk, not just a reused path).
- **`IMG_02.webp` onward** — same model, varied angles, consistent lighting,
  ~1200px+.

## Rule: the prefix is the role, the number is the order within it

| File | Gallery grid | Hero carousel |
| --- | --- | --- |
| `VID_NN.mp4` (+ `VID_NN.webp` poster) | yes — **first** | no |
| `IMG_NN.webp` | yes | yes |
| `GAL_NN.webp` | yes | **no** |

The gallery runs **all `VID_`, then all `IMG_`, then all `GAL_`**, ascending
within each group. The carousel is the `IMG_` set alone, ascending.

**Each prefix numbers independently from `01`, and gaps are fine.** `IMG_01,
IMG_02, GAL_01, GAL_02` is normal and correct — `GAL_` restarts at 01. Deleting
`IMG_04` never forces a renumber of anything.

To pull a photo out of the carousel while keeping it in the gallery, rename
`IMG_04.webp` → `GAL_NN.webp` (next free `GAL_` number). That's the whole
operation — no code edit, reversible by renaming back.

Everything is **derived from the folder** by `src/lib/projectImages.ts`, so
`content.ts` never lists paths:

```ts
const IMAGES = projectImages("dafna_tidhar_project");
export const GALLERY_ITEMS = IMAGES.gallery; // VID_ then IMG_ then GAL_
export const HERO_SLIDES = IMAGES.slides;    // the IMG_ subset
```

`GALLERY_ITEMS` is a `GalleryItem[]`, not a `string[]` — each entry is
`{ kind: "image", src }` or `{ kind: "video", src, poster }`.

**No per-project reordering, slicing or filtering is allowed** — if a shot
should come earlier, renumber the file. Every project uses these exact lines;
there are no exceptions.

### Adding a video

Drop in `VID_NN.mp4` **and** a `VID_NN.webp` poster — the build fails without
the poster, since the grid tile shows the poster (with a play badge) and only
fetches the clip once the lightbox opens. To prepare one:

```sh
ffmpeg -i <source>.mp4 -c copy -movflags +faststart VID_01.mp4   # streamable
ffmpeg -ss 1 -i VID_01.mp4 -frames:v 1 /tmp/poster.png           # grab a frame
magick /tmp/poster.png -quality 82 VID_01.webp
```

Video plays with controls **and sound** in the lightbox, so check the audio
track is intentional before shipping. Videos never enter the hero carousel.

## Build steps

1. **Convert AND resize images — never ship a raw camera/phone export.**
   Source photos routinely arrive at 12–24MP (4000px+ on the long edge);
   shipped as-is they bloat every page's hero and gallery for no visible
   quality gain (`next/image`/the browser downsizes on display anyway, but
   still has to download and decode the oversized original first). Before
   anything else, check each source image's longest edge:
   - **If it's over 2000px, resize it down to 2000px on the longest edge**
     (keep aspect ratio), *then* re-encode to `.webp -quality 82`. One-shot
     with ImageMagick: `magick <source> -auto-orient -resize '2000x2000>'
     -quality 82 <dest>.webp` (the `>` means "only shrink, never enlarge" —
     safe to run on every file unconditionally). **Always pass `-auto-orient`**
     on camera/phone JPGs: they carry EXIF rotation, and `.webp` does not, so
     without it a portrait shot ships on its side. A real case: a 3840×2160
     `RightTop` JPG was actually portrait and had to become 1125×2000.
     If the source is already a `.webp`,
     the same `magick` command works directly on it (it decodes and
     re-encodes in one step — no need for a separate `dwebp`/`cwebp` pass).
   - If it's already ≤2000px, `cwebp -q 82` (no resize) is enough.
   - This 2000px cap applies to **every** file — `bg.webp` and every
     `IMG_NN.webp` / `GAL_NN.webp` / video posters — including the gallery images
     even though they also open in the full-screen `Lightbox`; 2000px is
     still sharp at typical monitor widths and the `Lightbox`'s own
     `sizes="92vw"` lets `next/image` downsize further per-device anyway.
   Then, into `public/project_pages/<slug_with_underscores>_project/` (all
   project-page asset folders live under the shared `public/project_pages/`
   directory, not directly in `public/`):
   **There are exactly two names. Nothing else belongs in the folder.**
   - Photos for the gallery **and** carousel → `IMG_01.webp`, `IMG_02.webp`, …
     `IMG_01.webp` is the leader: carousel-first, full-bleed opener, thumbnail
     source.
   - Photos for the gallery **only** → `GAL_NN.webp`, numbered from `01` on its
     own sequence (see the rule section above).
   - Video → `VID_NN.mp4` plus a `VID_NN.webp` poster.
   - מפרט טכני background → `bg.webp` (its own dedicated file — every project
     has one; copy `IMG_01.webp` if no separate shot was supplied)

   The rules, all enforced at build time by `projectImages()`:
   - **Each prefix numbers independently from `01`; gaps are fine.**
   - **`IMG_01.webp` must exist.** It leads the carousel and the gallery.
   - **`bg.webp` must exist.**
   - **Every `VID_NN.mp4` needs its `VID_NN.webp` poster.**
   - **No unrecognised files.** Anything that isn't one of the four names above
     fails the build, naming the file. Strays used to be silently ignored, which
     is how a `.JPG`, an `.mp4` and an `IMG_012.webp` typo once sat unnoticed in
     tracked folders — a file you added but can't see on the page must be loud.

   A finished folder always contains **at least `IMG_01.webp` and `bg.webp`**.
   If the Builder supplied only one photo, it becomes `IMG_01.webp` and a copy
   of it becomes `bg.webp`. Break any of these rules and `next build` fails with
   a message naming the folder and the problem — there is no silent drift.
2. **Catalog thumbnail.** Resize `IMG_01.webp` to ~800px wide →
   `public/projects/<slug>.webp` (`magick <source> -resize '800x' -quality 82
   <dest>.webp`, or `cwebp -q 82 -resize 800 0 …` from a non-webp source).
   This file feeds small grid/card thumbnails on `/portfolio` and the
   homepage — it must never be left at full source resolution (this has
   happened before: a project shipped with a 3024×4032, ~2MB "thumbnail").
3. **Create `src/app/projects/<slug>/`:**
   - `content.ts` — exports `SEO_TITLE_TAG`, `IMAGE_ALT`, `HERO` (with
     `eyebrow`, `title`, `scale`), **`SPEC_BG`**, `SpecRow` type, `SPECS`,
     `ABOUT` (if used), `GALLERY_ITEMS`, `HERO_SLIDES` (per the rule above).
     Copy the shape from `dafna-tidhar/content.ts`.

     **No image paths are written by hand.** The only per-project image input is
     the asset folder name passed to `projectImages()`; everything else is
     derived. There is no `HERO.src` and no `FULL_BLEED_HERO` export — both were
     dead (nothing outside `content.ts` ever imported them), and the opening
     shot is `HERO_SLIDES[0]`, i.e. `IMG_01.webp`.

     **`content.ts` is server-only.** `projectImages` reads the filesystem, so
     never import `content.ts` from a `"use client"` file — Next would try to
     bundle `node:fs` for the browser. Images reach the client components as
     props via `ProjectView`, which is where that boundary lives.
   - `_components/ProjectView.tsx` — the layout above. Copy from an existing
     project; only the `content.ts` import path changes.
   - `_components/HeroSlider.tsx`, `ScrollHint.tsx`, `TechnicalSpec.tsx`,
     `AboutProject.tsx` — copy unchanged from an
     existing project. `TechnicalSpec.tsx` reads `SPEC_BG`, `SPECS`, `IMAGE_ALT`
     from `../content` itself, so it takes no props.
   - `page.tsx` — a plain server component: `Header` + `ProjectView`, with
     `metadata` from `SEO_TITLE_TAG` / `IMAGE_ALT`. (`shbiro` passes
     `<Header transparent />` so the dark carousel reads under the header.)
4. **Register the project** in both catalog sources, plus the slug reference:
   - `src/lib/portfolioContent.ts` — add to `PORTFOLIO_PROJECTS`
     (`id`, `title`, `client`, `scale`, `type`, `image`, `href`).
   - `src/components/Portfolio.tsx` — add to the local `PROJECTS` array
     (`src`, `title`, `scale`, `span: ""`, `href`).
   - `src/lib/SLUGS.md` — add a row to the table (slug, title, client, blank
     `Hidden` column) so the new project is discoverable for copy/pasting into
     `HIDDEN_PROJECT_SLUGS` later.
   - `src/lib/hiddenProjects.ts` — add the same row to the reference table in
     the comment above `HIDDEN_PROJECT_SLUGS`. It's a duplicate of the
     `SLUGS.md` table on purpose, kept in the same file as the array so a
     slug can be found and hidden without leaving this file.
5. **Verify** in-browser (dev server):
   - Hero slider cycles every image, no duplicates/missing, arrows + dots work.
   - מפרט טכני shows the bg photo + shadow with the spec text in a legible glass
     panel, centered; `pending` rows show the "להשלמה" pill.
   - Gallery grid shows every `GALLERY_ITEMS` tile; lightbox opens/cycles.
   - Any video tile shows its poster + play badge, and plays with controls in
     the lightbox. Navigating away or closing stops playback.
   - New card appears on `/portfolio` and the homepage `#portfolio` section and
     links to `/projects/<slug>`.
   - No console errors, no 404s on any `/project_pages/<slug>_project/*.webp`
     (incl. `SPEC_BG`).
   - **The folder invariants are checked by the build, not by hand.** Orphans,
     dangling references, gaps, duplicate numbers, a missing `IMG_01.webp` or
     `bg.webp` all fail `next build` with a message naming the folder. If
     `next build` passes, the folder is valid — there is nothing to eyeball.
   - **`next dev` caches the folder read.** The image lists are resolved when
     the module is first evaluated, so a photo you add or rename *while the dev
     server is running* will not appear until that module re-evaluates. Save
     `content.ts` (an empty edit is enough) or restart `next dev`. Production
     builds are always correct, since every project page is prerendered.
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
- שיטות ייצור
- חומרים וגימורים
- תאורה
- אלמנטים במודל
- ייעוד

These eight are the full set — every project ships exactly these, in this order.
Do not add rows such as מידות המודל or משך ייצור.

**Fallback rule:** if the Builder doesn't provide full content, copy an existing
project's `SPECS` array as the starting template — same labels/shape, swap in
whatever project-specific values are known, and leave anything genuinely unknown
as `pending: true` with a `pendingHint` rather than guessing.

**Write it per project.** The values must describe *that* model — the actual
facade colours, lighting, and landscape elements visible in its photos. Generic
filler like "פיתוח סביבתי מלא (עצים, שבילים, גינון)" is not acceptable; see
`src/app/projects/rotem-shani-beit-shemesh/content.ts` for the reference level of
detail.

## Gallery

`GALLERY_ITEMS` = every tile in the folder — `VID_`, then `IMG_`, then `GAL_` —
so a video leads and the leader shot `IMG_01` heads the photos. This feeds the
gallery grid (`src/components/project/Gallery.tsx`). The hero slider gets
`HERO_SLIDES`, the `IMG_`-only subset, so the gallery is always a superset of
the carousel and never puts video in it.
