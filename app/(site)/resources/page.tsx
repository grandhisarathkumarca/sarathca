import { ArrowUpRight } from "lucide-react";
import { Accordion } from "@/components/Accordion";
import { ContactBand } from "@/components/ContactBand";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { faqs, officialPortals } from "@/lib/content";
import { faqJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "FAQs",
  description:
    "Frequently asked questions on income tax, GST and compliance, with official portal links, from Sarath Kumar & Associates, Chartered Accountants, Narsipatnam.",
  path: "/resources/",
});

export default function ResourcesPage() {
  return (
    <>
      <JsonLd data={faqJsonLd(faqs)} />
      <PageHeader
        eyebrow="FAQs"
        title="FAQs & official portals"
        intro={<p>Answers to common questions and links to official portals.</p>}
        breadcrumbs={[{ name: "FAQs", path: "/resources/" }]}
      />

      <section id="faqs" aria-labelledby="faqs-title" className="scroll-mt-24 py-16 md:py-24">
        <div className="container-site grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <h2 id="faqs-title" className="text-[1.9rem] md:text-[2.3rem]">
              Frequently asked questions
            </h2>
          </Reveal>
          <Reveal className="lg:col-span-8" delay={0.06}>
            <Accordion items={faqs} />
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="portals-title" className="border-t border-line bg-white py-16 md:py-24">
        <div className="container-site grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <h2 id="portals-title" className="text-[1.9rem] md:text-[2.3rem]">
              Official portals
            </h2>
            <p className="mt-4 text-[0.96rem] leading-relaxed text-ink-soft">
              Government and regulatory websites referred to most often. These are external sites not operated by the
              firm.
            </p>
          </Reveal>
          <Reveal className="lg:col-span-8" delay={0.06}>
            <ul className="grid gap-px border border-line bg-line sm:grid-cols-2">
              {officialPortals.map((portal) => (
                <li key={portal.href} className="bg-white">
                  <a
                    href={portal.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex h-full items-start justify-between gap-4 p-6 transition-colors duration-300 hover:bg-paper"
                  >
                    <span>
                      <span className="block font-serif text-[1.1rem] font-semibold text-navy">{portal.name}</span>
                      <span className="mt-1 block text-[0.88rem] text-ink-soft">{portal.note}</span>
                      <span className="sr-only"> (opens in a new tab)</span>
                    </span>
                    <ArrowUpRight aria-hidden className="mt-1 h-4 w-4 shrink-0 text-navy-300 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-navy" />
                  </a>
                </li>
              ))}
            </ul>

          </Reveal>
        </div>
      </section>

      <ContactBand />
    </>
  );
}
