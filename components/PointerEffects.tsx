"use client";

import { useEffect } from "react";

/**
 * One shared pointer listener for decorative effects (fine pointers, motion allowed only):
 * - [data-parallax]: sets --px / --py (-1…1) from the pointer's position over the element.
 * - .spotlight: sets --mx / --my (px) so a soft glow follows the pointer across a card.
 */
export function PointerEffects() {
  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || reduced.matches) return;

    let frame = 0;
    let last: PointerEvent | null = null;

    const apply = () => {
      frame = 0;
      const event = last;
      if (!event || !(event.target instanceof Element)) return;

      const spot = event.target.closest<HTMLElement>(".spotlight");
      if (spot) {
        const r = spot.getBoundingClientRect();
        spot.style.setProperty("--mx", `${event.clientX - r.left}px`);
        spot.style.setProperty("--my", `${event.clientY - r.top}px`);
      }

      const field = event.target.closest<HTMLElement>("[data-parallax]");
      if (field) {
        const r = field.getBoundingClientRect();
        field.style.setProperty("--px", (((event.clientX - r.left) / r.width) * 2 - 1).toFixed(3));
        field.style.setProperty("--py", (((event.clientY - r.top) / r.height) * 2 - 1).toFixed(3));
      }
    };

    const onMove = (event: PointerEvent) => {
      last = event;
      if (!frame) frame = requestAnimationFrame(apply);
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      document.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
