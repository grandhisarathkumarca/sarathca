import { MessageCircle } from "lucide-react";
import Link from "next/link";
import { addressLines, email, firm, navLinks, phones, proprietor, whatsappChatUrl } from "@/lib/site";
import { services, servicePath } from "@/lib/services";
import { Logo } from "./Logo";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-navy text-navy-300">
      <div className="brand-rule" />
      <div className="container-site grid gap-12 py-16 md:grid-cols-12 md:py-20">
        <div className="md:col-span-4">
          <Logo inverted />
          <p className="mt-6 max-w-xs text-[0.92rem] leading-relaxed">
            Chartered Accountants in Narsipatnam, Andhra Pradesh, since {firm.established} — taxation, GST, audit,
            accounting and compliance under one roof.
          </p>
          <a
            href={whatsappChatUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full bg-whatsapp px-5 text-[0.9rem] font-semibold text-white transition-colors hover:bg-whatsapp-700"
          >
            <MessageCircle aria-hidden className="h-4 w-4" />
            Chat with us on WhatsApp
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
          <dl className="mt-6 space-y-1 text-[0.85rem]">
            <div className="flex gap-2">
              <dt>Proprietor:</dt>
              <dd className="text-white">
                {proprietor.name}, {proprietor.qualifications}
              </dd>
            </div>
            <div className="flex gap-2">
              <dt>ICAI Firm Registration No.:</dt>
              <dd className="text-white">{firm.frn}</dd>
            </div>
          </dl>
        </div>

        <nav aria-label="Footer — services" className="md:col-span-3">
          <h2 className="font-sans text-[0.78rem] font-medium uppercase tracking-[0.08em] text-sage-300">Services</h2>
          <ul className="mt-5 space-y-2.5 text-[0.92rem]">
            {services.map((service) => (
              <li key={service.slug}>
                <Link href={servicePath(service.slug)} className="link-underline hover:text-white">
                  {service.menuLabel}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Footer — firm" className="md:col-span-2">
          <h2 className="font-sans text-[0.78rem] font-medium uppercase tracking-[0.08em] text-sage-300">Firm</h2>
          <ul className="mt-5 space-y-2.5 text-[0.92rem]">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="link-underline hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/digital-card/" className="link-underline hover:text-white">
                Digital Business Card
              </Link>
            </li>
          </ul>
        </nav>

        <div className="md:col-span-3">
          <h2 className="font-sans text-[0.78rem] font-medium uppercase tracking-[0.08em] text-sage-300">Office</h2>
          <address className="mt-5 text-[0.92rem] not-italic leading-relaxed">
            {addressLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </address>
          <ul className="mt-5 space-y-2 text-[0.92rem]">
            {phones.map((phone) => (
              <li key={phone.e164}>
                <a href={`tel:${phone.e164}`} className="link-underline text-white">
                  {phone.display}
                </a>
              </li>
            ))}
            <li>
              <a href={`mailto:${email}`} className="link-underline break-all text-white">
                {email}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-site flex flex-col gap-3 pb-24 pt-6 text-[0.82rem] sm:pb-6 md:flex-row md:items-center md:justify-between md:pr-52">
          <p>
            © {year} {firm.name}, {firm.designation}. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {[
              { href: "/privacy-policy/", label: "Privacy Policy" },
              { href: "/terms-and-conditions/", label: "Terms and Conditions" },
              { href: "/disclaimer/", label: "Disclaimer" },
              { href: "/contact/", label: "Contact" },
            ].map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="link-underline hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
