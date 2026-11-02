import type { ReactNode } from "react";
import { legalPagesApproved } from "@/lib/site";
import { PageHeader } from "./PageHeader";

type LegalPageProps = {
  title: string;
  path: string;
  updated: string;
  children: ReactNode;
};

export function LegalPage({ title, path, updated, children }: LegalPageProps) {
  return (
    <>
      <PageHeader title={title} intro={<p className="text-[0.95rem] text-ink-soft">Last updated: {updated}</p>} breadcrumbs={[{ name: title, path }]} />
      <div className="container-site py-14 md:py-20">
        {!legalPagesApproved && (
          <p role="note" className="mb-10 max-w-3xl border-l-2 border-sage bg-sage-100/70 px-5 py-4 text-[0.93rem] text-navy">
            Draft for the proprietor&rsquo;s review and approval before launch. This text has not been reviewed by a
            legal professional.
          </p>
        )}
        <div className="legal max-w-3xl text-[1rem] leading-relaxed">{children}</div>
      </div>
    </>
  );
}
