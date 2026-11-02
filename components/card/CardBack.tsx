import { MessageCircle, UserPlus } from "lucide-react";
import { firm, proprietor, whatsappDisplay } from "@/lib/site";
import { LogoMark } from "../Logo";

type CardBackProps = {
  /** Build-time QR SVG for the digital card, or null until the production domain is configured. */
  qrSvg: string | null;
  /** Build-time QR SVG that opens a WhatsApp chat with the firm. */
  whatsappSvg: string;
};

function QrTile({ svg, label, icon: Icon, caption }: { svg: string; label: string; icon: typeof UserPlus; caption: string }) {
  return (
    <figure className="flex flex-col items-center gap-2.5">
      <div
        className="qr-scan relative w-24 overflow-hidden rounded-[4px] bg-white p-1.5 sm:w-28 [&_svg]:h-auto [&_svg]:w-full"
        role="img"
        aria-label={label}
        dangerouslySetInnerHTML={{ __html: svg }}
      />
      <figcaption className="flex items-center gap-1.5 text-[0.72rem] font-medium uppercase tracking-[0.1em] text-sage-300">
        <Icon aria-hidden className="h-3.5 w-3.5" strokeWidth={1.8} />
        {caption}
      </figcaption>
    </figure>
  );
}

/** Reverse of the business card: navy field, the firm's name and its QR codes (WhatsApp, and the digital card once live). */
export function CardBack({ qrSvg, whatsappSvg }: CardBackProps) {
  return (
    <div className="relative flex h-full flex-col overflow-hidden rounded-[6px] bg-navy text-white shadow-[0_30px_60px_-40px_rgba(11,37,69,0.6)]">
      <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full border border-white/10" />
      <div aria-hidden className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full border border-white/10" />

      <div className="relative flex flex-1 flex-col justify-center gap-5 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:px-8">
        <div className="flex items-center gap-3 sm:block">
          <LogoMark className="h-10 w-10 shrink-0 sm:h-12 sm:w-12" />
          <div className="sm:mt-4">
            <p className="font-serif text-[1.2rem] leading-tight sm:text-[1.4rem]">{firm.name}</p>
            <p className="mt-1 text-[0.82rem] text-navy-300">
              {proprietor.name} · {proprietor.qualifications}
            </p>
            <p className="mt-2 hidden items-center gap-1.5 text-[0.82rem] tabular-nums text-white/85 sm:flex">
              <MessageCircle aria-hidden className="h-3.5 w-3.5 text-sage-300" strokeWidth={1.8} />
              {whatsappDisplay}
            </p>
          </div>
        </div>
        <div className="flex shrink-0 justify-center gap-4 sm:gap-5">
          <QrTile
            svg={whatsappSvg}
            label={`QR code that opens a WhatsApp chat with ${whatsappDisplay}`}
            icon={MessageCircle}
            caption="WhatsApp"
          />
          {qrSvg && (
            <QrTile svg={qrSvg} label="QR code that opens the digital business card" icon={UserPlus} caption="Save card" />
          )}
        </div>
      </div>
      <div className="brand-rule opacity-80" />
      <p className="px-6 py-3 text-[0.75rem] tracking-[0.06em] text-navy-300 sm:px-8">
        Est. {firm.established} · Narsipatnam, Andhra Pradesh
      </p>
    </div>
  );
}
