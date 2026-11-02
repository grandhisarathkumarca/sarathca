"use client";

import { MessageCircle, Phone, UserPlus } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type StickyCardActionsProps = {
  callHref: string;
  callLabel: string;
  whatsappHref: string;
  whatsappLabel: string;
  saveLabel: string;
};

/**
 * Phones only: once the main action buttons scroll out of view, a compact Call / WhatsApp / Save
 * bar slides up from the bottom so the key actions stay one tap away.
 */
export function StickyCardActions({ callHref, callLabel, whatsappHref, whatsappLabel, saveLabel }: StickyCardActionsProps) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const target = document.getElementById("primary-actions");
    if (!target || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(([entry]) => {
      // Show only after the actions have scrolled up past the top, not before reaching them.
      setVisible(!entry.isIntersecting && entry.boundingClientRect.top < 0);
    });
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  const item =
    "flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full text-[0.9rem] font-medium transition-colors duration-300";

  return (
    <div
      ref={ref}
      data-visible={visible ? "" : undefined}
      inert={!visible}
      aria-hidden={!visible}
      className="sticky-actions fixed inset-x-0 bottom-0 z-50 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] lg:hidden"
    >
      <nav
        aria-label="Quick contact"
        className="mx-auto flex max-w-md gap-2 rounded-full border border-white/10 bg-navy-950/95 p-1.5 shadow-[0_18px_40px_-12px_rgba(0,0,0,0.55)] backdrop-blur"
      >
        <a href={callHref} aria-label={callLabel} className={`${item} text-white hover:bg-white/10`}>
          <Phone aria-hidden className="h-4 w-4 text-sage-300" strokeWidth={1.7} />
          Call
        </a>
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={whatsappLabel}
          className={`${item} text-white hover:bg-white/10`}
        >
          <MessageCircle aria-hidden className="h-4 w-4 text-sage-300" strokeWidth={1.7} />
          WhatsApp
        </a>
        <a
          href="/grandhi-sarath-kumar.vcf"
          download="Grandhi-Sarath-Kumar.vcf"
          type="text/vcard"
          aria-label={saveLabel}
          className={`${item} bg-white text-navy hover:bg-navy-100`}
        >
          <UserPlus aria-hidden className="h-4 w-4" strokeWidth={1.7} />
          Save
        </a>
      </nav>
    </div>
  );
}
