import type { Metadata, Viewport } from "next";
import { JsonLd } from "@/components/JsonLd";
import { PointerEffects } from "@/components/PointerEffects";
import { RevealObserver } from "@/components/RevealObserver";
import { heading, sans } from "@/lib/fonts";
import { ogImage, organizationJsonLd } from "@/lib/seo";
import { firm, siteUrl } from "@/lib/site";
import "./globals.css";

/**
 * Enables reveal animations before first paint. Safety net: if the reveal observer has not
 * started within 4s (script error, blocked bundle), drop the class so nothing stays hidden.
 */
const revealBootstrap =
  "(function(d){d.classList.add('js');setTimeout(function(){if(!d.hasAttribute('data-reveal-ready'))d.classList.remove('js')},4000)})(document.documentElement)";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `CA Sarath Kumar | Chartered Accountant | Tax Consultant | GST Services`,
    template: `%s | ${firm.name}`,
  },
  description: "Professional CA Services - GST, ITR, Compliance & Business Solutions",
  keywords: [
    "chartered accountant",
    "tax consultant",
    "GST registration",
    "audit services",
    "tax planning",
    "Narsipatnam CA",
    "Visakhapatnam CA",
    "income tax filing",
    "ROC compliance",
  ],
  applicationName: firm.name,
  authors: [{ name: firm.name }],
  formatDetection: { telephone: false, email: false, address: false },
  robots: { index: true, follow: true },
  openGraph: {
    siteName: `${firm.name}, ${firm.designation}`,
    locale: "en_IN",
    type: "website",
    images: [ogImage],
  },
  twitter: { card: "summary_large_image", images: [ogImage.url] },
};

export const viewport: Viewport = {
  themeColor: "#0b2545",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IN" className={`${heading.variable} ${sans.variable}`} suppressHydrationWarning>
      <body className="flex min-h-dvh flex-col">
        <script dangerouslySetInnerHTML={{ __html: revealBootstrap }} />
        <noscript>
          <style>{`[data-accordion-panel]{visibility:visible!important;opacity:1!important;grid-template-rows:1fr!important}`}</style>
        </noscript>
        <JsonLd data={organizationJsonLd()} />
        {children}
        <RevealObserver />
        <PointerEffects />
      </body>
    </html>
  );
}
