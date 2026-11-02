import { ArrowRight, CircleCheck } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ButtonLink } from "@/components/Button";
import { ContactBand } from "@/components/ContactBand";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { ServiceEnquiry } from "@/components/ServiceEnquiry";
import { ServiceFolio } from "@/components/ServiceFolio";
import { ServiceIcon } from "@/components/ServiceIcon";
import { pageMetadata } from "@/lib/seo";
import { allSubServices, getService, servicePath, services } from "@/lib/services";

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((service) => ({ category: service.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[category]">) {
  const { category } = await params;
  const service = getService(category);
  if (!service) return {};
  return pageMetadata({ title: service.title, description: service.metaDescription, path: servicePath(category) });
}

export default async function ServiceCategoryPage({ params }: PageProps<"/services/[category]">) {
  const { category } = await params;
  const service = getService(category);
  if (!service) notFound();

  const others = services.filter((s) => s.slug !== service.slug);

  return (
    <>
      <PageHeader
        eyebrow="Services"
        title={service.title}
        intro={<p>{service.intro}</p>}
        breadcrumbs={[
          { name: "Services", path: "/services/" },
          { name: service.title, path: servicePath(service.slug) },
        ]}
        aside={<ServiceFolio service={service} />}
      />

      <div className="container-site grid gap-14 py-16 md:py-20 lg:grid-cols-12">
        <div className="space-y-16 lg:col-span-8">
          {service.groups.map((group, gi) => (
            <Reveal as="section" key={group.title} aria-labelledby={`group-${gi}`}>
              <div className="flex items-baseline justify-between gap-4">
                <h2 id={`group-${gi}`} className="heading-underline text-[1.6rem] md:text-[1.9rem]">
                  {group.title}
                </h2>
                <span className="shrink-0 text-[0.85rem] text-ink-soft">{group.items.length} services</span>
              </div>
              <ul className="mt-8 grid gap-4 sm:grid-cols-2">
                {group.items.map((item) => (
                  <li key={item.slug}>
                    <Link
                      href={servicePath(service.slug, item.slug)}
                      className="spotlight group flex h-full flex-col rounded-[12px] border border-line bg-paper-200/60 p-5 transition-[border-color,box-shadow,background-color,transform] duration-300 hover:-translate-y-0.5 hover:border-gold/60 hover:bg-white hover:shadow-[0_20px_40px_-30px_rgba(11,37,69,0.45)]"
                    >
                      <h3 className="text-[1.08rem] leading-snug">{item.title}</h3>
                      <p className="mt-2 text-[0.93rem] leading-relaxed">{item.intro}</p>
                      <ul className="mt-4 space-y-1.5 text-[0.86rem] text-navy">
                        {item.points.map((point) => (
                          <li key={point} className="flex items-start gap-2">
                            <CircleCheck aria-hidden className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold-700" strokeWidth={2} />
                            {point}
                          </li>
                        ))}
                      </ul>
                      <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-[0.88rem] font-semibold text-royal">
                        Know more
                        <ArrowRight aria-hidden className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}

          <Reveal as="section">
            <h2 className="text-[1.6rem] md:text-[1.9rem]">Documents typically required</h2>
            <p className="mt-3 text-[0.96rem] text-ink-soft">
              The exact list depends on the assignment. We will confirm what is needed after understanding your
              requirement.
            </p>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
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
        </div>

        <aside className="lg:col-span-4" aria-label={`Enquire about ${service.title}`}>
          <div className="lg:sticky lg:top-40">
            <ServiceEnquiry service={service.slug} />
          </div>
        </aside>
      </div>

      <section aria-labelledby="other-services" className="border-t border-line bg-paper-200 py-14 md:py-16">
        <div className="container-site">
          <h2 id="other-services" className="text-[1.4rem] md:text-[1.6rem]">
            Other services
          </h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((other) => (
              <li key={other.slug}>
                <Link
                  href={servicePath(other.slug)}
                  className="group flex min-h-16 items-center gap-3 rounded-[10px] border border-line bg-white px-4 py-3 text-navy transition-colors hover:border-gold/60"
                >
                  <ServiceIcon name={other.icon} className="h-5 w-5 shrink-0 text-royal" />
                  <span className="flex-1 leading-snug">
                    {other.menuLabel}
                    <span className="block text-[0.8rem] text-ink-soft">{allSubServices(other).length} services</span>
                  </span>
                  <ArrowRight aria-hidden className="h-4 w-4 text-navy-300 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-navy" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ContactBand />
    </>
  );
}
