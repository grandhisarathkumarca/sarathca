"use client";

import { Plus } from "lucide-react";
import { useId, useState } from "react";
import type { FaqItem } from "@/lib/services";

type AccordionProps = {
  items: FaqItem[];
  /** Heading level used for each question, to fit the surrounding outline. */
  headingLevel?: "h3" | "h4";
};

/**
 * Disclosure accordion. Answers stay in the server-rendered HTML (for search engines and no-JS
 * visitors) and are collapsed with a CSS grid-row transition rather than unmounted.
 */
export function Accordion({ items, headingLevel = "h3" }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const baseId = useId();
  const Heading = headingLevel;

  return (
    <div className="border-t border-line">
      {items.map((item, index) => {
        const open = openIndex === index;
        const buttonId = `${baseId}-q${index}`;
        const panelId = `${baseId}-a${index}`;
        return (
          <div key={item.question} className="border-b border-line">
            <Heading className="font-sans text-base">
              <button
                id={buttonId}
                type="button"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenIndex(open ? null : index)}
                className="group flex w-full items-start justify-between gap-6 py-5 text-left text-[1.04rem] font-medium leading-snug text-navy transition-colors hover:text-navy-700 md:py-6"
              >
                <span>{item.question}</span>
                <span
                  aria-hidden
                  className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-[transform,border-color,background-color] duration-300 ${
                    open ? "rotate-45 border-sage bg-sage-100" : "border-line-strong group-hover:border-navy-300"
                  }`}
                >
                  <Plus className="h-3.5 w-3.5 text-navy" strokeWidth={1.8} />
                </span>
              </button>
            </Heading>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              data-accordion-panel=""
              className={`grid transition-[grid-template-rows,opacity,visibility] duration-300 ease-out motion-reduce:transition-none ${
                open ? "visible grid-rows-[1fr] opacity-100" : "invisible grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className="max-w-2xl pb-6 pr-10 text-[0.98rem] leading-relaxed text-ink">{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
