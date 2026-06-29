# Print3D — Design System

Companion design system for **Print3D**, a studio that builds **physical
architectural scale models** for architecture firms, developers, and luxury
real-estate projects. The brand voice is a *luxurious architectural studio*:
quiet, confident, near-black surfaces with a single warm bronze accent, generous
spacing, sharp architectural edges, and a **right-to-left Hebrew** interface.

> **Sources provided:** two logo PNGs (dark-background and bronze-background
> lockups) plus a written token spec. No codebase or Figma file was attached —
> the system is built from the supplied token spec and brand direction. If a
> production codebase or Figma exists, re-attach it and the kit can be aligned to it.

---

## Content Fundamentals

How Print3D copy is written:

- **Language & direction.** Hebrew, right-to-left. English appears only in the
  logo lockup ("PRINT3D / ARCHITECTURAL MODELING") and as occasional metadata.
- **Voice.** First-person plural — *"אנחנו", "אנו"* ("we"). The studio speaks as
  a small expert team, addressing the client directly (*"בואו נבנה", "השאירו פרטים"*).
- **Tone.** Confident, calm, craft-led. Short declarative lines that read like a
  studio statement: *"הופכים תכנון למודל פיזי מדויק."* / *"צורה, חומר, אור."*
  Never salesy, never exclamatory.
- **Casing & labels.** Section labels (eyebrows) and button text are short, set in
  uppercase Latin or wide-tracked Hebrew caption style. Real headlines are
  sentence-case Hebrew.
- **Numbers.** Used sparingly and only when they carry weight (e.g. `250+` models,
  `1:50` scale, `12` years). No invented stat-slop.
- **No emoji.** The brand never uses emoji or decorative unicode.
- **Vibe.** Architectural, editorial, premium. Whitespace does the talking.

Example copy: hero — *"הופכים תכנון למודל פיזי מדויק."*; about (serif) — *"כל פרויקט
מתחיל בשרטוט. אנחנו נותנים לו נפח, חומר ואור."*; CTA — *"בואו נבנה את הדגם הבא שלכם."*

---

## Visual Foundations

- **Colors.** Near-black `#0E0E0F` page, `#1A1A1C` raised surfaces, `#2B2B2E`
  charcoal hairlines, `#F5F2EC` cream for inverted light sections. A single
  **bronze accent** `#B08D57` (hover `#C7A56F`, muted `#6E5A3B`). Cool/neutral
  base, one warm accent.
- **Accent discipline.** Bronze covers **&lt;5% of any screen** — one CTA, one
  underline, one hover, stat numbers. Never a large fill.
- **Type.** `Heebo` for everything (400/500 body, 700/900 headings) — a confident
  neutral Hebrew sans. `Frank Ruhl Libre` serif is the editorial-display option
  used only for short statement headlines and pull quotes. Hero 72px/900 with
  tight `-0.01em` tracking; generous 1.6 line-height on body.
- **Spacing.** 4px base. Section vertical padding never below 96px desktop / 64px
  mobile. Generosity is the brand — do not compress.
- **Layout.** 12-col, max 1440px, 80px margins, 24px gutters, RTL (column 1 at the
  right edge). **At least one section per page breaks the centered symmetry** —
  the About section uses a 7/5 split by rule, not as a fallback.
- **Backgrounds.** Solid color blocks alternating dark ↔ cream for rhythm; one
  full-bleed darkened architectural photo in the hero with a top/bottom
  protection gradient. No patterns, no decorative gradients, no texture noise.
- **Imagery.** Architectural — buildings and physical models. Slightly
  desaturated (light grayscale) by default, resolving to full colour on hover;
  `object-fit: cover` with flexible `aspect-ratio`, never fixed pixel crops.
- **Corners & elevation.** Sharp. `radius-sm` 2px (buttons/inputs), `radius-md`
  4px (cards/images). **Nothing exceeds 8px.** Shadows are soft and dark only:
  `0 4px 24px rgba(0,0,0,.25)` at rest, `0 8px 32px rgba(0,0,0,.35)` on hover.
- **Cards.** Raised `#1A1A1C` surface, 1px charcoal border, 4px radius, subtle
  shadow; lift `translateY(-4px)` + deeper shadow on hover.
- **Borders & dividers.** 1px charcoal hairlines and thin top-borders on stat /
  step blocks — architectural drafting feel.
- **Motion.** `cubic-bezier(0.16, 1, 0.3, 1)` for all entrances — smooth
  deceleration, **no bounce.** 200ms hover, 450ms scroll-reveal, 700ms hero.
- **Hover states.** Bronze color shift on links/labels; image desaturate→colour
  + slow 1.04 zoom; card lift; primary button → `accent-hover`.
- **Transparency / blur.** Used once: the header gains a `blur(12px)` dark
  translucent backdrop after scrolling. Otherwise surfaces are opaque.
- **RTL.** `dir="rtl"` at the document root; logical properties
  (`margin-inline-*`, `padding-inline-*`, `border-inline-*`) for spacing;
  directional icons mirrored (the "← לכל הפרויקטים" arrow points with RTL reading).

---

## Iconography

- The brand ships **no custom icon set**. Iconography is intentionally minimal —
  this is a photography-led, typographic brand.
- Where a glyph is needed (e.g. the gallery "more" link), a **mirrored arrow
  character** is used inline, respecting RTL direction. No emoji, ever.
- If a richer icon need arises, use **Lucide** (https://lucide.dev) — thin
  1.5–2px stroke, square caps — which matches the sharp architectural line feel.
  This is a *recommended substitution*, not an existing brand asset; flag it when
  introduced.
- The only fixed brand marks are the two logo lockups in `assets/`.

---

## Fonts — substitution note

`Heebo` and `Frank Ruhl Libre` are the **intended** families (both have strong
Hebrew glyph coverage) and are loaded from **Google Fonts** via `tokens/fonts.css`.
No local font binaries were supplied. If you have licensed/self-hosted versions,
drop the files in and replace the `@import` with `@font-face` rules.

---

## Index / Manifest

**Root**
- `styles.css` — global entry point (import-only). Consumers link this.
- `tokens/` — `fonts.css`, `colors.css`, `typography.css`, `spacing.css`,
  `radius-elevation.css`, `motion.css`.
- `assets/` — `logo-print3d-dark.png`, `logo-print3d-bronze.png`.
- `SKILL.md` — Agent-Skill front matter for Claude Code use.

**Components** (`components/core/`, namespace `Print3DDesignSystem_e18502`)
- `Button`, `Input`, `Card`, `Eyebrow`, `Badge`, `LogoGrid`, `ProjectCard`.
- `core.card.html` — combined Design-System tab specimen.

**Foundations** (`foundations/`) — specimen cards for the Design System tab:
colors (base / accent / text), type (headings / body / serif), spacing, radius &
elevation, brand (logo / accent rule).

**UI kit** (`ui_kits/website/`) — full RTL marketing site recreation. See its
own `README.md`.

## Caveats
- All photography is Unsplash placeholder — replace with real model photography.
- Client names in the logo wall are illustrative placeholders.
- Fonts are Google-Fonts-served (see substitution note above).
