import type { Metadata } from "next";
import { CampaignTagManager } from "../_components/CampaignTagManager";
import { LP_THANK_YOU_PATH } from "../content";
import { Logo } from "@/components/ui/Logo";
import { analyticsAttrs } from "@/lib/analytics";
import { BUSINESS_HOURS, CONTACT, whatsappHref } from "@/lib/constants";
import { buildPageMeta } from "@/lib/pageMeta";

export const metadata: Metadata = buildPageMeta({
  title: "תודה שהשארתם פרטים",
  description: "קיבלנו את פרטי הפנייה ונחזור אליכם עם הצעה תוך יום עסקים.",
  path: LP_THANK_YOU_PATH,
  index: false,
});

export default function SalesModelThankYouPage() {
  return (
    <>
      <CampaignTagManager />
      <main
        id="main"
        className="flex flex-1 items-center justify-center bg-[color:var(--navy-950)] px-6 py-20 text-white"
      >
        <div className="max-w-lg text-center">
          <div className="mb-10 flex justify-center">
            <Logo size={34} />
          </div>
          <h1 className="font-display text-4xl font-bold sm:text-5xl">
            תודה, הפרטים התקבלו
          </h1>
          <p className="mt-5 text-lg text-white/75">
            נחזור אליכם עם הצעה מסודרת תוך יום עסקים ({BUSINESS_HOURS.daysLabel}, {BUSINESS_HOURS.opens}–{BUSINESS_HOURS.closes}).
          </p>
          <p className="mt-4 text-white/65">
            רוצים הצעה מדויקת יותר? שלחו לנו תוכניות או תיאור קצר של הפרויקט.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href={whatsappHref("היי, השארתי פרטים באתר Print3D. אשמח לשלוח תוכניות של הפרויקט כדי לקבל הצעה מדויקת יותר.")}
              target="_blank"
              rel="noopener noreferrer"
              {...analyticsAttrs("whatsapp_click", { location: "lp_thank_you" })}
              className="glass-btn glass-btn--primary"
            >
              שלחו תוכניות בוואטסאפ
            </a>
            <a
              href={CONTACT.phoneHref}
              {...analyticsAttrs("phone_click", { location: "lp_thank_you", phone_type: "office" })}
              className="glass-btn"
            >
              התקשרו אלינו
            </a>
          </div>
        </div>
      </main>
    </>
  );
}
