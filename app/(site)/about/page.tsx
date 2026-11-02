import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { ButtonLink } from "@/components/Button";
import { CardShowcase } from "@/components/card/CardShowcase";
import { ContactBand } from "@/components/ContactBand";
import { PageHeader } from "@/components/PageHeader";
import { Portrait } from "@/components/Portrait";
import { Reveal } from "@/components/Reveal";
import { ServiceIcon } from "@/components/ServiceIcon";
import { mission, principles, whoWeAre } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { delay } from "@/lib/style";
import { servicePath, services } from "@/lib/services";
import { address, firm, proprietor } from "@/lib/site";

export const metadata = pageMetadata({
  title: "About the Firm",
  description: `About ${firm.name}, a Chartered Accountancy firm in Narsipatnam established in ${firm.established} and led by ${proprietor.name} (${proprietor.qualifications}).`,
  path: "/about/",
});

const facts = [
  { label: "Firm", value: `${firm.name}, ${firm.designation}` },
  { label: "Established", value: String(firm.established) },
  { label: "Proprietor", value: `${proprietor.name}, ${proprietor.qualifications}` },
  { label: "ICAI Firm Registration No.", value: firm.frn },
  { label: "ICAI Membership No.", value: proprietor.membershipNo },
  { label: "Office", value: `${address.locality}, ${address.district}, ${address.region}` },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About us"
        title="Trusted professional advice you can rely on"
        intro={
          <p>
            {firm.name} was established in {firm.established} and is led by {proprietor.titledName}. We help clients stay
            compliant, save tax legally and grow with confidence.
          </p>
        }
        breadcrumbs={[{ name: "About Us", path: "/about/" }]}
        aside={
          <figure className="animate-frame mx-auto w-full max-w-[15rem] sm:max-w-[17rem] lg:ml-auto lg:mr-0" style={delay(160)}>
            <div className="relative">
              <div aria-hidden className="absolute -right-3 -top-3 bottom-3 left-3 border border-sage-300" />
              <div className="relative aspect-[4/5] overflow-hidden bg-navy-100 shadow-[0_30px_60px_-40px_rgba(11,37,69,0.55)]">
                <Portrait priority sizes="(min-width: 640px) 17rem, 15rem" className="object-[50%_20%]" />
              </div>
            </div>
            <figcaption className="mt-4 border-l-2 border-gold pl-3">
              <span className="block font-serif text-[1rem] font-semibold text-navy">{proprietor.titledName}</span>
              <span className="block text-[0.84rem] text-ink-soft">
                {proprietor.role} · {proprietor.qualifications}
              </span>
            </figcaption>
          </figure>
        }
      />

      <section aria-labelledby="firm-title" className="py-20 md:py-24">
        <div className="container-site grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <h2 id="firm-title" className="heading-underline text-[1.9rem] md:text-[2.3rem]">
              Who we are
            </h2>
            <div className="prose-site mt-6 text-[1.05rem] leading-relaxed">
              <p>{whoWeAre}</p>
              <p>
                The firm is based in {address.locality}, {address.district}, {address.region}, and was established in{" "}
                {firm.established}. All assignments are accepted subject to applicable law, professional standards and
                agreed terms of engagement.
              </p>
            </div>
            <div className="mt-10 rounded-[14px] border border-line bg-paper-200 p-6 md:p-8">
              <h3 className="text-[0.8rem] font-semibold uppercase tracking-[0.08em] text-sage-600">Our mission</h3>
              <p className="mt-3 font-serif text-[1.25rem] font-medium leading-snug text-navy md:text-[1.4rem]">
                {mission}
              </p>
            </div>
          </Reveal>
          <Reveal className="lg:col-span-4 lg:col-start-9" delay={0.08}>
            <h2 className="font-sans text-[0.78rem] font-medium uppercase tracking-[0.08em] text-sage-600">
              Firm details
            </h2>
            <dl className="mt-4 border-t border-line">
              {facts.map((fact) => (
                <div key={fact.label} className="border-b border-line py-4">
                  <dt className="text-[0.84rem] text-ink-soft">{fact.label}</dt>
                  <dd className="mt-1 text-[1rem] text-navy">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="profile-title" className="border-y border-line bg-white py-20 md:py-24">
        <div className="container-site grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5 lg:self-center">
            <div className="relative mx-auto w-full max-w-[17rem] sm:max-w-[19rem] lg:max-w-[20rem]">
              <div aria-hidden className="absolute -right-3 -top-3 bottom-3 left-3 border border-sage-300" />
              <Reveal variant="mask" className="relative aspect-[4/5] overflow-hidden bg-navy-100">
                <Portrait sizes="(min-width: 1024px) 20rem, (min-width: 640px) 19rem, 17rem" className="object-[50%_20%]" />
              </Reveal>
            </div>
          </Reveal>
          <Reveal className="lg:col-span-6 lg:col-start-7" delay={0.08}>
            <p className="eyebrow">Our founder</p>
            <h2 id="profile-title" className="mt-4 text-[2.1rem] md:text-[2.6rem]">
              {proprietor.titledName}
            </h2>
            <p className="mt-3 text-[1.02rem] font-medium text-royal">{proprietor.tagline}</p>
            <p className="mt-1.5 text-[0.96rem] text-ink-soft">
              {proprietor.role}, {firm.name}, {firm.designation}
            </p>
            <div className="prose-site mt-8 text-[1.04rem] leading-relaxed">
              <p>
                {proprietor.titledName} is a member of the Institute of Chartered Accountants of India (ICAI),
                Membership No. {proprietor.membershipNo}, and founded {firm.name} in {firm.established}. The firm
                provides direct taxation, GST, audit and assurance, accounting, financial reporting and regulatory
                compliance services for companies, firms, individuals and trusts.
              </p>
            </div>
            <dl className="mt-8 grid grid-cols-3 border-y border-line text-center">
              {proprietor.qualifications.split(", ").map((q, i) => (
                <div key={q} className={`py-5 ${i > 0 ? "border-l border-line" : ""}`}>
                  <dt className="sr-only">Qualification</dt>
                  <dd className="font-serif text-[1.25rem] font-semibold text-navy">{q}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-10 flex flex-wrap gap-3">
              <ButtonLink href="/contact/">Contact the firm</ButtonLink>
              <ButtonLink href="/digital-card/" variant="secondary">
                Digital business card
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="approach-title" className="py-20 md:py-24">
        <div className="container-site">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">Why choose us</p>
            <h2 id="approach-title" className="heading-underline mt-4 text-[1.9rem] md:text-[2.3rem]">
              Why clients choose the firm
            </h2>
          </Reveal>
          <ol className="mt-12 grid gap-x-12 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
            {principles.map((principle, i) => (
              <Reveal as="li" key={principle.title} className="flex gap-5 border-t-2 border-gold/70 pt-6" delay={(i % 3) * 0.05}>
                <span className="font-serif text-[0.95rem] font-semibold text-sage-600">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="text-[1.15rem]">{principle.title}</h3>
                  <p className="mt-2 text-[0.98rem] leading-relaxed">{principle.text}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="scope-title" className="border-t border-line bg-paper-200 py-20 md:py-24">
        <div className="container-site grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <p className="eyebrow">Service scope</p>
            <h2 id="scope-title" className="mt-4 text-[1.9rem] md:text-[2.3rem]">
              Areas of practice
            </h2>
            <p className="mt-5 text-ink-soft">
              Services are offered only where the firm is eligible and able to accept the assignment, subject to
              engagement.
            </p>
            <Link href="/services/" className="mt-7 inline-flex items-center gap-2 font-medium text-navy">
              <span className="link-underline">Services overview</span>
              <ArrowRight aria-hidden className="h-4 w-4" />
            </Link>
          </Reveal>
          <Reveal className="lg:col-span-7 lg:col-start-6" delay={0.08}>
            <ul className="grid border-t border-line sm:grid-cols-2">
              {services.map((service, i) => (
                <li key={service.slug} className={`border-b border-line ${i % 2 === 1 ? "sm:border-l sm:pl-5" : "sm:pr-5"}`}>
                  <Link href={servicePath(service.slug)} className="group flex min-h-16 items-center gap-3 py-3 text-navy">
                    <ServiceIcon name={service.icon} className="h-5 w-5 shrink-0 text-navy-500 group-hover:text-sage" />
                    <span className="flex-1 leading-snug">{service.title}</span>
                    <ArrowUpRight aria-hidden className="h-4 w-4 shrink-0 text-navy-300 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-navy" />
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <CardShowcase headingId="card-title" />

      <ContactBand />
    </>
  );
}
