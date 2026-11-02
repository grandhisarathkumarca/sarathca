import { ArrowRight, CircleCheck, FileText, IdCard, MessageCircle, Phone } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { Accordion } from "@/components/Accordion";
import { ButtonLink, buttonClass } from "@/components/Button";
import { ContactBand } from "@/components/ContactBand";
import { ContactForm } from "@/components/ContactForm";
import { Portrait } from "@/components/Portrait";
import { Reveal, stagger } from "@/components/Reveal";
import { CardShowcase } from "@/components/card/CardShowcase";
import { ServicesLedger } from "@/components/ServicesLedger";
import { clientSegments, faqs, mission, principles, trustPoints } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { servicePath, services } from "@/lib/services";
import { address, email, firm, phones, proprietor, whatsappChatUrl } from "@/lib/site";
import type { CSSProperties } from "react";
import { delay } from "@/lib/style";

export const metadata = pageMetadata({
  title: "CA Sarath Kumar | Chartered Accountant | Tax Consultant | GST Services",
  description: "Professional CA Services - GST, ITR, Compliance & Business Solutions",
  path: "/",
  absoluteTitle: true,
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <PracticeMarquee />
      <Introduction />
      <ServicesIndex />
      <ProprietorFeature />
      <CardShowcase />
      <ClientSegments />
      <Approach />
      <FaqPreview />
      <ContactBand />
    </>
  );
}

/** Splits a line into words that rise out of a mask, staggered from `start` ms. */
function AnimatedWords({ text, start }: { text: string; start: number }) {
  return text.split(" ").map((word, i, words) => (
    <span key={`${word}-${i}`}>
      <span className="word-mask">
        <span style={delay(start + i * 70)}>{word}</span>
      </span>
      {i < words.length - 1 ? " " : null}
    </span>
  ));
}

function Hero() {
  return (
    <section aria-labelledby="hero-title" data-parallax="" className="banner-gradient relative overflow-clip text-white">
      <HeroCircles />

      <div className="container-site relative z-10 grid items-center gap-10 py-10 sm:py-12 lg:grid-cols-12 lg:gap-10 lg:py-14 xl:gap-14 xl:py-16">
        <div className="lg:col-span-6 xl:col-span-7">
          <p className="animate-rise inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-[0.78rem] font-medium tracking-[0.04em] text-navy-100">
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-gold" />
            {firm.designation}
            <span className="hidden sm:inline">· {address.locality}</span> · Est. {firm.established}
          </p>
          <h1
            id="hero-title"
            className="mt-5 text-[2.15rem] font-bold leading-[1.1] text-white sm:text-[2.8rem] lg:text-[2.7rem] xl:text-[3.3rem]"
          >
            <span className="block">
              <AnimatedWords text="Simplify Your Income Tax" start={60} />
            </span>
            <span className="block text-gold-500">
              <AnimatedWords text="Return e‑Filing" start={300} />
            </span>
          </h1>
          <p
            className="animate-rise mt-5 max-w-[34rem] text-[1.02rem] leading-relaxed text-navy-100 md:text-[1.1rem]"
            style={delay(480)}
          >
            Choose the correct ITR form for your income sources and file online with expert Chartered Accountant
            help — plus GST, audit, accounting and compliance under one roof.
          </p>
          <div className="animate-rise mt-7 grid gap-3 sm:flex sm:flex-wrap sm:items-center" style={delay(580)}>
            <ButtonLink href={servicePath("itr-filing")} className="btn-sheen px-7">
              <FileText aria-hidden className="h-4 w-4" strokeWidth={2} />
              File My ITR
            </ButtonLink>
            <a href={whatsappChatUrl} target="_blank" rel="noopener noreferrer" className={buttonClass("whatsapp", "px-7")}>
              <MessageCircle aria-hidden className="h-4 w-4" strokeWidth={2} />
              Talk on WhatsApp
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            <a href={`tel:${phones[0].e164}`} className={buttonClass("light")}>
              <Phone aria-hidden className="h-4 w-4" strokeWidth={2} />
              Call {phones[0].display}
            </a>
          </div>

          <ul className="animate-rise mt-8 grid max-w-xl grid-cols-1 gap-x-6 gap-y-2.5 text-[0.93rem] text-navy-100 sm:grid-cols-2" style={delay(700)}>
            {heroPoints.map((point) => (
              <li key={point} className="flex items-center gap-2.5">
                <CircleCheck aria-hidden className="h-[1.1rem] w-[1.1rem] shrink-0 text-gold-500" strokeWidth={2} />
                {point}
              </li>
            ))}
          </ul>
        </div>

        <div className="animate-frame lg:col-span-6 xl:col-span-5" style={delay(200)}>
          <div className="rounded-[18px] bg-white p-5 text-ink shadow-[0_40px_80px_-30px_rgba(3,12,28,0.65)] sm:p-6">
            <h2 className="text-[1.25rem] text-navy sm:text-[1.35rem]">Talk to a Chartered Accountant</h2>
            <p className="mb-4 mt-1 text-[0.88rem] leading-relaxed text-ink-soft">
              Have questions about taxation, audit, or compliance? Fill out the form below and we&rsquo;ll get back to
              you within 24 hours.
            </p>
            <Suspense fallback={<div className="h-[30rem]" aria-hidden />}>
              <ContactForm compact />
            </Suspense>
          </div>
        </div>
      </div>
      <div className="brand-rule relative" />
    </section>
  );
}

/** Ring echoes of the banner artwork plus soft glass circles floating in two depth layers. */
function HeroCircles() {
  const v = (vars: Record<string, string>) => vars as CSSProperties;
  const glass = "block rounded-full border border-white/20 bg-white/[0.06] backdrop-blur-[2px]";
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      {/* Back layer: soft glow and large rings. */}
      <div className="orb-layer" style={v({ "--d": "-10px" })}>
        <span className="float-b absolute -left-24 bottom-[-8rem] h-[24rem] w-[24rem] rounded-full bg-royal/45 blur-3xl" style={v({ "--dur": "22s" })} />
        <span className="absolute -right-24 -top-40 h-[34rem] w-[34rem] rounded-full border border-white/15" />
        <span className="absolute -bottom-48 right-[18%] h-[26rem] w-[26rem] rounded-full border border-white/10" />
        <span className="absolute -bottom-24 -right-16 h-[20rem] w-[20rem] rounded-full border border-white/10" />
      </div>

      {/* Front layer: floating glass circles. */}
      <div className="orb-layer" style={v({ "--d": "22px" })}>
        <span className="pop-in absolute bottom-[8%] right-[3%] hidden sm:block" style={v({ "--pd": "0.5s" })}>
          <span className={`float-a h-28 w-28 ${glass}`} style={v({ "--dur": "9s" })} />
        </span>
        <span className="pop-in absolute right-[40%] top-[8%] hidden lg:block" style={v({ "--pd": "0.7s" })}>
          <span className={`float-a h-20 w-20 ${glass}`} style={v({ "--dur": "11s", "--dl": "-3s" })} />
        </span>
        <span className="pop-in absolute bottom-[10%] left-[44%] hidden lg:block" style={v({ "--pd": "0.9s" })}>
          <span className={`float-a h-14 w-14 ${glass}`} style={v({ "--dur": "8s", "--dl": "-5s" })} />
        </span>
        <span className="pop-in absolute right-[2%] top-[10%] hidden md:block" style={v({ "--pd": "1.1s" })}>
          <span className={`float-a h-16 w-16 ${glass}`} style={v({ "--dur": "10s", "--dl": "-2s" })} />
        </span>
        <span className="pop-in absolute -left-6 top-[42%] hidden md:block" style={v({ "--pd": "1.3s" })}>
          <span className={`float-a h-24 w-24 ${glass}`} style={v({ "--dur": "12s", "--dl": "-6s" })} />
        </span>
      </div>
    </div>
  );
}

const heroPoints = [
  "Chartered Accountant-led team",
  "Timely filings, no missed due dates",
  "Transparent fees, no hidden charges",
  "Reply within 24 hours",
];

function TrustStrip() {
  return (
    <section aria-label="About the practice at a glance" className="border-t border-line bg-white">
      <div className="container-site">
        <Reveal group as="dl" className="cell-grid">
          {trustPoints.map((point, i) => (
            <div key={point.label} style={stagger(i)} className="py-6 sm:px-6 lg:py-8 lg:first:pl-0">
              <dt className="text-[0.76rem] font-medium uppercase tracking-[0.08em] text-sage-600">{point.label}</dt>
              <dd className="mt-2 font-serif text-[1.12rem] leading-snug text-navy">{point.value}</dd>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/** Slow, pausable ribbon of practice areas; the duplicate copy is hidden from assistive technology. */
function PracticeMarquee() {
  const items = services.map((service) => service.menuLabel);
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {items.map((item) => (
        <li key={item} className="flex items-center whitespace-nowrap">
          <span className="px-7 font-serif text-[1.35rem] text-navy md:text-[1.6rem]">{item}</span>
          <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-sage" />
        </li>
      ))}
    </ul>
  );
  return (
    <section aria-label="Areas of practice" className="marquee overflow-clip border-y border-line bg-paper-200 py-6">
      <div className="marquee-track">
        {row(false)}
        {row(true)}
      </div>
    </section>
  );
}

function Introduction() {
  return (
    <section aria-labelledby="intro-title" className="py-20 md:py-28">
      <div className="container-site grid gap-10 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <p className="eyebrow">About the firm</p>
          <h2 id="intro-title" className="heading-underline mt-4 text-[2rem] md:text-[2.5rem]">
            End-to-end tax, audit and compliance services
          </h2>
          <blockquote className="mt-8 border-l-[3px] border-gold pl-5 text-[1.02rem] leading-relaxed text-navy">
            <span className="block text-[0.76rem] font-semibold uppercase tracking-[0.08em] text-sage-600">Our mission</span>
            <span className="mt-1.5 block">{mission}</span>
          </blockquote>
        </Reveal>
        <Reveal className="prose-site text-[1.06rem] leading-relaxed lg:col-span-6 lg:col-start-7 lg:pt-12" delay={0.08}>
          <p>
            M/s {firm.name} is a Chartered Accountancy firm based in {address.locality}, {address.district}, founded
            and led by {proprietor.titledName}. Established in {firm.established}, the firm delivers end-to-end services
            in direct taxation, GST and indirect taxation, audit and assurance, accounting, financial reporting, and
            regulatory compliance for companies, firms, individuals, and trusts.
          </p>
          <p>
            We combine technical expertise with clear, honest communication so that every client understands exactly
            what is being done and why.
          </p>
          <Link href="/about/" className="mt-8 inline-flex items-center gap-2 font-medium text-navy">
            <span className="link-underline">More about the firm</span>
            <ArrowRight aria-hidden className="h-4 w-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

function ServicesIndex() {
  return (
    <section aria-labelledby="services-title" className="border-t border-line bg-white py-20 md:py-28">
      <div className="container-site">
        <Reveal variant="blur" className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-xl">
            <p className="eyebrow">Services</p>
            <h2 id="services-title" className="heading-underline mt-4 text-[2rem] md:text-[2.6rem]">
              Our Services
            </h2>
          </div>
          <p className="max-w-sm text-[0.98rem] text-ink-soft">
            Nine practice areas, one accountable firm. Each service is offered subject to eligibility, applicable law
            and agreed terms of engagement.
          </p>
        </Reveal>

        <ServicesLedger />
        <Reveal className="mt-14 flex justify-center">
          <ButtonLink href="/services/" variant="secondary">
            View all services in detail
            <ArrowRight aria-hidden className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}

function ProprietorFeature() {
  return (
    <section aria-labelledby="proprietor-title" className="banner-gradient text-navy-100">
      <div className="container-site grid items-center gap-16 overflow-x-clip py-20 md:py-24 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <Reveal variant="scale" className="photo-stage relative mx-auto w-full max-w-[18rem] sm:max-w-[20rem] lg:max-w-[21rem]">
            {/* Soft glow behind the photo. */}
            <span aria-hidden className="pointer-events-none absolute -inset-10 rounded-full bg-royal/40 blur-3xl" />
            {/* Offset gold frame and corner brackets that extend on hover. */}
            <span aria-hidden className="absolute -right-4 -top-4 bottom-4 left-4 rounded-[22px] border border-gold/50" />
            <span aria-hidden className="photo-corner photo-corner-tl" />
            <span aria-hidden className="photo-corner photo-corner-br" />

            <div className="photo-sheen group relative aspect-[4/5] overflow-hidden rounded-[22px] bg-navy-700 shadow-[0_40px_80px_-30px_rgba(3,12,28,0.8)] ring-1 ring-white/15">
              <div className="parallax h-full w-full">
                <Portrait
                  sizes="(min-width: 1024px) 21rem, (min-width: 640px) 20rem, 18rem"
                  className="scale-[1.06] object-[50%_20%] transition-transform duration-700 ease-out group-hover:scale-[1.12]"
                />
              </div>
              <span aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-navy-950/60 to-transparent" />
            </div>
          </Reveal>
        </div>
        <Reveal className="lg:col-span-6 lg:col-start-7" delay={0.08}>
          <p className="eyebrow text-sage-300">Meet the founder</p>
          <h2 id="proprietor-title" className="mt-4 text-[2.1rem] text-white md:text-[2.7rem]">
            {proprietor.titledName}
          </h2>
          <p className="mt-3 text-[1.02rem] font-medium text-gold-500">{proprietor.tagline}</p>
          <p className="mt-1.5 text-[0.95rem] text-navy-300">
            {proprietor.qualifications} · {proprietor.role}, {firm.name}
          </p>
          <div className="prose-site mt-8 max-w-xl text-[1.04rem] leading-relaxed text-navy-100/90">
            <p>
              {proprietor.titledName} is a member of the Institute of Chartered Accountants of India (ICAI) and
              founded {firm.name} in {firm.established}. The firm provides taxation, GST, audit, accounting and
              compliance services for individuals, firms, companies and trusts.
            </p>
          </div>
          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[0.92rem]">
            <li>
              <a href={`mailto:${email}`} className="link-underline break-all text-white">
                {email}
              </a>
            </li>
            <li>
              <a href={`tel:${phones[0].e164}`} className="link-underline text-white">
                {phones[0].display}
              </a>
            </li>
          </ul>
          <Reveal group as="dl" delay={0.3} className="mt-10 grid max-w-xl grid-cols-2 border-t border-white/15 text-[0.9rem]">
            <div style={stagger(0)} className="border-b border-white/15 py-4 pr-4">
              <dt className="text-navy-300">ICAI Membership No.</dt>
              <dd className="mt-1 font-serif text-[1.15rem] text-white">{proprietor.membershipNo}</dd>
            </div>
            <div style={stagger(1)} className="border-b border-l border-white/15 py-4 pl-5">
              <dt className="text-navy-300">Firm Registration No.</dt>
              <dd className="mt-1 font-serif text-[1.15rem] text-white">{firm.frn}</dd>
            </div>
          </Reveal>
          <div className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href="/about/" className="btn-sheen">
              Read the full profile
            </ButtonLink>
            <ButtonLink href="/digital-card/" variant="light">
              <IdCard aria-hidden className="h-4 w-4" strokeWidth={1.6} />
              View digital business card
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ClientSegments() {
  return (
    <section aria-labelledby="segments-title" className="py-20 md:py-28">
      <div className="container-site grid gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <p className="eyebrow">Client segments</p>
          <h2 id="segments-title" className="mt-4 text-[2rem] md:text-[2.5rem]">
            Who the firm works with
          </h2>
          <p className="mt-5 text-[1rem] leading-relaxed text-ink-soft">
            The firm serves clients across a range of business types. The scope of each assignment is confirmed with
            the client before work begins.
          </p>
          <Link href="/industries/" className="mt-7 inline-flex items-center gap-2 font-medium text-navy">
            <span className="link-underline">View all client segments</span>
            <ArrowRight aria-hidden className="h-4 w-4" />
          </Link>
        </Reveal>
        <div className="lg:col-span-7 lg:col-start-6">
          <Reveal group as="ul" className="grid border-t border-line sm:grid-cols-2">
            {clientSegments.map((segment, i) => (
              <li
                key={segment.title}
                style={stagger(i)}
                className={`group flex gap-4 border-b border-line py-5 ${i % 2 === 1 ? "sm:border-l sm:pl-6" : "sm:pr-6"}`}
              >
                <span
                  aria-hidden
                  className="mt-[0.6rem] h-1.5 w-1.5 shrink-0 rotate-45 bg-sage transition-transform duration-500 group-hover:rotate-[225deg] group-hover:scale-150"
                />
                <span className="text-[1rem] leading-snug text-navy">
                  {segment.title}
                  {segment.note && <span className="mt-1 block text-[0.86rem] text-ink-soft">{segment.note}</span>}
                </span>
              </li>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Approach() {
  return (
    <section aria-labelledby="approach-title" className="border-y border-line bg-paper-200 py-20 md:py-28">
      <div className="container-site">
        <Reveal variant="blur" className="max-w-2xl">
          <p className="eyebrow">Why choose us</p>
          <h2 id="approach-title" className="heading-underline mt-4 text-[2rem] md:text-[2.5rem]">
            Compliance made simple, accurate and stress-free
          </h2>
        </Reveal>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {principles.map((principle, i) => (
            <Reveal
              key={principle.title}
              variant="scale"
              className="spotlight group rounded-[14px] border border-line bg-white p-7 transition-[border-color,box-shadow,transform] duration-500 hover:-translate-y-1 hover:border-gold/60 hover:shadow-[0_24px_48px_-32px_rgba(11,37,69,0.45)] md:p-8"
              delay={(i % 3) * 0.08}
            >
              <span
                aria-hidden
                className="flex h-11 w-11 items-center justify-center rounded-full bg-navy text-[0.9rem] font-semibold text-gold-500 ring-2 ring-gold/60 ring-offset-2"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-5 text-[1.2rem]">{principle.title}</h3>
              <p className="mt-2.5 text-[0.96rem] leading-relaxed">{principle.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function FaqPreview() {
  return (
    <section aria-labelledby="faq-title" className="pt-20 md:pt-28">
      <div className="container-site grid gap-10 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <p className="eyebrow">Questions</p>
          <h2 id="faq-title" className="mt-4 text-[2rem] md:text-[2.5rem]">
            Frequently asked questions
          </h2>
          <Link href="/resources/" className="mt-7 inline-flex items-center gap-2 font-medium text-navy">
            <span className="link-underline">All FAQs</span>
            <ArrowRight aria-hidden className="h-4 w-4" />
          </Link>
        </Reveal>
        <Reveal className="lg:col-span-7 lg:col-start-6" delay={0.08}>
          <Accordion items={faqs.slice(0, 6)} />
        </Reveal>
      </div>
    </section>
  );
}
