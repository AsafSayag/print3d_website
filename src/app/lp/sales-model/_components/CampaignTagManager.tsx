"use client";

import { useEffect, useRef } from "react";
import { useServerInsertedHTML } from "next/navigation";
import { CONSENT_BOOTSTRAP } from "@/components/analytics/consent";

const GTM_ID = "GTM-MDG2VG8X";
const SCRIPT_ID = "campaign-gtm";
const HAS_DIRECT_GA = Boolean(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim());

// Consent defaults run immediately. Load the Ads container after the direct
// GA script finishes: if GTM starts first, it loads that same G-ID again via
// gtag/js?cx=c, competing with the hero image on paid traffic.
const GTM_SCRIPT = `${CONSENT_BOOTSTRAP}
(function(w,d){
var started=false;
function start(){if(started)return;started=true;
w.dataLayer=w.dataLayer||[];w.dataLayer.push({'gtm.start':new Date().getTime(),event:'gtm.js'});
var s=d.createElement('script');s.async=true;s.src='https://www.googletagmanager.com/gtm.js?id=${GTM_ID}';d.head.appendChild(s);}
function afterGa(){if(d.readyState==='complete')start();else w.addEventListener('load',start,{once:true});}
if(${HAS_DIRECT_GA}){
if(w.__p3dGaReady)afterGa();else{
w.addEventListener('p3d:ga-ready',afterGa,{once:true});
setTimeout(afterGa,5000);
}}
else afterGa();
})(window,document);`;

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
