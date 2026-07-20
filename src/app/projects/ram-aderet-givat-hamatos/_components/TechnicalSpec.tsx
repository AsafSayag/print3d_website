import Image from "next/image";
import { SPEC_BG, SPECS, IMAGE_ALT } from "../content";

/**
 * מפרט טכני — full-bleed, dark, atmospheric section.
 * The scale-model bg photo sits behind a heavy navy shadow; the spec rows are
 * centered inside a frosted-glass panel so the text reads clearly over the photo.
 */
export function TechnicalSpec() {
  return (
    <section className="relative w-full overflow-hidden bg-[color:var(--navy-950)] text-white">
      {/* Background image */}
      <Image
        src={SPEC_BG}
        alt={IMAGE_ALT}
        fill
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* Dark shadow overlay for legibility */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(7,13,23,0.86) 0%, rgba(7,13,23,0.72) 40%, rgba(7,13,23,0.9) 100%)",
        }}
      />

      <div className="section relative">
        <div className="container-x">
          {/* Frosted-glass panel — lifts the spec text off the busy photo. */}
          <div
            className="mx-auto max-w-3xl rounded-2xl border border-white/15 bg-white/[0.08] px-6 py-10 text-center shadow-2xl sm:px-10 sm:py-12"
            style={{
              backdropFilter: "blur(18px) saturate(150%)",
              WebkitBackdropFilter: "blur(18px) saturate(150%)",
            }}
          >
            <h2
              className="font-display font-bold leading-[1.05] mb-12"
              style={{ fontSize: "clamp(2rem, 4.5vw, 3.25rem)" }}
            >
              מפרט טכני
            </h2>

            <dl className="grid sm:grid-cols-2 gap-x-12 gap-y-8 text-center">
              {SPECS.map((row) => (
                <div key={row.label} className="border-b border-white/12 pb-4">
                  <dt className="eyebrow text-[color:var(--steel-300)]">
                    {row.label}
                  </dt>
                  <dd className="mt-2 text-[1.05rem] leading-relaxed text-white/90">
                    {row.pending ? (
                      <span className="inline-flex flex-wrap items-baseline justify-center gap-2">
                        <span className="inline-flex items-center rounded-full border border-dashed border-[color:var(--steel-300)]/60 px-2.5 py-0.5 text-sm text-[color:var(--steel-300)]">
                          להשלמה
                        </span>
                        {row.pendingHint && (
                          <span className="text-sm text-white/45">
                            {row.pendingHint}
                          </span>
                        )}
                      </span>
                    ) : (
                      row.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
