"use client";

import { useEffect, useRef } from "react";
import { useServerInsertedHTML } from "next/navigation";
import { CONSENT_BOOTSTRAP } from "@/components/analytics/consent";

const GTM_ID = "GTM-MDG2VG8X";
const SCRIPT_ID = "campaign-gtm";

// Consent defaults must run before the container, including on a direct landing.
const GTM_SCRIPT = `${CONSENT_BOOTSTRAP}
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`;

/** The paid-campaign landing and thank-you pages register this container. */
export function CampaignTagManager() {
  const inserted = useRef(false);
  useServerInsertedHTML(() => {
    if (inserted.current) return null;
    inserted.current = true;
    return <script id={SCRIPT_ID} dangerouslySetInnerHTML={{ __html: GTM_SCRIPT }} />;
  });

  // Server-inserted head HTML is unavailable on a client-side entry to the LP.
  useEffect(() => {
    if (document.getElementById(SCRIPT_ID)) return;
    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.textContent = GTM_SCRIPT;
    document.head.appendChild(script);
  }, []);

  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
        title="Google Tag Manager"
      />
    </noscript>
  );
}
