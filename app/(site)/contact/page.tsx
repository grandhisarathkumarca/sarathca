import { ArrowUpRight, IdCard, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { ContactForm } from "@/components/ContactForm";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { WhatsAppQr } from "@/components/WhatsAppQr";
import { pageMetadata } from "@/lib/seo";
import {
  address,
  addressLines,
  directionsUrl,
  email,
  firm,
  phones,
  proprietor,
  whatsappChatUrl,
  whatsappDisplay,
} from "@/lib/site";

/** Keyless Google Maps embed for the verified postal address (loaded lazily). */
const mapEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(
  `${address.street}, ${address.locality}, ${address.region} ${address.postalCode}`,
)}&z=16&output=embed`;

export const metadata = pageMetadata({
  title: "Contact Us",
  description:
    "Contact Sarath Kumar & Associates, Chartered Accountants, D No. 24-6-41, Thotavaari Veedhi, Narsipatnam, Andhra Pradesh – 531116. Call 79976 70238 / 93911 85755 or send an enquiry.",
  path: "/contact/",
});

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Contact the firm"
        intro={<p>Call, WhatsApp, email or send a query. We reply within 24 hours.</p>}
        breadcrumbs={[{ name: "Contact", path: "/contact/" }]}
      />

      <div className="container-site grid gap-14 py-16 md:py-20 lg:grid-cols-12">
        <section aria-labelledby="details-title" className="lg:col-span-5">
          <Reveal>
            <h2 id="details-title" className="text-[1.6rem] md:text-[1.9rem]">
              {firm.name}
            </h2>
            <p className="mt-1 text-ink-soft">
              {firm.designation} · {proprietor.titledName}
            </p>

            <ul className="mt-8 border-t border-line">
              {phones.map((phone) => (
                <li key={phone.e164} className="border-b border-line">
                  <a href={`tel:${phone.e164}`} className="group flex min-h-16 items-center gap-4 text-navy">
                    <Phone aria-hidden className="h-5 w-5 text-royal" strokeWidth={1.6} />
                    <span className="flex-1">
                      <span className="block text-[0.8rem] text-ink-soft">Phone</span>
                      <span className="text-[1.1rem] tabular-nums">{phone.display}</span>
                    </span>
                  </a>
                </li>
              ))}
              <li className="border-b border-line">
                <a
                  href={whatsappChatUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex min-h-16 items-center gap-4 text-navy"
                >
                  <MessageCircle aria-hidden className="h-5 w-5 text-whatsapp-700" strokeWidth={1.6} />
                  <span className="flex-1">
                    <span className="block text-[0.8rem] text-ink-soft">WhatsApp</span>
                    <span className="text-[1.1rem] tabular-nums">{whatsappDisplay}</span>
                    <span className="sr-only"> (opens in a new tab)</span>
                  </span>
                </a>
              </li>
              <li className="border-b border-line">
                <a href={`mailto:${email}`} className="group flex min-h-16 items-center gap-4 text-navy">
                  <Mail aria-hidden className="h-5 w-5 text-royal" strokeWidth={1.6} />
                  <span className="min-w-0 flex-1">
                    <span className="block text-[0.8rem] text-ink-soft">Email</span>
                    <span className="block break-all text-[1.02rem]">{email}</span>
                  </span>
                </a>
              </li>
              <li className="flex gap-4 border-b border-line py-4">
                <MapPin aria-hidden className="mt-1 h-5 w-5 shrink-0 text-royal" strokeWidth={1.6} />
                <div>
                  <span className="block text-[0.8rem] text-ink-soft">Office</span>
                  <address className="not-italic leading-relaxed text-navy">
                    {addressLines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </address>
                  <a
                    href={directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1.5 text-[0.93rem] font-medium text-navy"
                  >
                    <span className="link-underline">Get directions in Google Maps</span>
                    <ArrowUpRight aria-hidden className="h-4 w-4" />
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </div>
              </li>
            </ul>

            <Link
              href="/digital-card/"
              className="group mt-8 flex items-center gap-4 border border-line bg-white p-5 transition-colors duration-300 hover:border-navy/30"
            >
              <IdCard aria-hidden className="h-6 w-6 text-navy" strokeWidth={1.4} />
              <span className="flex-1">
                <span className="block font-medium text-navy">Digital business card</span>
                <span className="block text-[0.88rem] text-ink-soft">Save the contact to your phone or share it.</span>
              </span>
              <ArrowUpRight aria-hidden className="h-4 w-4 text-navy-300 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-navy" />
            </Link>
            <WhatsAppQr className="mt-6" />
          </Reveal>
        </section>

        <section aria-labelledby="form-title" className="lg:col-span-6 lg:col-start-7">
          <Reveal
            className="rounded-[18px] border border-line bg-white p-6 shadow-[0_30px_60px_-44px_rgba(11,37,69,0.5)] sm:p-8 md:p-10"
            delay={0.06}
          >
            <h2 id="form-title" className="text-[1.6rem] md:text-[1.9rem]">
              Talk to a Chartered Accountant
            </h2>
            <p className="mb-8 mt-2 text-[0.95rem] text-ink-soft">
              Have questions about taxation, audit, or compliance? Fill out the form below and we&rsquo;ll get back to
              you within 24 hours. Fields marked * are required.
            </p>
            <Suspense fallback={<div className="h-[38rem]" aria-hidden />}>
              <ContactForm />
            </Suspense>
          </Reveal>
        </section>
      </div>

      <section aria-labelledby="map-title" className="border-t border-line bg-paper-200 py-14 md:py-20">
        <div className="container-site">
          <h2 id="map-title" className="heading-underline text-[1.6rem] md:text-[1.9rem]">
            Find the office
          </h2>
          <div className="mt-8 overflow-hidden rounded-[18px] border border-line bg-white">
            <iframe
              title={`Map showing ${firm.name}, ${address.locality}`}
              src={mapEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="block h-[22rem] w-full md:h-[26rem]"
            />
          </div>
          <p className="mt-4 text-[0.88rem] text-ink-soft">
            The map is located from the postal address and may be approximate.{" "}
            <a href={directionsUrl} target="_blank" rel="noopener noreferrer" className="font-medium text-navy underline underline-offset-2">
              Open in Google Maps
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
