"use client";

import { ArrowRight, ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { allSubServices, servicePath, services } from "@/lib/services";
import { ServiceIcon } from "./ServiceIcon";

/**
 * Desktop services bar under the main header: ITR Filing, GST, Audit … each opening a
 * mega-menu with that service's grouped sub-pages (per the content pack's main menu).
 * Opens on hover for pointer users and on click / Enter for keyboard and touch users.
 */
export function ServicesMenu() {
  const pathname = usePathname() ?? "/";
  const [open, setOpen] = useState<string | null>(null);
  const buttons = useRef<Record<string, HTMLButtonElement | null>>({});

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        buttons.current[open]?.focus();
        setOpen(null);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const current = services.find((s) => s.slug === open);
  const close = () => setOpen(null);

  return (
    <div className="relative hidden border-t border-line/70 bg-white lg:block" onMouseLeave={close}>
      <nav aria-label="Services" className="container-site">
        <ul className="flex items-center justify-between">
          {services.map((service) => {
            const active = pathname.startsWith(servicePath(service.slug));
            const expanded = open === service.slug;
            return (
              <li key={service.slug}>
                <button
                  ref={(el) => {
                    buttons.current[service.slug] = el;
                  }}
                  type="button"
                  aria-expanded={expanded}
                  aria-controls="services-mega"
                  onMouseEnter={() => setOpen(service.slug)}
                  onClick={() => setOpen(expanded ? null : service.slug)}
                  className={`relative flex h-11 items-center gap-1 whitespace-nowrap px-2 text-[0.84rem] transition-colors duration-200 xl:px-3 xl:text-[0.9rem] ${
                    active || expanded ? "font-semibold text-navy" : "font-medium text-ink hover:text-navy"
                  }`}
                >
                  {service.menuLabel}
                  <ChevronDown
                    aria-hidden
                    className={`h-3.5 w-3.5 text-navy-500 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
                  />
                  {(active || expanded) && (
                    <span aria-hidden className="absolute inset-x-2 bottom-0 h-[3px] rounded-full bg-gold xl:inset-x-3" />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {current && (
        <div
          id="services-mega"
          className="animate-menu absolute inset-x-0 top-full z-50 border-y border-line bg-white shadow-[0_30px_60px_-30px_rgba(11,37,69,0.45)]"
        >
          <div className="container-site grid max-h-[calc(100svh-9rem)] gap-10 overflow-y-auto py-8 lg:grid-cols-12">
            <div className="lg:col-span-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-navy text-gold-500">
                <ServiceIcon name={current.icon} className="h-5 w-5" strokeWidth={1.6} />
              </span>
              <p className="mt-4 font-serif text-[1.3rem] font-semibold leading-tight text-navy">{current.title}</p>
              <p className="mt-2 text-[0.88rem] leading-relaxed text-ink-soft">{current.summary}</p>
              <Link
                href={servicePath(current.slug)}
                onClick={close}
                className="group mt-5 inline-flex items-center gap-2 text-[0.9rem] font-semibold text-royal"
              >
                View all {allSubServices(current).length} services
                <ArrowRight aria-hidden className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
            </div>
            <div
              className={`grid gap-x-8 gap-y-6 lg:col-span-9 ${
                current.groups.length === 1 ? "" : current.groups.length === 2 ? "grid-cols-2" : "grid-cols-2 xl:grid-cols-4"
              }`}
            >
              {current.groups.map((group) => (
                <div key={group.title}>
                  <p className="border-b border-line pb-2 text-[0.76rem] font-semibold uppercase tracking-[0.08em] text-sage-600">
                    {group.title}
                  </p>
                  <ul className={`mt-2 ${current.groups.length === 1 ? "grid grid-cols-3 gap-x-8" : ""}`}>
                    {group.items.map((item) => (
                      <li key={item.slug}>
                        <Link
                          href={servicePath(current.slug, item.slug)}
                          onClick={close}
                          className="block rounded-[6px] py-1.5 text-[0.9rem] leading-snug text-navy transition-colors hover:text-royal"
                        >
                          {item.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/** Mobile menu version: each service is a collapsible list of its sub-pages. */
export function MobileServicesMenu({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div className="border-b border-line py-3">
      <p className="pb-2 text-[0.76rem] font-semibold uppercase tracking-[0.08em] text-sage-600">Services</p>
      <ul>
        {services.map((service) => (
          <li key={service.slug}>
            <details className="group">
              <summary className="flex min-h-12 cursor-pointer list-none items-center gap-3 text-[1.02rem] font-medium text-navy [&::-webkit-details-marker]:hidden">
                <ServiceIcon name={service.icon} className="h-5 w-5 shrink-0 text-royal" strokeWidth={1.6} />
                <span className="flex-1">{service.menuLabel}</span>
                <ChevronDown aria-hidden className="h-4 w-4 text-navy-500 transition-transform duration-200 group-open:rotate-180" />
              </summary>
              <div className="mb-3 ml-8 space-y-4 border-l border-line pl-4">
                {service.groups.map((group) => (
                  <div key={group.title}>
                    {service.groups.length > 1 && (
                      <p className="pb-1 text-[0.74rem] font-semibold uppercase tracking-[0.08em] text-ink-soft">
                        {group.title}
                      </p>
                    )}
                    <ul>
                      {group.items.map((item) => (
                        <li key={item.slug}>
                          <Link
                            href={servicePath(service.slug, item.slug)}
                            onClick={onNavigate}
                            className="flex min-h-10 items-center text-[0.95rem] text-ink"
                          >
                            {item.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
                <Link
                  href={servicePath(service.slug)}
                  onClick={onNavigate}
                  className="inline-flex min-h-10 items-center gap-1.5 text-[0.92rem] font-semibold text-royal"
                >
                  All {service.menuLabel} services
                  <ArrowRight aria-hidden className="h-3.5 w-3.5" />
                </Link>
              </div>
            </details>
          </li>
        ))}
      </ul>
    </div>
  );
}
