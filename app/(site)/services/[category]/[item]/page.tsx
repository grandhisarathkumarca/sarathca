import { ArrowRight, CircleCheck, ClipboardCheck, FileCheck2, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ButtonLink } from "@/components/Button";
import { ContactBand } from "@/components/ContactBand";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { ServiceEnquiry } from "@/components/ServiceEnquiry";
import { ServiceFolio } from "@/components/ServiceFolio";
import { pageMetadata } from "@/lib/seo";
import { getService, getSubService, servicePath, services } from "@/lib/services";
import { firm } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return services.flatMap((service) =>
    service.groups.flatMap((group) => group.items.map((item) => ({ category: service.slug, item: item.slug }))),
  );
}

function lookup(category: string, slug: string) {
  const service = getService(category);
  const found = service && getSubService(service, slug);
  return service && found ? { service, ...found } : undefined;
}

export async function generateMetadata({ params }: PageProps<"/services/[category]/[item]">) {
  const { category, item: slug } = await params;
  const found = lookup(category, slug);
  if (!found) return {};
  const { service, item } = found;
  return pageMetadata({
    title: `${item.title} — ${service.menuLabel}`,
    description: `${item.intro} ${item.points.join(", ")}. ${firm.name}, ${firm.designation}.`,
    path: servicePath(category, slug),
  });
}

const pointIcons = [ClipboardCheck, FileCheck2, ShieldCheck];

/** Short service page, in the order set out in section 15 of the content pack. */
export default async function SubServicePage({ params }: PageProps<"/services/[category]/[item]">) {
  const { category, item: slug } = await params;
  const found = lookup(category, slug);
  if (!found) notFound();
  const { service, group, item } = found;

  const related = group.items.filter((i) => i.slug !== item.slug);

  return (
    <>
      <PageHeader
        eyebrow={service.menuLabel}
        title={item.title}
        intro={<p>{item.intro}</p>}
        breadcrumbs={[
          { name: "Services", path: "/services/" },
          { name: service.menuLabel, path: servicePath(service.slug) },
          { name: item.title, path: servicePath(service.slug, item.slug) },
        ]}
        aside={<ServiceFolio service={service} item={item} />}
      />

      <div className="container-site grid gap-14 py-16 md:py-20 lg:grid-cols-12">
        <div className="space-y-16 lg:col-span-7">
          <Reveal as="section">
            <h2 className="heading-underline text-[1.6rem] md:text-[1.9rem]">What we do for you</h2>
            <ul className="mt-8 grid gap-4 sm:grid-cols-3">
              {item.points.map((point, i) => {
                const Icon = pointIcons[i];
                return (
                  <li key={point} className="spotlight group rounded-[12px] border border-line bg-paper-200/70 p-5 transition-[border-color,transform] duration-500 hover:-translate-y-1 hover:border-gold/60">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-navy text-gold-500 transition-transform duration-500 group-hover:rotate-[-8deg] group-hover:scale-110">
                      <Icon aria-hidden className="h-5 w-5" strokeWidth={1.7} />
                    </span>
                    <p className="mt-4 text-[1rem] font-medium leading-snug text-navy">{point}</p>
                  </li>
                );
              })}
            </ul>
          </Reveal>

          <Reveal as="section">
            <h2 className="text-[1.6rem] md:text-[1.9rem]">Documents required</h2>
            <p className="mt-3 text-[0.96rem] text-ink-soft">
              The exact list depends on your case. We will confirm what is needed after understanding your requirement.
            </p>
            <ul className="mt-5 space-y-3">
              {service.documents.map((doc) => (
                <li key={doc} className="flex gap-3 text-[0.98rem]">
                  <CircleCheck aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-whatsapp" strokeWidth={1.8} />
                  {doc}
                </li>
              ))}
            </ul>
            <ButtonLink href="#enquire" className="btn-sheen mt-8">
              Get Started – Enquire Now
              <ArrowRight aria-hidden className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </ButtonLink>
          </Reveal>

          {related.length > 0 && (
            <Reveal as="nav" aria-label={`More in ${group.title}`}>
              <h2 className="font-sans text-[0.8rem] font-semibold uppercase tracking-[0.08em] text-sage-600">
                More in {group.title}
              </h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {related.map((other) => (
                  <li key={other.slug}>
                    <Link
                      href={servicePath(service.slug, other.slug)}
                      className="inline-flex min-h-10 items-center rounded-full border border-line bg-white px-4 text-[0.9rem] text-navy transition-colors hover:border-gold hover:bg-sage-100"
                    >
                      {other.title}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link href={servicePath(service.slug)} className="mt-6 inline-flex items-center gap-2 text-[0.92rem] font-medium text-navy">
                <span className="link-underline">All {service.title}</span>
                <ArrowRight aria-hidden className="h-4 w-4" />
              </Link>
            </Reveal>
          )}

          <p className="border-l-2 border-navy-300 bg-paper-200/70 px-5 py-4 text-[0.9rem] leading-relaxed text-ink-soft">
            The scope of work depends on the facts of the matter, applicable law and the agreed terms of engagement. No
            particular outcome is guaranteed.
          </p>
        </div>

        <aside className="lg:col-span-5 lg:col-start-8" aria-label={`Enquire about ${item.title}`}>
          <div className="lg:sticky lg:top-40">
            <ServiceEnquiry service={service.slug} topic={item.title} />
          </div>
        </aside>
      </div>

      <ContactBand />
    </>
  );
}
