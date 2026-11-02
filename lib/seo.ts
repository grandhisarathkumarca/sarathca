import type { Metadata } from "next";
import { absoluteUrl, address, email, firm, phones, portrait, proprietor, siteUrl } from "./site";

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  /** Use the full title as-is instead of appending the firm name. */
  absoluteTitle?: boolean;
};

export const ogImage = {
  url: "/og-image.png",
  width: 1200,
  height: 630,
  alt: `${firm.name}, ${firm.designation} — Narsipatnam, Andhra Pradesh`,
};

export function pageMetadata({ title, description, path, absoluteTitle }: PageMetaInput): Metadata {
  const url = absoluteUrl(path);
  const fullTitle = absoluteTitle ? title : `${title} | ${firm.name}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      title: fullTitle,
      description,
      siteName: `${firm.name}, ${firm.designation}`,
      locale: "en_IN",
      images: [ogImage],
    },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: [ogImage.url] },
  };
}

const organizationId = `${siteUrl}/#organization`;
const personId = `${siteUrl}/#proprietor`;

/** AccountingService is a schema.org LocalBusiness subtype that matches a CA practice. */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AccountingService",
        "@id": organizationId,
        name: firm.name,
        description: `${firm.name}, ${firm.designation} — audit, taxation, GST, accounting and compliance services from Narsipatnam, Andhra Pradesh.`,
        url: absoluteUrl("/"),
        logo: absoluteUrl("/icon.svg"),
        image: absoluteUrl(`${portrait.basePath}-800.jpg`),
        email,
        telephone: phones.map((p) => p.e164),
        foundingDate: String(firm.established),
        address: {
          "@type": "PostalAddress",
          streetAddress: address.street,
          addressLocality: address.locality,
          addressRegion: address.region,
          postalCode: address.postalCode,
          addressCountry: address.countryCode,
        },
        founder: { "@id": personId },
      },
      {
        "@type": "Person",
        "@id": personId,
        name: proprietor.name,
        jobTitle: `${proprietor.role}, ${firm.name}`,
        honorificSuffix: proprietor.qualifications,
        image: absoluteUrl(`${portrait.basePath}-800.jpg`),
        worksFor: { "@id": organizationId },
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: absoluteUrl("/"),
        name: firm.name,
        inLanguage: "en-IN",
        publisher: { "@id": organizationId },
      },
    ],
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...items].map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function faqJsonLd(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}
