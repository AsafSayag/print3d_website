/** Load GA4 directly, without a Tag Manager container. */
export function GoogleAnalytics({ gaId }: { gaId: string }) {
  const src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaId)}`;

  return (
    <script
      id="ga-init"
      dangerouslySetInnerHTML={{
        __html: `(function(){
window.dataLayer=window.dataLayer||[];
window.gtag=window.gtag||function(){dataLayer.push(arguments);};
gtag('js',new Date());
gtag('config',${JSON.stringify(gaId)},{send_page_view:false});
var done=0;function load(){if(done)return;done=1;var s=document.createElement('script');s.async=true;s.src=${JSON.stringify(src)};document.head.appendChild(s);}
if(document.readyState==='complete'){load();}else{window.addEventListener('load',load,{once:true});setTimeout(load,3000);}
})();`,
      }}
    />
  );
}
