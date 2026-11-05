// Topic icons for the "why a physical model" cards — line-art in the same
// stroke language as the rest of the site (1.6px, round caps/joins). Shared by
// the homepage WhySection and the About page's values grid, so the same four
// points look the same wherever they appear.
export function WhyIcon({ name }: { name: string }) {
  const common = {
    viewBox: "0 0 24 24",
    width: 34,
    height: 34,
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (name) {
    // גימור יד אומן — מכחול וקנבס
    case "brush":
      return (
        <svg {...common}>
          <path d="M15.5 3.5 9 10l5 5 6.5-6.5a3.54 3.54 0 0 0-5-5Z" />
          <path d="M9 10c-2 .7-3.3 2.3-3.6 4.4-.1.9-.7 1.7-1.6 2 1.6 1.4 4 1.6 5.7.3 1-.8 1.5-2 1.5-3.2" />
        </svg>
      );
    // רמת פירוט גבוהה — בניין מסורטט
    case "blueprint":
      return (
        <svg {...common}>
          <path d="M4 21h16" />
          <path d="M6 21V6a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v15" />
          <path d="M14 21V10h3a1 1 0 0 1 1 1v10" />
          <path d="M9 8h2M9 11h2M9 14h2" />
        </svg>
      );
    // פיתוח סביבתי — עץ / גינה
    case "park":
      return (
        <svg {...common}>
          <path d="M12 22v-5" />
          <path d="M12 17a5 5 0 0 0 5-5 4 4 0 0 0-1.2-2.9A4 4 0 0 0 12 4a4 4 0 0 0-3.8 5.1A4 4 0 0 0 7 12a5 5 0 0 0 5 5Z" />
          <path d="M6 22h12" />
        </svg>
      );
    // אחריות למודל — תעודה עם מדליה
    case "certificate":
      return (
        <svg {...common}>
          <path d="M17 8V4a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h6" />
          <path d="M7 7h7M7 10h7M7 13h4" />
          <circle cx="17" cy="15" r="4" />
          <path d="m15.2 18.3-.7 3 2.5-1.4 2.5 1.4-.7-3" />
        </svg>
      );
    default:
      return null;
  }
}
