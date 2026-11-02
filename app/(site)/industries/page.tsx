import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { ContactBand } from "@/components/ContactBand";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { clientSegments } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { servicePath } from "@/lib/services";

export const metadata = pageMetadata({
  title: "Industries & Client Segments",
  description:
    "Sarath Kumar & Associates serves individuals, proprietorships, firms, LLPs, companies, startups, MSMEs, traders, manufacturers, service businesses and eligible non-profits.",
  path: "/industries/",
});

const groups = [
  {
    title: "By type of client",
    items: clientSegments.slice(0, 3),
  },
  {
    title: "By line of business",
    items: clientSegments.slice(3, 8),
  },
  {
    title: "Not-for-profit",
    items: clientSegments.slice(8),
  },
];

export default function IndustriesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Client segments"
        title="Industries & client segments"
        intro={
          <p>
            The firm serves clients across a range of business types. The services relevant to each client depend on
            the nature of the entity and its obligations, and are confirmed before an engagement begins.
          </p>
        }
        breadcrumbs={[{ name: "Client Segments", path: "/industries/" }]}
      />

      <div className="container-site py-16 md:py-24">
        <div className="space-y-16">
          {groups.map((group) => (
            <Reveal as="section" key={group.title} className="grid gap-6 lg:grid-cols-12">
              <h2 className="text-[1.5rem] md:text-[1.8rem] lg:col-span-4">{group.title}</h2>
              <ul className="border-t border-navy/15 lg:col-span-8">
                {group.items.map((segment) => (
                  <li key={segment.title} className="flex items-baseline gap-5 border-b border-line py-5">
                    <span aria-hidden className="h-1.5 w-1.5 shrink-0 translate-y-[-0.2rem] rotate-45 bg-sage" />
                    <span>
                      <span className="font-serif text-[1.25rem] leading-snug text-navy md:text-[1.4rem]">
                        {segment.title}
                      </span>
                      {segment.note && <span className="mt-1 block text-[0.93rem] text-ink-soft">{segment.note}</span>}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-20 grid gap-6 border-t border-line pt-10 md:grid-cols-2">
          <p className="max-w-lg text-[0.95rem] leading-relaxed text-ink-soft">
            Listing a segment does not imply specialist industry credentials or any guaranteed outcome. Please share the
            details of your business so the firm can confirm whether and how it can assist.
          </p>
          <div className="flex flex-col gap-3 md:items-end">
            <Link href="/services/" className="inline-flex items-center gap-2 font-medium text-navy">
              <span className="link-underline">See the services offered</span>
              <ArrowRight aria-hidden className="h-4 w-4" />
            </Link>
            <Link href={servicePath("registrations")} className="inline-flex items-center gap-2 font-medium text-navy">
              <span className="link-underline">Support for startups and MSMEs</span>
              <ArrowRight aria-hidden className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </div>

      <ContactBand />
    </>
  );
}
