"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const SELECTOR = ":is([data-reveal], [data-reveal-group], [data-reveal-line]):not([data-revealed])";

/**
 * Shared IntersectionObservers for every reveal block on the page; re-run after client navigation.
 * Blocks reveal as soon as they enter the viewport, or once `data-reveal-threshold` (0–1) of
 * them is visible. Marks <html data-reveal-ready> so the inline safety timer in the root layout
 * knows the observer started — if it never does, that timer shows all content instead.
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    document.documentElement.setAttribute("data-reveal-ready", "");
    const pending = document.querySelectorAll<HTMLElement>(SELECTOR);
    if (!("IntersectionObserver" in window)) {
      pending.forEach((el) => el.setAttribute("data-revealed", ""));
      return;
    }

    const observers = new Map<number, IntersectionObserver>();
    const observerFor = (threshold: number) => {
      let observer = observers.get(threshold);
      if (!observer) {
        observer = new IntersectionObserver(
          (entries, obs) => {
            for (const entry of entries) {
              if (!entry.isIntersecting) continue;
              entry.target.setAttribute("data-revealed", "");
              obs.unobserve(entry.target);
            }
          },
          { rootMargin: threshold ? "0px" : "0px 0px -10% 0px", threshold },
        );
        observers.set(threshold, observer);
      }
      return observer;
    };

    pending.forEach((el) => {
      const threshold = Math.min(Math.max(Number(el.dataset.revealThreshold) || 0, 0), 1);
      observerFor(threshold).observe(el);
    });
    return () => observers.forEach((observer) => observer.disconnect());
  }, [pathname]);

  return null;
}
