import type { MetadataRoute } from "next";
import { allSubServices, servicePath, services } from "@/lib/services";
import { absoluteUrl } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: { path: string; priority: number }[] = [
    { path: "/", priority: 1 },
    { path: "/about/", priority: 0.8 },
    { path: "/services/", priority: 0.9 },
    ...services.flatMap((s) => [
      { path: servicePath(s.slug), priority: 0.8 },
      ...allSubServices(s).map((item) => ({ path: servicePath(s.slug, item.slug), priority: 0.7 })),
    ]),
    { path: "/industries/", priority: 0.6 },
    { path: "/resources/", priority: 0.6 },
    { path: "/contact/", priority: 0.8 },
    { path: "/digital-card/", priority: 0.5 },
    { path: "/privacy-policy/", priority: 0.2 },
    { path: "/terms-and-conditions/", priority: 0.2 },
    { path: "/disclaimer/", priority: 0.2 },
  ];
  return pages.map((page) => ({ url: absoluteUrl(page.path), priority: page.priority }));
}
