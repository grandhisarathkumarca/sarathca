import { ArrowLeft, Mail, MapPin, MessageCircle, Navigation, Phone, UserPlus } from "lucide-react";
import Link from "next/link";
import { CardActions } from "@/components/card/CardActions";
import { CardBack } from "@/components/card/CardBack";
import { CardFace } from "@/components/card/CardFace";
import { ElevatedCard } from "@/components/card/ElevatedCard";
import { StickyCardActions } from "@/components/card/StickyCardActions";
import { JsonLd } from "@/components/JsonLd";
import { LogoMark } from "@/components/Logo";
import { Portrait } from "@/components/Portrait";
import { Reveal, stagger } from "@/components/Reveal";
import { cardPath, cardQrSvg, cardUrl, showQr, whatsappQrSvg } from "@/lib/qr";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import {
  addressLines,
  addressOneLine,
  directionsUrl,
  email,
  firm,
  isSiteUrlConfigured,
  phones,
  proprietor,
  whatsappDisplay,
  whatsappUrl,
} from "@/lib/site";
import { delay } from "@/lib/style";

export const metadata = pageMetadata({
  title: `${proprietor.name} — Digital Business Card`,
  description: `Digital business card of ${proprietor.name} (${proprietor.qualifications}), ${proprietor.role} of ${firm.name}, ${firm.designation}, Narsipatnam. Call, WhatsApp, email, save the contact or get directions.`,
  path: cardPath,
});

const detailsText = [
  proprietor.name,
  proprietor.qualifications,
  `${proprietor.role}, ${firm.name}, ${firm.designation}`,
  ...phones.map((p) => `Phone: ${p.display}`),
  `WhatsApp: ${whatsappDisplay}`,
  `Email: ${email}`,
  `Address: ${addressOneLine}`,
  ...(isSiteUrlConfigured ? [`Card: ${cardUrl}`] : []),
].join("\n");

const quickBase =
  "group flex h-full min-h-[5.25rem] flex-col items-center justify-center gap-2 rounded-[10px] border px-1.5 py-3 text-center text-[0.8rem] font-medium transition-[border-color,background-color,transform] duration-300 hover:-translate-y-0.5 active:translate-y-0 sm:text-[0.86rem]";
const quickClass = `${quickBase} border-white/15 bg-white/[0.06] text-white hover:border-white/40 hover:bg-white/[0.1]`;
const quickPrimaryClass = `${quickBase} border-white bg-white text-navy hover:bg-navy-100`;
const iconRing =
  "flex h-10 w-10 items-center justify-center rounded-full transition-transform duration-500 group-hover:scale-110";

const secondaryClass =
  "inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full border border-white/20 px-4 text-[0.86rem] text-white/90 transition-colors duration-300 hover:border-white/50 hover:bg-white/[0.06]";

/** Name split into words that rise out of a mask on load. */
function RisingName({ text, start }: { text: string; start: number }) {
  return text.split(" ").map((word, i, words) => (
    <span key={word}>
      <span className="word-mask">
        <span style={delay(start + i * 90)}>{word}</span>
      </span>
      {i < words.length - 1 ? " " : null}
    </span>
  ));
}

export default async function DigitalCardPage() {
  const qrSvg = showQr ? await cardQrSvg() : null;
  const whatsappSvg = await whatsappQrSvg();

  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Digital Business Card", path: cardPath }])} />

      <div className="card-page relative overflow-clip bg-navy-950 text-white">
        {/* Stage lighting */}
        <div aria-hidden className="stage-glow pointer-events-none absolute -right-[20%] top-[8%] h-[46rem] w-[46rem] rounded-full bg-[radial-gradient(circle,rgba(30,95,170,0.5),rgba(30,95,170,0)_62%)]" />
        <div aria-hidden className="stage-glow stage-glow-alt pointer-events-none absolute -left-[25%] -top-[10%] h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(circle,rgba(212,160,23,0.2),rgba(212,160,23,0)_65%)]" />
        <div aria-hidden className="ledger-lines-light pointer-events-none absolute inset-0 opacity-70" />

        <header className="relative">
          <div className="container-site flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-2.5 text-white">
              <LogoMark className="h-9 w-9" />
              <span className="hidden font-serif text-[1.02rem] sm:inline">{firm.name}</span>
              <span className="sr-only sm:hidden">{firm.name} — website home</span>
            </Link>
            <Link href="/" className="inline-flex min-h-11 items-center gap-2 text-[0.9rem] text-white/85 hover:text-white">
              <ArrowLeft aria-hidden className="h-4 w-4" />
              <span className="link-underline">Visit website</span>
            </Link>
          </div>
        </header>

        <main id="main" className="relative">
          <div className="container-site grid items-center gap-12 pb-16 pt-6 sm:pt-10 lg:grid-cols-12 lg:gap-10 lg:pb-24 lg:pt-14">
            {/* Identity + quick actions */}
            <div className="mx-auto w-full max-w-xl lg:col-span-5 lg:mx-0">
              <div className="flex items-center gap-4 sm:gap-5">
                <div className="avatar-ring relative shrink-0 rounded-full p-[3px]" style={delay(100)}>
                  <div className="h-[4.75rem] w-[4.75rem] overflow-hidden rounded-full border-2 border-navy-950 bg-navy-700 sm:h-[5.5rem] sm:w-[5.5rem]">
                    <Portrait priority sizes="88px" className="object-[50%_18%]" alt={proprietor.name} />
                  </div>
                </div>
                <div className="min-w-0">
                  <p className="eyebrow animate-rise text-sage-300">Digital business card</p>
                  <h1 className="mt-1.5 text-[1.85rem] leading-[1.1] text-white sm:text-[2.4rem]">
                    <RisingName text={proprietor.name} start={150} />
                  </h1>
                </div>
              </div>
              <p className="animate-rise mt-5 text-[1rem] leading-relaxed text-navy-300" style={delay(420)}>
                <span className="text-white">{proprietor.qualifications}</span> · {proprietor.role},{" "}
                {firm.name}, {firm.designation}
              </p>
              <p className="animate-rise mt-3 flex flex-wrap gap-2 text-[0.78rem]" style={delay(480)}>
                {[`Est. ${firm.established}`, "Narsipatnam, Andhra Pradesh", `FRN ${firm.frn}`].map((chip) => (
                  <span key={chip} className="rounded-full border border-white/15 bg-white/[0.04] px-3 py-1 text-white/80">
                    {chip}
                  </span>
                ))}
              </p>

              <nav id="primary-actions" aria-label="Contact actions" className="mt-8">
                <ul className="grid grid-cols-4 gap-2 sm:gap-3">
                  {[
                    {
                      href: `tel:${phones[0].e164}`,
                      label: "Call",
                      aria: `Call ${phones[0].display}`,
                      icon: Phone,
                    },
                    {
                      href: whatsappUrl,
                      label: "WhatsApp",
                      aria: `Message ${whatsappDisplay} on WhatsApp (opens in a new tab)`,
                      icon: MessageCircle,
                      external: true,
                    },
                    { href: `mailto:${email}`, label: "Email", aria: `Email ${email}`, icon: Mail },
                  ].map((action, i) => (
                    <li key={action.label} className="animate-rise" style={delay(560 + i * 80)}>
                      <a
                        href={action.href}
                        aria-label={action.aria}
                        {...(action.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className={quickClass}
                      >
                        <span className={`${iconRing} bg-white/10`}>
                          <action.icon aria-hidden className="h-[1.15rem] w-[1.15rem] text-sage-300" strokeWidth={1.6} />
                        </span>
                        {action.label}
                      </a>
                    </li>
                  ))}
                  <li className="animate-rise" style={delay(800)}>
                    <a
                      href="/grandhi-sarath-kumar.vcf"
                      download="Grandhi-Sarath-Kumar.vcf"
                      type="text/vcard"
                      aria-label={`Save ${proprietor.name} to contacts (downloads a vCard file)`}
                      className={`${quickPrimaryClass} btn-sheen`}
                    >
                      <span className={`${iconRing} bg-navy`}>
                        <UserPlus aria-hidden className="h-[1.15rem] w-[1.15rem] text-white" strokeWidth={1.6} />
                      </span>
                      Save
                    </a>
                  </li>
                </ul>

                <ul className="animate-rise mt-3 grid grid-cols-3 gap-2 sm:gap-3" style={delay(900)}>
                  <li>
                    <a
                      href={directionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Get directions to the office in Google Maps (opens in a new tab)"
                      className={secondaryClass}
                    >
                      <Navigation aria-hidden className="h-4 w-4 text-sage-300" strokeWidth={1.6} />
                      Directions
                    </a>
                  </li>
                  <CardActions
                    buttonClassName={secondaryClass}
                    activeClassName="border-sage-300 bg-white/10"
                    copyLabel="Copy"
                    shareTitle={`${proprietor.name} — ${firm.name}`}
                    shareText={`${proprietor.name}, ${proprietor.qualifications} — ${proprietor.role}, ${firm.name}, ${firm.designation}`}
                    shareUrl={isSiteUrlConfigured ? cardUrl : null}
                    detailsText={detailsText}
                  />
                </ul>
              </nav>
            </div>

            {/* The card */}
            <div className="animate-card-arrive lg:col-span-7" style={delay(250)}>
              <ElevatedCard
                tone="dark"
                peek
                className="mx-auto max-w-[36rem] sm:px-6"
                front={<CardFace />}
                back={<CardBack qrSvg={qrSvg} whatsappSvg={whatsappSvg} />}
              />
            </div>
          </div>
        </main>
      </div>

      {/* Details and QR codes */}
      <section aria-labelledby="details-title" className="bg-paper py-16 md:py-20">
        <div className="container-site grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-6">
            <Reveal variant="blur">
              <h2 id="details-title" className="text-[1.8rem] md:text-[2.2rem]">
                Contact details
              </h2>
            </Reveal>
            <Reveal group as="ul" className="mt-6 border-t border-line">
              {[
                ...phones.map((phone, i) => ({
                  icon: Phone,
                  label: i === 1 ? "Phone · WhatsApp" : "Phone",
                  value: phone.display,
                  href: `tel:${phone.e164}`,
                  external: false,
                })),
                { icon: Mail, label: "Email", value: email, href: `mailto:${email}`, external: false },
                { icon: MapPin, label: "Office", value: addressLines.join(", "), href: directionsUrl, external: true },
              ].map((row, i) => (
                <li key={row.label + row.value} style={stagger(i)} className="border-b border-line">
                  <a
                    href={row.href}
                    {...(row.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="group flex items-center gap-4 py-4"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line bg-white transition-colors duration-300 group-hover:border-sage group-hover:bg-sage-100">
                      <row.icon aria-hidden className="h-[1.1rem] w-[1.1rem] text-navy" strokeWidth={1.5} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[0.78rem] uppercase tracking-[0.08em] text-ink-soft">{row.label}</span>
                      <span className="block break-words text-[1rem] text-navy">{row.value}</span>
                    </span>
                    {row.external && <span className="sr-only"> (opens in a new tab)</span>}
                  </a>
                </li>
              ))}
            </Reveal>
          </div>

          <div className="lg:col-span-5 lg:col-start-8">
            <Reveal variant="blur">
              <h2 className="text-[1.8rem] md:text-[2.2rem]">Scan with your phone</h2>
              <p className="mt-3 text-[0.98rem] text-ink-soft">Point your phone camera at a code.</p>
            </Reveal>
            <Reveal variant="scale" className="mt-6 grid gap-4 sm:grid-cols-2" delay={0.1}>
              <ScanTile svg={whatsappSvg} title="Chat on WhatsApp" subtitle={whatsappDisplay} icon={MessageCircle} href={whatsappUrl} />
              {qrSvg ? (
                <ScanTile svg={qrSvg} title="Open this card" subtitle="Save or share it later" icon={UserPlus} href={cardPath} internal />
              ) : (
                <div className="flex items-center rounded-[10px] border border-dashed border-line-strong p-5 text-[0.88rem] text-ink-soft">
                  The QR code for this card appears once the website&rsquo;s domain is configured.
                </div>
              )}
            </Reveal>
            {!isSiteUrlConfigured && qrSvg && (
              <p className="mt-3 text-[0.78rem] text-ink-soft">
                Development preview: the card QR points to {cardUrl}. Set NEXT_PUBLIC_SITE_URL before launch.
              </p>
            )}
          </div>
        </div>
      </section>

      <footer className="border-t border-line bg-paper py-6 pb-28 text-center text-[0.8rem] text-ink-soft lg:pb-6">
        © {new Date().getFullYear()} {firm.name}, {firm.designation} ·{" "}
        <Link href="/privacy-policy/" className="link-underline">
          Privacy
        </Link>
      </footer>

      <StickyCardActions
        callHref={`tel:${phones[0].e164}`}
        callLabel={`Call ${phones[0].display}`}
        whatsappHref={whatsappUrl}
        whatsappLabel={`Message ${whatsappDisplay} on WhatsApp (opens in a new tab)`}
        saveLabel={`Save ${proprietor.name} to contacts (downloads a vCard file)`}
      />
    </>
  );
}

function ScanTile({
  svg,
  title,
  subtitle,
  icon: Icon,
  href,
  internal = false,
}: {
  svg: string;
  title: string;
  subtitle: string;
  icon: typeof Phone;
  href: string;
  internal?: boolean;
}) {
  return (
    <a
      href={href}
      {...(internal ? {} : { target: "_blank", rel: "noopener noreferrer" })}
      className="scan-tile group flex flex-col items-center rounded-[10px] border border-line bg-white p-5 text-center transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-navy/25 hover:shadow-[0_20px_40px_-28px_rgba(11,37,69,0.5)]"
    >
      <span
        className="qr-scan relative block w-36 overflow-hidden rounded-[6px] [&_svg]:h-auto [&_svg]:w-full"
        role="img"
        aria-label={`QR code: ${title}`}
        dangerouslySetInnerHTML={{ __html: svg }}
      />
      <span className="mt-4 flex items-center gap-1.5 font-medium text-navy">
        <Icon aria-hidden className="h-4 w-4 text-sage-600" strokeWidth={1.7} />
        {title}
      </span>
      <span className="mt-0.5 text-[0.86rem] tabular-nums text-ink-soft">{subtitle}</span>
      {!internal && <span className="sr-only"> (opens in a new tab)</span>}
    </a>
  );
}
