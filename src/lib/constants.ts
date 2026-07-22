/**
 * Central design + content constants.
 * Single source of truth for brand colors, contact info, navigation and motion.
 * Every "magic number" in the app should trace back to here.
 */

export const CONTACT = {
  phone: "03-6473338",
  phoneHref: "tel:+97236473338",
  /** Mobile / WhatsApp line — shown on the error + 404 pages as a direct contact. */
  mobilePhone: "053-724-7958",
  mobilePhoneHref: "tel:+972537247958",
  email: "office@print3d.ltd",
  emailHref: "mailto:office@print3d.ltd",
  address: "דרך בן צבי 84, תל אביב",
  addressStreet: "דרך בן צבי 84",
  addressCity: "תל אביב",
  domain: "print3d.ltd",
  siteUrl: "https://www.print3d.ltd",
  /** Canonical destination for every contact / get-a-quote CTA across the site. */
  contactPath: "/contact",
  /** Google Maps — search link (opens the app/site) and embeddable iframe URL. */
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=%D7%93%D7%A8%D7%9A%20%D7%91%D7%9F%20%D7%A6%D7%91%D7%99%2084%20%D7%AA%D7%9C%20%D7%90%D7%91%D7%99%D7%91",
  mapsEmbedUrl:
    "https://www.google.com/maps?q=%D7%93%D7%A8%D7%9A%20%D7%91%D7%9F%20%D7%A6%D7%91%D7%99%2084%20%D7%AA%D7%9C%20%D7%90%D7%91%D7%99%D7%91&output=embed",
  /**
   * Business WhatsApp number in international format (053-724-7958 → drop the
   * leading 0, prefix 972). Both WhatsApp buttons — the floating bubble and the
   * header icon — open a chat at https://wa.me/<this> when it is set.
   */
  whatsappNumber: "972537247958",
} as const;

/** Brand palette — mirrors the CSS variables declared in globals.css. */
export const COLORS = {
  navy950: "#0E1A2C",
  navy900: "#15263D",
  navy800: "#1D3350",
  steel500: "#6E93B8",
  steel300: "#A6C3DC",
  ice050: "#F4F7FA",
  white: "#FFFFFF",
  ink950: "#0A0C0F",
  gold500: "#3E799F",
  gold400: "#5F9AC0",
  gold700: "#2D5A78",
} as const;

/** Header navigation, right-to-left order (first item sits right-most). */
export const NAV_ITEMS = [
  { label: "שירותים", href: "#services" },
  { label: "קטלוג", href: "/projects" },
  { label: "לקוחות", href: "#clients" },
  { label: "אודות", href: "/about" },
  { label: "מרכז ידע", href: "/knowledge" },
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
  /** Content enters this long after the site loads (independent of the video).
      Kept short so the headline + primary CTA appear promptly over the playing
      video (which remains the cinematic layer) rather than being withheld. */
  revealDelayMs: 175,
  /** Pause this many seconds before the natural end to avoid the EOS flash. */
  freezeLeadSec: 0.12,
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
  scrollHeightVh: 240,
  /** Per-rAF easing toward the target frame. */
  smoothing: 0.15,
  /**
   * Ease-out exponent for the scrub. >1 makes the start fast and the finish
   * slow (the building forms gradually toward the end).
   */
  easeExp: 2.4,
  /**
   * Fraction of scroll at the end that dwells on the final frame, so the
   * completed building stays on screen for an extra beat before releasing.
   * Kept small so the hand-off to the next section feels immediate.
   */
  endHold: 0.06,
  /** Size of the warm-up buffer: these first frames are loaded in parallel and
      pre-decoded as soon as the page is interactive, so the START of the
      sequence is always smooth on the user's first scroll. The remaining frames
      then stream in progressively in the background. */
  eagerCount: 30,
  /** Idle beat (ms) after the window `load` event before the blind frame
      preload begins on the first visit — so the hero poster (LCP) and video
      finish first and the ~4MB of frames never compete with them during the LCP
      window. A scroll toward the section starts the preload sooner regardless
      (see ScrollSequence's scroll/IntersectionObserver accelerants). */
  preloadDelayMs: 1800,
} as const;
