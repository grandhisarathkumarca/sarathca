import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { ContactBand } from "@/components/ContactBand";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { ServiceIcon } from "@/components/ServiceIcon";
import { pageMetadata } from "@/lib/seo";
import { allSubServices, servicePath, services } from "@/lib/services";

export const metadata = pageMetadata({
  title: "Services — ITR, GST, Audit, Accounting, Registrations & Compliance",
  description:
    "All services of Sarath Kumar & Associates, Chartered Accountants: ITR filing, GST, audit, accounting, registrations, project finance, valuation, corporate compliance and statutory filings.",
  path: "/services/",
});

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="Our Services"
        intro={
          <p>
            Tax, GST, audit, accounting, registrations, loans, valuation and compliance — everything your business
            needs from one Chartered Accountant firm. Choose a service to see what we do and the documents needed.
          </p>
        }
        breadcrumbs={[{ name: "Services", path: "/services/" }]}
        aside={
          <nav aria-label="Jump to a service" className="animate-rise border-l border-line pl-6 text-[0.92rem]">
            <p className="mb-3 text-[0.78rem] font-medium uppercase tracking-[0.08em] text-sage-600">On this page</p>
            <ul className="space-y-1.5">
              {services.map((service) => (
                <li key={service.slug}>
                  <a href={`#${service.slug}`} className="link-underline text-navy">
                    {service.menuLabel}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        }
      />

      <div className="container-site space-y-6 py-16 md:py-20">
        {services.map((service) => (
          <Reveal
            as="section"
            key={service.slug}
            id={service.slug}
            aria-labelledby={`${service.slug}-title`}
            className="spotlight scroll-mt-40 rounded-[16px] border border-line bg-white p-6 transition-[border-color,box-shadow] duration-500 hover:border-gold/50 hover:shadow-[0_30px_60px_-40px_rgba(11,37,69,0.45)] md:p-9"
          >
            <div className="grid gap-8 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-navy text-gold-500">
                  <ServiceIcon name={service.icon} className="h-6 w-6" strokeWidth={1.6} />
                </span>
                <h2 id={`${service.slug}-title`} className="mt-5 text-[1.6rem] leading-tight md:text-[1.9rem]">
                  {service.title}
                </h2>
                <p className="mt-3 text-[0.98rem] leading-relaxed">{service.summary}</p>
                <Link
                  href={servicePath(service.slug)}
                  className="group mt-6 inline-flex min-h-11 items-center gap-2 font-semibold text-navy"
                >
                  <span className="link-underline">View all {allSubServices(service).length} services</span>
                  <ArrowRight aria-hidden className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
              <div className="grid gap-8 sm:grid-cols-2 lg:col-span-8">
                {service.groups.map((group) => (
                  <div key={group.title} className={service.groups.length === 1 ? "sm:col-span-2" : undefined}>
                    {service.groups.length > 1 && (
                      <h3 className="font-sans text-[0.8rem] font-semibold uppercase tracking-[0.08em] text-sage-600">
                        {group.title}
                      </h3>
                    )}
                    <ul
                      className={`mt-3 border-t border-line ${service.groups.length === 1 ? "sm:grid sm:grid-cols-2 sm:gap-x-8" : ""}`}
                    >
                      {group.items.map((item) => (
                        <li key={item.slug} className="border-b border-line">
                          <Link
                            href={servicePath(service.slug, item.slug)}
                            className="group flex min-h-11 items-center gap-3 py-2 text-[0.95rem] text-navy hover:text-royal"
                          >
                            <span aria-hidden className="h-1.5 w-1.5 shrink-0 rotate-45 bg-sage" />
                            <span className="flex-1">{item.title}</span>
                            <ArrowRight
                              aria-hidden
                              className="h-3.5 w-3.5 text-navy-300 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-royal"
                            />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
        <p className="max-w-3xl pt-4 text-[0.92rem] text-ink-soft">
          The scope of every assignment depends on the entity, the facts, applicable law and the terms of engagement.
          Nothing on this page is a guarantee of any particular outcome.
        </p>
      </div>

      <ContactBand />
    </>
  );
}
