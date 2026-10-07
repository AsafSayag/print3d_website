import type { ReactNode } from "react";
import { MOTION } from "@/lib/constants";

type Props = {
  children: ReactNode;
  /** Stagger index — delays reveal by index * step. */
  index?: number;
  as?: "div" | "li" | "span" | "section";
  className?: string;
  /** Extra delay in seconds on top of the index stagger. */
  delay?: number;
  /**
   * Above-the-fold mode: a pure-CSS entrance that plays on the first paint
   * instead of waiting for the element to scroll into view. Use it ONLY for
   * content that is the LCP element or sits with it in the initial viewport
   * (e.g. the hero heading).
   */
  immediate?: boolean;
};

/**
 * Fade + rise reveal, fired once when scrolled into view.
 *
 * No React state and no hydration: the element is emitted with a
 * `data-reveal` marker and the tiny bootstrap in REVEAL_BOOTSTRAP (inlined in
 * the root layout's <head>) watches every marker with one IntersectionObserver
 * and adds `data-revealed` as each one enters the viewport. The bootstrap runs
 * while the HTML is still parsing, so content reveals as soon as it is on
 * screen — it used to sit at opacity:0 until this component's JS chunk had
 * downloaded and hydrated, which on a first mobile visit could take seconds.
 *
 * Content is visible by default: the hidden state only applies under
 * `html.reveal-armed`, which the bootstrap sets — so with JS off, reduced
 * motion, or a browser without IntersectionObserver, everything just shows.
 * `data-revealed` is never a React prop, so React re-renders leave it alone.
 */
export function Reveal({
  children,
  index = 0,
  as: Tag = "div",
  className,
  delay = 0,
  immediate = false,
}: Props) {
  const totalDelay = delay + index * MOTION.staggerStep;

  if (immediate) {
    // The stagger is carried by animation-delay (see .reveal-immediate).
    return (
      <Tag
        className={className ? `reveal-immediate ${className}` : "reveal-immediate"}
        style={{ animationDelay: `${totalDelay}s` }}
      >
        {children}
      </Tag>
    );
  }

  return (
    <Tag
      data-reveal=""
      className={className}
      style={{
        transition: `opacity ${MOTION.revealDuration}s var(--ease-brand) ${totalDelay}s, transform ${MOTION.revealDuration}s var(--ease-brand) ${totalDelay}s`,
      }}
      // The bootstrap may add data-revealed before hydration.
      suppressHydrationWarning
    >
      {children}
    </Tag>
  );
}

/**
 * Inline bootstrap for <Reveal> (rendered as a <script> in the root layout's
 * <head>, so it runs before the body paints). Arms the hidden state, then
 * observes every `[data-reveal]` the parser — or a later client render / soft
 * navigation — inserts, via one MutationObserver feeding one
 * IntersectionObserver. Fallback for elements an IntersectionObserver can't
 * see (e.g. clipped by a horizontal scroller): ~1s after being added, and on
 * every scroll after that, anything vertically in view is revealed — the same
 * safety net the old hook had.
 * Any failure disarms, which leaves all content visible.
 */
export const REVEAL_BOOTSTRAP = `(function(){var d=document.documentElement;try{
if(!("IntersectionObserver" in window)||!("MutationObserver" in window))return;
if(window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches)return;
d.classList.add("reveal-armed");
var pend=new Set(),seen=new WeakSet(),raf=0;
function show(el){el.setAttribute("data-revealed","");pend.delete(el);io.unobserve(el);}
var io=new IntersectionObserver(function(es){for(var i=0;i<es.length;i++)if(es[i].isIntersecting)show(es[i].target);},{rootMargin:"0px 0px -12% 0px"});
var t=0;
function add(el){if(seen.has(el)||el.hasAttribute("data-revealed"))return;seen.add(el);el.__rt=Date.now();pend.add(el);io.observe(el);if(!t)t=setTimeout(function(){t=0;check();},1100);}
function scan(n){if(n.nodeType!==1)return;if(n.hasAttribute("data-reveal"))add(n);var l=n.querySelectorAll("[data-reveal]");for(var i=0;i<l.length;i++)add(l[i]);}
new MutationObserver(function(ms){for(var i=0;i<ms.length;i++){var a=ms[i].addedNodes;for(var j=0;j<a.length;j++)scan(a[j]);}}).observe(d,{childList:true,subtree:true});
scan(d);
function check(){raf=0;var vh=innerHeight,now=Date.now();pend.forEach(function(el){if(!el.isConnected){pend.delete(el);io.unobserve(el);return;}if(now-el.__rt<1000)return;var r=el.getBoundingClientRect();if(r.height&&r.top<vh*0.88&&r.bottom>0)show(el);});}
addEventListener("scroll",function(){if(!raf&&pend.size)raf=requestAnimationFrame(check);},{passive:true});
}catch(e){d.classList.remove("reveal-armed");}})();`;
