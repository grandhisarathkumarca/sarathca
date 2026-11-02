import type { Metadata } from "next";
import { ButtonLink } from "@/components/Button";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <>
      <Header />
      <main id="main" className="flex-1">
        <div className="container-site py-24 md:py-36">
          <p className="eyebrow">404</p>
          <h1 className="mt-4 text-[2.4rem] md:text-[3.2rem]">This page could not be found</h1>
          <p className="mt-5 max-w-lg text-[1.05rem]">
            The address may have changed. You can return to the homepage or browse the firm&rsquo;s services.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <ButtonLink href="/">Go to the homepage</ButtonLink>
            <ButtonLink href="/services/" variant="secondary">
              View services
            </ButtonLink>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
