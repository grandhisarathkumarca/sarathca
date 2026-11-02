import { ArrowUpRight, GraduationCap, MessageCircle } from "lucide-react";
import { Accordion } from "@/components/Accordion";
import { ContactBand } from "@/components/ContactBand";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { courses, faqs, officialPortals } from "@/lib/content";
import { faqJsonLd, pageMetadata } from "@/lib/seo";
import { whatsappUrl } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Courses & FAQs",
  description:
    "Practical courses (Tally Prime with GST, ITR filing, GST practical, payroll, Excel), FAQs and official portal links from Sarath Kumar & Associates, Chartered Accountants, Narsipatnam.",
  path: "/resources/",
});

export default function ResourcesPage() {
  return (
    <>
      <JsonLd data={faqJsonLd(faqs)} />
      <PageHeader
        eyebrow="Courses & FAQs"
        title="Courses & frequently asked questions"
        intro={<p>Short practical training courses, answers to common questions and links to official portals.</p>}
        breadcrumbs={[{ name: "Courses & FAQs", path: "/resources/" }]}
      />

      <section id="courses" aria-labelledby="courses-title" className="scroll-mt-24 bg-paper-200 py-16 md:py-24">
        <div className="container-site grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <p className="eyebrow">Courses</p>
            <h2 id="courses-title" className="heading-underline mt-4 text-[1.9rem] md:text-[2.3rem]">
              Short practical training
            </h2>
            <p className="mt-6 text-[0.98rem] leading-relaxed text-ink-soft">
              Hands-on courses for students, accountants and business owners. Contact the firm for the next batch dates
              and fees.
            </p>
            <a
              href={`${whatsappUrl}?text=${encodeURIComponent("Hello! Please share the batch dates and fees for your courses.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex min-h-11 items-center gap-2 rounded-full bg-whatsapp px-5 text-[0.92rem] font-semibold text-white transition-colors hover:bg-whatsapp-700"
            >
              <MessageCircle aria-hidden className="h-4 w-4" />
              Ask for batch dates &amp; fees
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </Reveal>
          <Reveal group as="ul" className="grid gap-4 sm:grid-cols-2 lg:col-span-8">
            {courses.map((course) => (
              <li key={course.title} className="flex gap-4 rounded-[14px] border border-line bg-white p-6">
                <span
                  aria-hidden
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-navy text-gold-500"
                >
                  <GraduationCap className="h-5 w-5" strokeWidth={1.8} />
                </span>
                <span>
                  <h3 className="text-[1.08rem]">{course.title}</h3>
                  <p className="mt-1.5 text-[0.92rem] leading-relaxed">{course.text}</p>
                </span>
              </li>
            ))}
          </Reveal>
        </div>
      </section>

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
