# Project Page Builder

Runbook for creating a new `/projects/<slug>` case-study page. Two reference
implementations exist and should be treated as the canonical pattern:
`src/app/projects/gindi-kfar-azar/` and `src/app/projects/dafna-tidhar/`
(prefer copying from `dafna-tidhar` — it has the corrected `HERO_SLIDES`
pattern, see below). There is no `[slug]` dynamic route; every project is its
own hand-built folder.

## Inputs required from the Builder

Ask for all of these before starting. If any are missing, see the fallbacks
below rather than blocking.

1. **Slug** — URL segment, e.g. `dafna-tidhar`.
2. **Title** (Hebrew) — e.g. `תדהר, דפנה`.
3. **Client name** — e.g. `תדהר`.
4. **Scale** — e.g. `1:100`.
5. **Image file paths** — the full set of source images to include. No fixed
   count (Gindi has 5, Dafna Tidhar has 10) — use as many as the Builder
   provides. **Always ask the Builder for these paths first, explicitly, and
   wait for a response before doing anything else with images.** Only if the
   Builder says they have none, or can't provide paths, may the AI fall back
   to selecting its own images (see "Image fallback" below) — never skip
   straight to self-selecting because paths weren't offered unprompted.
6. **Which one image is the hero** (`HERO.src`) — the "leader" image: the
   primary cover shot, used for first paint and as the catalog thumbnail
   source.
7. **Which one image is the full-bleed hero** (`FULL_BLEED_HERO`) — the
   dramatic/establishing shot that opens the hero slider.
8. **Full מפרט טכני (technical spec) content** for every `SPECS` row — see
   "Spec sheet" below. If the Builder doesn't supply this, or supplies an
   incomplete set, fall back to copying Gindi's `SPECS` array (see fallback
   rule below) — do not invent numbers.

## Image fallback — only if the Builder cannot supply paths

If, after being asked directly, the Builder has no image paths to give, the
AI may source or pick images on its own — but only against explicit
per-role specs, not by free-form taste. Confirm with the Builder which
fallback source is acceptable (existing project assets, stock/generated
placeholders, etc.) before using anything not already in the repo.

Define and follow a property spec per image role before selecting:

- **`HERO.src` (leader image)** — orientation: landscape, min ~1600px wide;
  subject: single clear establishing view of the model, uncluttered
  background, good lighting/contrast (this doubles as the catalog
  thumbnail, so it must read clearly at ~800px and small crop sizes too).
- **`FULL_BLEED_HERO`** — orientation: landscape, min ~1920px wide; subject:
  the most dramatic/atmospheric shot (wide angle, depth, or moody
  lighting) — distinct from `HERO.src`, meant to open the slider with
  impact rather than serve as the plain reference shot.
- **Gallery images** — same subject (the model), varied angles/details
  distinct from the two hero shots and from each other, consistent
  lighting/background style across the set, min ~1200px wide.

Only after these specs are defined should the AI go select or generate
images that satisfy them — state which spec each chosen image is meant to
satisfy when presenting the selection back to the Builder for approval.

## Rule: every image takes part in the hero loop

All images (hero + full-bleed hero + every gallery photo) must appear in
`HERO_SLIDES`, with **no duplicates**. Do not hand-pick a subset. Derive it
from `GALLERY_IMAGES`:

```ts
export const HERO_SLIDES = [
  FULL_BLEED_HERO,
  HERO.src,
  ...GALLERY_IMAGES.filter((src) => src !== FULL_BLEED_HERO),
];
```

This is the pattern in `dafna-tidhar/content.ts`. (Gindi's `content.ts`
still uses an older `.slice(0, 3)` — it happens to work there only because
Gindi has exactly 3 gallery photos. Don't copy that part from Gindi; use the
`filter` version above for any new page.)

## Build steps

1. **Convert images.** Every source image → `.webp` via `cwebp -q 82`, into
   `public/<slug_with_underscores>_project/`:
   - Hero → `<name>_hero.webp`
   - Full-bleed hero → `design_1_hero.webp`
   - Everything else → `IMG_01.webp`, `IMG_02.webp`, ... (sequential)
2. **Catalog thumbnail.** Resize the hero image to ~800px wide →
   `public/projects/<slug>.webp` (e.g. `cwebp -q 82 -resize 800 0 ...`).
3. **Create `src/app/projects/<slug>/`:**
   - `content.ts` — exports `SEO_TITLE_TAG`, `IMAGE_ALT`, `HERO`,
     `FULL_BLEED_HERO`, `SpecRow` type, `SPECS`, `ABOUT`, `GALLERY_IMAGES`
     (gallery photos + `FULL_BLEED_HERO` last), `HERO_SLIDES` (per the rule
     above). Copy the shape from `dafna-tidhar/content.ts` and replace values.
   - `_components/ProjectView.tsx` — the single-layout page body (hero
     slider → spec sheet → gallery → about accordion → FAQ → footer). Copy
     from an existing project, only its `content.ts` import path changes.
   - `_components/HeroSlider.tsx`, `Gallery.tsx`, `SpecSheet.tsx`,
     `AboutProject.tsx`, `Lightbox.tsx`, `ScrollHint.tsx` — copy unchanged
     from an existing project; they're generic and take data as props.
   - `page.tsx` — a plain server component: `Header` + `ProjectView`, with
     `metadata` built from `SEO_TITLE_TAG` / `IMAGE_ALT`. No toggle, no
     "Design 2" — that pattern was removed; don't reintroduce it.
4. **Register the project** in both catalog sources:
   - `src/lib/portfolioContent.ts` — add an entry to `PORTFOLIO_PROJECTS`
     (`id`, `title`, `client`, `scale`, `type`, `image`, `href`).
   - `src/components/Portfolio.tsx` — add an entry to the local `PROJECTS`
     array (`src`, `title`, `scale`, `span: ""`, `href`).
5. **Verify** in-browser (dev server):
   - Hero slider cycles through every image, no duplicates, no missing ones.
   - Spec sheet renders all rows (pending ones show the "להשלמה" pill).
   - Gallery grid shows every `GALLERY_IMAGES` photo; lightbox opens and
     cycles correctly.
   - New card appears on `/portfolio` and the homepage `#portfolio` section
     and links to `/projects/<slug>`.
   - No console errors, no 404s on any `/‹slug›_project/*.webp` request.

## Spec sheet (מפרט טכני) — expected rows

Each row is `{ label, value }` or `{ label, pending: true, pendingHint }`.
The established row set (from both existing pages), in order:

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

**Fallback rule:** if the Builder doesn't provide full content for these
rows, copy Gindi's `SPECS` array
(`src/app/projects/gindi-kfar-azar/content.ts`) verbatim as the starting
template — same row labels/shape, swap in whatever project-specific values
are actually known (client name, element counts, etc.), and leave anything
genuinely unknown as `pending: true` with a `pendingHint` rather than
guessing.

## Gallery

`GALLERY_IMAGES` = every supplied image except `HERO.src`, with
`FULL_BLEED_HERO` included as the last item. This is what feeds both the
static gallery grid (`Gallery.tsx`) and, via the rule above, the hero slider.
