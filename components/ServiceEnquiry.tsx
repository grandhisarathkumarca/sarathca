import { Mail, MessageCircle, Phone } from "lucide-react";
import { Suspense } from "react";
import { email, phones, whatsappChatUrl } from "@/lib/site";
import { ContactForm } from "./ContactForm";

type ServiceEnquiryProps = {
  /** Service category slug, preselected in the form. */
  service: string;
  /** Sub-service the visitor is reading about, sent with the query. */
  topic?: string;
  title?: string;
};

/** Query form card shown on every service page (right side on desktop, below the content on mobile). */
export function ServiceEnquiry({ service, topic, title = "Talk to a Chartered Accountant" }: ServiceEnquiryProps) {
  return (
    <div id="enquire" className="scroll-mt-28 rounded-[14px] border border-line bg-white p-6 shadow-[0_24px_48px_-36px_rgba(11,37,69,0.45)] sm:p-7">
      <h2 className="text-[1.3rem]">{title}</h2>
      <p className="mb-5 mt-1.5 text-[0.9rem] leading-relaxed text-ink-soft">
        Fill out the form and we&rsquo;ll get back to you within 24 hours.
      </p>
      <Suspense fallback={<div className="h-[30rem]" aria-hidden />}>
        <ContactForm compact service={service} topic={topic} />
      </Suspense>
      <ul className="mt-6 space-y-3 border-t border-line pt-5 text-[0.93rem]">
        <li>
          <a
            href={whatsappChatUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-11 items-center justify-center gap-2 rounded-full bg-whatsapp px-5 font-semibold text-white transition-colors hover:bg-whatsapp-700"
          >
            <MessageCircle aria-hidden className="h-4 w-4" />
            Chat on WhatsApp
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </li>
        {phones.map((phone) => (
          <li key={phone.e164}>
            <a href={`tel:${phone.e164}`} className="flex items-center gap-3 text-navy">
              <Phone aria-hidden className="h-4 w-4 text-royal" strokeWidth={1.6} />
              <span className="link-underline">{phone.display}</span>
            </a>
          </li>
        ))}
        <li>
          <a href={`mailto:${email}`} className="flex items-center gap-3 text-navy">
            <Mail aria-hidden className="h-4 w-4 shrink-0 text-royal" strokeWidth={1.6} />
            <span className="link-underline truncate">{email}</span>
          </a>
        </li>
      </ul>
    </div>
  );
}
