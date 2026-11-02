import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { breadcrumbJsonLd } from "@/lib/seo";
import { delay } from "@/lib/style";
import { JsonLd } from "./JsonLd";

type Crumb = { name: string; path: string };

type PageHeaderProps = {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  breadcrumbs: Crumb[];
  aside?: ReactNode;
};

/** Inner-page masthead with visible breadcrumbs and matching BreadcrumbList structured data. */
export function PageHeader({ eyebrow, title, intro, breadcrumbs, aside }: PageHeaderProps) {
  return (
    <section data-parallax="" className="relative overflow-clip border-b border-line">
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />
      {/* Floating glass circles echoing the homepage hero, kept light so the text stays primary. */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="orb-layer" style={{ "--d": "-8px" } as CSSProperties}>
          <span className="float-b absolute -right-24 -top-32 h-[22rem] w-[22rem] rounded-full bg-royal/[0.06] blur-3xl" />
          <span className="absolute -right-36 -top-48 h-[30rem] w-[30rem] rounded-full border border-navy/10" />
        </div>
        <div className="orb-layer" style={{ "--d": "18px" } as CSSProperties}>
          <span className="pop-in absolute right-[4%] top-[12%] hidden sm:block" style={{ "--pd": "0.5s" } as CSSProperties}>
            <span
              className="float-a block h-20 w-20 rounded-full border border-navy/10 bg-royal/[0.04] backdrop-blur-[2px]"
              style={{ "--dur": "10s" } as CSSProperties}
            />
          </span>
          <span className="pop-in absolute bottom-[10%] right-[40%] hidden lg:block" style={{ "--pd": "0.8s" } as CSSProperties}>
            <span
              className="float-a block h-14 w-14 rounded-full border border-navy/10 bg-royal/[0.04] backdrop-blur-[2px]"
              style={{ "--dur": "8s", "--dl": "-3s" } as CSSProperties}
            />
          </span>
        </div>
      </div>

      <div className="container-site relative grid gap-10 pb-12 pt-8 md:pb-14 md:pt-10 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <nav aria-label="Breadcrumb" className="animate-rise mb-8 text-[0.85rem] text-ink-soft">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="link-underline hover:text-navy">
                  Home
                </Link>
              </li>
              {breadcrumbs.map((crumb, i) => {
                const last = i === breadcrumbs.length - 1;
                return (
                  <li key={crumb.path} className="flex items-center gap-2">
                    <span aria-hidden className="text-line-strong">/</span>
                    {last ? (
                      <span aria-current="page" className="text-navy">
                        {crumb.name}
                      </span>
                    ) : (
                      <Link href={crumb.path} className="link-underline hover:text-navy">
                        {crumb.name}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ol>
          </nav>
          {eyebrow && (
            <p className="eyebrow animate-rise" style={delay(60)}>
              {eyebrow}
            </p>
          )}
          <h1
            className="animate-rise mt-4 text-balance text-[2.1rem] leading-[1.1] md:text-[2.7rem] xl:text-[3.1rem]"
            style={delay(120)}
          >
            {title}
          </h1>
          <span aria-hidden className="animate-draw-x mt-6 block h-px w-24 bg-sage" style={delay(320)} />
          {intro && (
            <div
              className="animate-rise mt-5 max-w-2xl text-[1.04rem] leading-relaxed text-ink md:text-[1.1rem]"
              style={delay(200)}
            >
              {intro}
            </div>
          )}
        </div>
        {aside && <div className="lg:col-span-4 lg:self-end">{aside}</div>}
      </div>
    </section>
  );
}
