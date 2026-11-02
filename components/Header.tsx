"use client";

import { Mail, MapPin, Menu, MessageCircle, Phone, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { address, email, navLinks, phones, whatsappChatUrl } from "@/lib/site";
import { Logo } from "./Logo";
import { MobileServicesMenu, ServicesMenu } from "./ServicesMenu";

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(href);
}

/**
 * Two-tier header: a slim navy info bar (address, email, phones, WhatsApp) that scrolls away,
 * and a sticky main bar with only the logo, navigation and one call-to-action, so the
 * navigation never has to compete with contact details for space.
 */
export function Header() {
  const pathname = usePathname() ?? "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Single passive listener; state only changes when crossing the threshold.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-3 focus:z-[60] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-navy focus:shadow-lg"
      >
        Skip to content
      </a>

      {/* Info bar (tablet and up). */}
      <div className="hidden bg-navy text-[0.8rem] text-navy-100 md:block">
        <div className="container-site flex h-10 items-center justify-between gap-6">
          <ul className="flex min-w-0 items-center gap-6">
            <li className="flex min-w-0 items-center gap-2">
              <MapPin aria-hidden className="h-3.5 w-3.5 shrink-0 text-gold-500" strokeWidth={2} />
              <span className="truncate">
                {address.locality}, {address.region}
              </span>
            </li>
            <li className="hidden lg:block">
              <a href={`mailto:${email}`} className="flex items-center gap-2 transition-colors hover:text-white">
                <Mail aria-hidden className="h-3.5 w-3.5 text-gold-500" strokeWidth={2} />
                {email}
              </a>
            </li>
          </ul>
          <ul className="flex shrink-0 items-center gap-5">
            {phones.map((phone) => (
              <li key={phone.e164}>
                <a href={`tel:${phone.e164}`} className="flex items-center gap-2 tabular-nums transition-colors hover:text-white">
                  <Phone aria-hidden className="h-3.5 w-3.5 text-gold-500" strokeWidth={2} />
                  {phone.display}
                </a>
              </li>
            ))}
            <li>
              <a
                href={whatsappChatUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-7 items-center gap-1.5 rounded-full bg-whatsapp px-3 font-semibold text-white transition-colors hover:bg-whatsapp-700"
              >
                <MessageCircle aria-hidden className="h-3.5 w-3.5" strokeWidth={2.2} />
                WhatsApp
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <header
        className={`sticky top-0 z-40 border-b bg-white transition-[border-color,box-shadow] duration-300 ${
          scrolled || open ? "border-line shadow-[0_10px_30px_-22px_rgba(11,37,69,0.55)]" : "border-line/70"
        }`}
      >
        <div
          className={`container-site flex items-center justify-between gap-4 transition-[height] duration-300 xl:gap-8 ${
            scrolled ? "h-16" : "h-[4.5rem] md:h-20"
          }`}
        >
          <Link href="/" className="min-w-0 lg:shrink-0" aria-label="Sarath Kumar & Associates — home">
            <Logo />
          </Link>

          <nav aria-label="Main" className="hidden flex-1 justify-center lg:flex">
            <ul className="flex items-center gap-1 xl:gap-2">
              {navLinks.map((link) => {
                const active = isActive(pathname, link.href);
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={active ? "page" : undefined}
                      className={`relative flex h-10 items-center whitespace-nowrap rounded-full px-3.5 text-[0.93rem] transition-colors duration-200 xl:px-4 ${
                        active
                          ? "bg-navy-100 font-semibold text-navy"
                          : "font-medium text-ink hover:bg-paper-200 hover:text-navy"
                      }`}
                    >
                      {link.label}
                      {active && (
                        <span aria-hidden className="absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-gold" />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <a
              href={`tel:${phones[0].e164}`}
              className="hidden min-h-11 items-center gap-2 whitespace-nowrap rounded-full bg-gold px-5 text-[0.92rem] font-semibold text-navy shadow-[0_8px_20px_-12px_rgba(212,160,23,0.9)] transition-colors duration-300 hover:bg-gold-500 md:inline-flex"
            >
              <Phone aria-hidden className="h-4 w-4" strokeWidth={2.2} />
              Call Now
              <span className="sr-only"> {phones[0].display}</span>
            </a>
            <a
              href={`tel:${phones[0].e164}`}
              aria-label={`Call ${phones[0].display}`}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-gold text-navy md:hidden"
            >
              <Phone aria-hidden className="h-[1.1rem] w-[1.1rem]" strokeWidth={2} />
            </a>
            <button
              ref={toggleRef}
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full text-navy transition-colors hover:bg-navy-100 lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? (
                <X aria-hidden className="h-6 w-6" strokeWidth={1.6} />
              ) : (
                <Menu aria-hidden className="h-6 w-6" strokeWidth={1.6} />
              )}
            </button>
          </div>
        </div>

        <ServicesMenu />

        {open && (
          <nav
            id="mobile-menu"
            aria-label="Mobile"
            className="animate-menu absolute inset-x-0 top-full h-[calc(100dvh-4.5rem)] overflow-y-auto border-t border-line bg-white lg:hidden"
          >
            <ul className="container-site py-4">
              {[{ href: "/", label: "Home" }, ...navLinks].map((link) => {
                const active = link.href === "/" ? pathname === "/" : isActive(pathname, link.href);
                return (
                  <li key={link.href} className="border-b border-line">
                    <Link
                      href={link.href}
                      aria-current={active ? "page" : undefined}
                      onClick={() => setOpen(false)}
                      className={`flex min-h-14 items-center font-serif text-[1.2rem] font-semibold ${active ? "text-navy" : "text-navy-700"}`}
                    >
                      {active && <span aria-hidden className="mr-3 h-[3px] w-5 rounded-full bg-gold" />}
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <div className="container-site">
              <MobileServicesMenu onNavigate={() => setOpen(false)} />
            </div>
            <div className="container-site space-y-3 pb-10 pt-4">
              {phones.map((phone) => (
                <a
                  key={phone.e164}
                  href={`tel:${phone.e164}`}
                  className="flex min-h-12 items-center gap-3 rounded-full border border-line bg-white px-5 text-navy"
                >
                  <Phone aria-hidden className="h-4 w-4 text-royal" strokeWidth={1.8} />
                  Call {phone.display}
                </a>
              ))}
              <a
                href={whatsappChatUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-12 items-center gap-3 rounded-full bg-whatsapp px-5 font-semibold text-white"
              >
                <MessageCircle aria-hidden className="h-4 w-4" strokeWidth={1.8} />
                Chat on WhatsApp
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
              <a
                href={`mailto:${email}`}
                className="flex min-h-12 items-center gap-3 rounded-full border border-line bg-white px-5 text-navy"
              >
                <Mail aria-hidden className="h-4 w-4 text-royal" strokeWidth={1.8} />
                <span className="truncate">{email}</span>
              </a>
            </div>
          </nav>
        )}
      </header>
    </>
  );
}
