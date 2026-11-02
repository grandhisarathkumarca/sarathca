import { Mail, MessageCircle, Phone } from "lucide-react";
import { addressLines, email, firm, phones, proprietor, whatsappNumber } from "@/lib/site";
import { LogoMark } from "../Logo";

type CardFaceProps = {
  /** Render the contact details as links (true on the card page, false for a decorative preview inside a link). */
  interactive?: boolean;
  className?: string;
};

/**
 * HTML recreation of the firm's printed visiting card: logo and firm name top-left,
 * proprietor right-aligned, the graduated stripe, then address and telephone numbers.
 */
export function CardFace({ interactive = true, className = "" }: CardFaceProps) {
  const Tel = interactive ? "a" : "span";
  return (
    <div
      className={`relative flex h-full flex-col overflow-hidden rounded-[6px] border border-line bg-white text-navy shadow-[0_50px_80px_-40px_rgba(11,37,69,0.5),0_18px_30px_-20px_rgba(11,37,69,0.25),0_2px_6px_-2px_rgba(11,37,69,0.08)] ${className}`}
    >
      <div className="flex-1 px-6 pb-5 pt-6 sm:px-8 sm:pt-7">
        <div className="flex items-center gap-3.5">
          <LogoMark className="h-12 w-12 shrink-0 sm:h-14 sm:w-14" />
          <div className="min-w-0">
            <p className="font-sans text-[0.98rem] font-semibold uppercase leading-tight tracking-[0.04em] text-slate-blue sm:text-[1.15rem]">
              {firm.name}
            </p>
            <p className="mt-0.5 text-[0.88rem] text-navy sm:text-[0.95rem]">{firm.designation}</p>
          </div>
        </div>

        <div className="mt-6 text-right sm:mt-7">
          <p className="font-serif text-[1.35rem] leading-tight sm:text-[1.55rem]">{proprietor.name}</p>
          <p className="mt-1 text-[0.86rem] tracking-[0.02em] text-ink">{proprietor.qualifications}</p>
          <p className="text-[0.82rem] text-ink-soft">{proprietor.role}</p>
          <p className="mt-2 flex items-center justify-end gap-2 text-[0.86rem] text-ink">
            <Mail aria-hidden className="h-3.5 w-3.5 shrink-0 text-sage" strokeWidth={1.8} />
            {interactive ? (
              <a href={`mailto:${email}`} className="link-underline break-all">
                {email}
              </a>
            ) : (
              <span className="break-all">{email}</span>
            )}
          </p>
        </div>
      </div>

      <div className="brand-rule" />

      <div className="flex flex-col gap-4 px-6 py-5 sm:flex-row sm:items-end sm:justify-between sm:px-8">
        <address className="text-[0.84rem] not-italic leading-relaxed text-ink">
          {addressLines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </address>
        <div className="flex items-start gap-2.5 text-[0.95rem] tabular-nums sm:text-right">
          <Phone aria-hidden className="mt-1 h-4 w-4 shrink-0 text-sage" strokeWidth={1.7} />
          <div className="flex flex-col">
            {phones.map((phone) => (
              <Tel
                key={phone.e164}
                {...(interactive ? { href: `tel:${phone.e164}`, className: "link-underline" } : {})}
              >
                {phone.e164.replace("+91", "")}
                {phone.e164.replace(/\D/g, "") === whatsappNumber && (
                  <>
                    <MessageCircle aria-hidden className="ml-1.5 inline h-3.5 w-3.5 -translate-y-px text-sage" strokeWidth={1.8} />
                    <span className="sr-only"> (also on WhatsApp)</span>
                  </>
                )}
              </Tel>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
