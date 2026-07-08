/**
 * Central design + content constants.
 * Single source of truth for brand colors, contact info, navigation and motion.
 * Every "magic number" in the app should trace back to here.
 */

export const CONTACT = {
  phone: "03-6473338",
  phoneHref: "tel:+97236473338",
  email: "office@print3d.ltd",
  emailHref: "mailto:office@print3d.ltd",
  address: "דרך בן צבי 84, תל אביב",
  addressStreet: "דרך בן צבי 84",
  addressCity: "תל אביב",
  domain: "print3d.ltd",
  siteUrl: "https://www.print3d.ltd",
} as const;

/** Brand palette — mirrors the CSS variables declared in globals.css. */
export const COLORS = {
  navy950: "#070D17",
  navy900: "#0B1526",
  navy800: "#12233B",
  steel500: "#6E93B8",
  steel300: "#A6C3DC",
  ice050: "#F4F7FA",
  white: "#FFFFFF",
  ink950: "#0A0C0F",
  gold500: "#C7A566",
  gold400: "#D6BC85",
  gold700: "#8F7340",
} as const;

/** Header navigation, right-to-left order (first item sits right-most). */
export const NAV_ITEMS = [
  { label: "שירותים", href: "#services" },
  { label: "תהליך", href: "#process" },
  { label: "תיק עבודות", href: "#portfolio" },
  { label: "לקוחות", href: "#clients" },
  { label: "אודות", href: "#about" },
  { label: "בלוג", href: "#articles" },
] as const;

/** Shared motion tokens (seconds unless noted). */
export const MOTION = {
  ease: [0.2, 0.8, 0.2, 1] as const,
  revealDuration: 0.7,
  revealDistance: 24,
  staggerStep: 0.08,
};

/** Hero choreography. Video is sped up so its ~5s source plays in ~3.5s. */
export const HERO = {
  /** Source duration is 5.04s; 1.45x → ≈3.5s runtime. */
  playbackRate: 1.45,
  /** Fallback: if the video has not started within this window, reveal anyway. */
  videoTimeoutMs: 2500,
  /** Mobile breakpoint below which the hero shows a static poster (no video). */
  mobileMaxWidth: 768,
};

/** ScrollSequence configuration. Source: 121 frames, 16:9. */
export const SEQUENCE = {
  totalFrames: 121,
  framePathDesktop: (i: number) =>
    `/sequence/frame_${String(i).padStart(3, "0")}.webp`,
  framePathMobile: (i: number) =>
    `/sequence-mobile/frame_${String(i).padStart(3, "0")}.webp`,
  /** Scroll "cost" of the pinned sequence, in viewport heights. */
  scrollHeightVh: 320,
  /** Per-rAF easing toward the target frame. */
  smoothing: 0.15,
  /** Frames eagerly loaded before the rest stream in the background. */
  eagerCount: 20,
} as const;
