import type { Metadata } from "next";
import { CampaignTagManager } from "../_components/CampaignTagManager";
import { LP_THANK_YOU_PATH } from "../content";
import { Logo } from "@/components/ui/Logo";
import { buildPageMeta } from "@/lib/pageMeta";

export const metadata: Metadata = buildPageMeta({
  title: "תודה שהשארתם פרטים",
  description: "קיבלנו את פרטי הפנייה ונחזור אליכם בהקדם.",
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
            <Logo size={34} href={null} ariaLabel="Print3D" />
          </div>
          <h1 className="font-display text-4xl font-bold sm:text-5xl">
            תודה, הפרטים התקבלו
          </h1>
          <p className="mt-5 text-lg text-white/75">
            נחזור אליכם בהקדם.
          </p>
        </div>
      </main>
    </>
  );
}
