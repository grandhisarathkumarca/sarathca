"use client";

import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useState, type CSSProperties } from "react";
import { allSubServices, servicePath, services } from "@/lib/services";
import { CountUp } from "./CountUp";
import { ServiceIcon } from "./ServiceIcon";

const total = services.reduce((sum, s) => sum + allSubServices(s).length, 0);

/**
 * Homepage services as a ledger: each practice area is a ruled entry with a
 * dotted leader and service count, closed by a double-underlined total. On desktop, pointing
 * at (or focusing) an entry opens its card on the right — groups, counts and sub-services.
 */
export function ServicesLedger() {
  const [active, setActive] = useState(0);
  const current = services[active];
  const groupMax = Math.max(...current.groups.map((g) => g.items.length));

  return (
    <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-14">
      <div className="lg:col-span-7">
        <div
          aria-hidden
          className="flex items-center gap-4 border-b-2 border-navy pb-3 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-ink-soft"
        >
          <span className="flex-1">Practice area</span>
          <span>Services</span>
        </div>

        <ol>
          {services.map((service, i) => {
            const count = allSubServices(service).length;
            const on = i === active;
            return (
              <li key={service.slug}>
                <Link
                  href={servicePath(service.slug)}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  data-active={on ? "" : undefined}
                  className="ledger-row group relative flex items-center gap-4 border-b border-line py-5 lg:py-[1.15rem]"
                >
                  <span className="ledger-title min-w-0 flex-1">
                    <span className="flex items-center gap-3">
                      <ServiceIcon
                        name={service.icon}
                        className="ledger-icon hidden h-5 w-5 shrink-0 text-royal sm:block"
                        strokeWidth={1.6}
                      />
                      <span className="font-serif text-[1.3rem] font-semibold leading-tight text-navy md:text-[1.6rem]">
                        {service.menuLabel}
                      </span>
                      <span aria-hidden className="ledger-leader hidden h-[3px] flex-1 self-end sm:block" />
                    </span>
                    <span className="mt-1.5 block text-[0.9rem] leading-snug text-ink-soft lg:hidden">{service.summary}</span>
                  </span>
                  <span className="shrink-0 font-serif text-[1.3rem] font-semibold tabular-nums text-navy md:text-[1.5rem]">
                    {count}
                    <span className="sr-only"> services</span>
                  </span>
                  <ArrowUpRight
                    aria-hidden
                    className="ledger-arrow h-5 w-5 shrink-0 text-navy-300"
                    strokeWidth={1.6}
                  />
                </Link>
              </li>
            );
          })}
        </ol>

        <div className="flex items-end gap-4 pt-5">
          <span className="flex-1 text-[0.8rem] font-semibold uppercase tracking-[0.14em] text-navy">
            Total
            <span className="ml-2 font-sans text-[0.85rem] font-normal normal-case tracking-normal text-ink-soft">
              services under one roof
            </span>
          </span>
          <span className="border-b-[4px] border-double border-navy pb-0.5 font-serif text-[1.9rem] font-bold leading-none tabular-nums text-navy md:text-[2.2rem]">
            <CountUp value={total} />
          </span>
          <span className="w-5" />
        </div>
      </div>

      {/* Details of the entry in focus (desktop). */}
      <div className="hidden lg:col-span-5 lg:block">
        <div className="sticky top-40">
          <div
            aria-live="polite"
            className="spotlight spotlight-dark banner-gradient ledger-lines-light relative overflow-hidden rounded-[22px] p-9 text-navy-100 shadow-[0_40px_80px_-40px_rgba(6,22,43,0.7)]"
          >
            <span aria-hidden className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full border border-white/10" />
            <span aria-hidden className="pointer-events-none absolute -bottom-28 -right-6 h-56 w-56 rounded-full border border-white/10" />

            <div key={current.slug} className="ledger-swap relative">
              <div className="flex items-start justify-between gap-6">
                <div>
                  <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-gold-500">
                    {allSubServices(current).length} services
                  </p>
                  <p className="mt-3 font-serif text-[1.75rem] font-semibold leading-tight text-white">{current.title}</p>
                </div>
                <ServiceIcon name={current.icon} className="h-20 w-20 shrink-0 text-gold-500/80" strokeWidth={0.9} />
              </div>
              <p className="mt-4 max-w-sm text-[0.95rem] leading-relaxed text-navy-100/90">{current.summary}</p>

              {current.groups.length > 1 && (
                <ul className="mt-7 space-y-3">
                  {current.groups.map((group, gi) => (
                    <li key={group.title} className="text-[0.82rem]">
                      <div className="flex justify-between gap-3">
                        <span className="font-medium text-white">{group.title}</span>
                        <span className="tabular-nums text-navy-300">{group.items.length}</span>
                      </div>
                      <span className="mt-1.5 block h-[3px] rounded-full bg-white/10">
                        <span
                          className="ledger-bar block h-full rounded-full bg-gold"
                          style={{ width: `${(group.items.length / groupMax) * 100}%`, "--i": gi } as CSSProperties}
                        />
                      </span>
                    </li>
                  ))}
                </ul>
              )}

              <ul className="mt-7 flex flex-wrap gap-2">
                {allSubServices(current)
                  .slice(0, 9)
                  .map((item, ii) => (
                    <li key={item.slug} className="ledger-chip" style={{ "--i": ii } as CSSProperties}>
                      <Link
                        href={servicePath(current.slug, item.slug)}
                        className="inline-flex min-h-9 items-center rounded-full border border-white/20 bg-white/[0.06] px-3.5 text-[0.82rem] text-white transition-colors hover:border-gold hover:bg-gold hover:text-navy"
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                {allSubServices(current).length > 9 && (
                  <li className="ledger-chip inline-flex min-h-9 items-center px-2 text-[0.82rem] text-navy-300" style={{ "--i": 9 } as CSSProperties}>
                    +{allSubServices(current).length - 9} more
                  </li>
                )}
              </ul>

              <div className="mt-8 flex items-center gap-5 border-t border-white/15 pt-6">
                <Link
                  href={servicePath(current.slug)}
                  className="group inline-flex min-h-11 items-center gap-2 rounded-full bg-gold px-6 text-[0.92rem] font-semibold text-navy transition-colors hover:bg-gold-500"
                >
                  Explore {current.menuLabel}
                  <ArrowRight aria-hidden className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </Link>
                <Link
                  href={`/contact/?service=${current.slug}`}
                  className="text-[0.9rem] font-medium text-white underline-offset-4 hover:underline"
                >
                  Enquire now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
