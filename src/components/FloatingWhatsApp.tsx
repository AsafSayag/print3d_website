import { CONTACT } from "@/lib/constants";

/**
 * Floating WhatsApp button, fixed at the bottom inline-end corner
 * (bottom-left under RTL). While CONTACT.whatsappNumber is empty the
 * button links to the contact form; once a number is set it opens a
 * WhatsApp chat directly.
 */
export function FloatingWhatsApp() {
  const hasNumber = CONTACT.whatsappNumber.length > 0;
  const href = hasNumber
    ? `https://wa.me/${CONTACT.whatsappNumber}`
    : "#contact";

  return (
    <a
      href={href}
      target={hasNumber ? "_blank" : undefined}
      rel={hasNumber ? "noopener noreferrer" : undefined}
      aria-label="דברו איתנו בוואטסאפ"
      className="fixed bottom-5 end-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25d366] shadow-[0_8px_24px_rgba(0,0,0,0.35)] transition-transform duration-300 ease-[var(--ease-brand)] hover:scale-110 active:scale-95"
    >
      {/* WhatsApp glyph */}
      <svg
        viewBox="0 0 32 32"
        className="h-7 w-7 fill-white"
        aria-hidden="true"
      >
        <path d="M16.04 3C9.4 3 4 8.36 4 14.95c0 2.1.56 4.16 1.62 5.97L4 27l6.24-1.63a12.1 12.1 0 0 0 5.79 1.47h.01c6.63 0 12.03-5.36 12.03-11.95C28.07 8.36 22.67 3 16.04 3zm0 21.85h-.01a10.1 10.1 0 0 1-5.12-1.4l-.37-.22-3.7.97.99-3.59-.24-.37a9.85 9.85 0 0 1-1.52-5.29c0-5.47 4.49-9.92 10-9.92 2.67 0 5.18 1.03 7.07 2.91a9.82 9.82 0 0 1 2.93 7.02c0 5.47-4.5 9.89-10.03 9.89zm5.5-7.4c-.3-.15-1.78-.87-2.06-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.27-.46-2.42-1.48a9.03 9.03 0 0 1-1.67-2.06c-.17-.3-.02-.46.13-.61.14-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.68-1.62-.93-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.47 1.07 2.88 1.22 3.08.15.2 2.1 3.18 5.1 4.46.71.3 1.27.49 1.7.63.72.22 1.37.19 1.88.11.58-.08 1.78-.72 2.03-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35z" />
      </svg>
    </a>
  );
}
