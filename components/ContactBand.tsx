import { ArrowRight, Mail, Phone } from "lucide-react";
import { email, phones } from "@/lib/site";
import { ButtonLink } from "./Button";
import { Reveal } from "./Reveal";

type ContactBandProps = { title?: string; text?: string };

/** Closing enquiry prompt shared by most pages. */
export function ContactBand({
  title = "Discuss your requirement",
  text = "Share a brief description of what you need. The firm will explain the documents required and the proposed scope of work.",
}: ContactBandProps) {
  return (
    <section aria-labelledby="contact-band-title" className="py-20 md:py-28">
      <div className="container-site">
        <Reveal className="relative overflow-hidden rounded-[4px] border border-line bg-white">
          <div className="grid grid-cols-1 gap-10 p-6 sm:p-8 md:p-12 lg:grid-cols-12 lg:gap-12 lg:p-16">
            <div className="lg:col-span-7">
              <p className="eyebrow">Get in touch</p>
              <h2 id="contact-band-title" className="mt-4 text-[2rem] md:text-[2.6rem]">
                {title}
              </h2>
              <p className="mt-5 max-w-xl text-[1.05rem] leading-relaxed">{text}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink href="/contact/">
                  Send an enquiry
                  <ArrowRight aria-hidden className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </ButtonLink>
              </div>
            </div>
            <ul className="space-y-0 self-end border-t border-line lg:col-span-5">
              {phones.map((phone) => (
                <li key={phone.e164} className="border-b border-line">
                  <a href={`tel:${phone.e164}`} className="group flex min-h-16 items-center gap-4 text-navy">
                    <Phone aria-hidden className="h-[1.15rem] w-[1.15rem] text-sage" strokeWidth={1.5} />
                    <span className="flex-1">
                      <span className="block text-[0.78rem] text-ink-soft">Call</span>
                      <span className="text-[1.08rem]">{phone.display}</span>
                    </span>
                    <ArrowRight aria-hidden className="h-4 w-4 text-navy-300 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-navy" />
                  </a>
                </li>
              ))}
              <li className="border-b border-line">
                <a href={`mailto:${email}`} className="group flex min-h-16 items-center gap-4 text-navy">
                  <Mail aria-hidden className="h-[1.15rem] w-[1.15rem] text-sage" strokeWidth={1.5} />
                  <span className="min-w-0 flex-1">
                    <span className="block text-[0.78rem] text-ink-soft">Email</span>
                    <span className="block truncate text-[1.02rem]">{email}</span>
                  </span>
                  <ArrowRight aria-hidden className="h-4 w-4 shrink-0 text-navy-300 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-navy" />
                </a>
              </li>
            </ul>
          </div>
          <div className="brand-rule" />
        </Reveal>
      </div>
    </section>
  );
}
