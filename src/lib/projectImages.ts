/**
 * Derives every project page's media lists from its asset folder, so the folder
 * itself is the single source of truth — adding, removing, reordering or
 * reclassifying a photo is a file rename, never a code edit.
 *
 * The naming convention (see project_builder.md):
 *
 *   VID_NN.mp4    gallery only, shown first — needs a VID_NN.webp poster
 *   VID_NN.webp   the poster for VID_NN.mp4 (never a tile of its own)
 *   IMG_NN.webp   gallery + hero carousel
 *   GAL_NN.webp   gallery only
 *   bg.webp       the מפרט טכני background
 *
 * Each prefix numbers **independently** from 01, and gaps are fine — deleting
 * IMG_04 never forces a renumber. The gallery runs VID_ then IMG_ then GAL_,
 * ascending within each; the carousel is the IMG_ set alone. So demoting a photo
 * out of the carousel while keeping it in the gallery is one rename,
 * IMG_04.webp -> GAL_NN.webp.
 *
 * Anything else in the folder is an error rather than being skipped: when the
 * folder is the management interface, a file you added but cannot see on the
 * page has to be loud.
 *
 * SERVER ONLY. This module reads the filesystem, so it must never be reachable
 * from a "use client" import graph — Next would try to bundle node:fs for the
 * browser. Every consumer today is a server component that passes the resulting
 * arrays down as props.
 *
 * The read happens at module scope, which resolves during `next build` because
 * all project pages are statically prerendered (they show as `○ (Static)` in the
 * build output). If a project page ever becomes dynamic, this would run per
 * request on the server instead — where `public/` is not guaranteed to exist on
 * Vercel — so keep those pages static.
 */
import { readdirSync } from "node:fs";
import { join } from "node:path";

const ROOT = join(process.cwd(), "public", "project_pages");

/** `IMG_07.webp`, `GAL_02.webp`, `VID_01.mp4`, `VID_01.webp`. */
const ASSET = /^(IMG|GAL|VID)_(\d{2})\.(webp|mp4)$/;

/** Gallery order — videos lead, then carousel photos, then gallery-only ones. */
const ORDER = { VID: 0, IMG: 1, GAL: 2 } as const;

export type GalleryItem =
  | { kind: "image"; src: string }
  | { kind: "video"; src: string; poster: string };

export type ProjectImages = {
  /** Every tile: VID_ then IMG_ then GAL_, ascending within each prefix. */
  gallery: GalleryItem[];
  /** The IMG_ subset, ascending — the hero carousel. Never contains video. */
  slides: string[];
  /** The מפרט טכני background. */
  bg: string;
};

/**
 * @param folder asset directory name, e.g. `dafna_tidhar_project`
 * @throws if the folder violates the convention — this deliberately fails the
 *   build rather than shipping a page with missing or mis-ordered media.
 */
export function projectImages(folder: string): ProjectImages {
  const fail = (msg: string): never => {
    throw new Error(`project_pages/${folder}: ${msg}`);
  };

  let entries: string[];
  try {
    entries = readdirSync(join(ROOT, folder));
  } catch {
    return fail("asset folder not found");
  }

  const assets: { prefix: "IMG" | "GAL" | "VID"; n: number; file: string }[] = [];

  for (const file of entries) {
    if (file.startsWith(".")) continue; // .DS_Store and friends
    if (file === "bg.webp") continue;

    const m = ASSET.exec(file);
    if (!m) {
      fail(
        `unrecognised file "${file}" — the folder may only contain ` +
          `IMG_NN.webp, GAL_NN.webp, VID_NN.mp4 (+ its VID_NN.webp poster) ` +
          `and bg.webp`,
      );
      continue;
    }

    const [, prefix, num, ext] = m as unknown as [
      string,
      "IMG" | "GAL" | "VID",
      string,
      "webp" | "mp4",
    ];

    if (prefix === "VID" && ext === "webp") continue; // poster, not a tile
    if (prefix !== "VID" && ext === "mp4") {
      fail(`"${file}" — only VID_NN may be an .mp4`);
    }
    if (prefix === "VID" && !entries.includes(`VID_${num}.webp`)) {
      fail(`"${file}" has no poster — add VID_${num}.webp alongside it`);
    }

    assets.push({ prefix, n: Number(num), file });
  }

  if (assets.length === 0) fail("no IMG_NN.webp, GAL_NN.webp or VID_NN.mp4 files");
  if (!entries.includes("bg.webp")) fail("missing bg.webp");
  if (!entries.includes("IMG_01.webp")) {
    fail("IMG_01.webp is required — it leads the carousel and the gallery");
  }

  // Numbering is independent per prefix and may have gaps, so ordering is all
  // that matters: prefix group first, then the number within it.
  assets.sort((a, b) => ORDER[a.prefix] - ORDER[b.prefix] || a.n - b.n);

  const url = (file: string) => `/project_pages/${folder}/${file}`;

  return {
    gallery: assets.map((a) =>
      a.prefix === "VID"
        ? {
            kind: "video" as const,
            src: url(a.file),
            poster: url(a.file.replace(/\.mp4$/, ".webp")),
          }
        : { kind: "image" as const, src: url(a.file) },
    ),
    slides: assets.filter((a) => a.prefix === "IMG").map((a) => url(a.file)),
    bg: url("bg.webp"),
  };
}
