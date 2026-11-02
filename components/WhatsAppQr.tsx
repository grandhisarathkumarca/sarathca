import { ArrowUpRight, MessageCircle } from "lucide-react";
import { whatsappQrSvg } from "@/lib/qr";
import { whatsappDisplay, whatsappUrl } from "@/lib/site";

/** Scannable WhatsApp QR code with a tap-to-chat link for phones. */
export async function WhatsAppQr({ className = "" }: { className?: string }) {
  const qr = await whatsappQrSvg();
  return (
    <div className={`rounded-[6px] border border-line bg-white p-6 ${className}`}>
      <div className="flex items-center gap-5 sm:gap-6">
        <div
          className="w-28 shrink-0 sm:w-36 [&_svg]:h-auto [&_svg]:w-full"
          role="img"
          aria-label={`QR code that opens a WhatsApp chat with ${whatsappDisplay}`}
          dangerouslySetInnerHTML={{ __html: qr }}
        />
        <div className="min-w-0">
          <p className="flex items-center gap-2 text-[0.75rem] font-medium uppercase tracking-[0.1em] text-sage-600">
            <MessageCircle aria-hidden className="h-4 w-4" strokeWidth={1.7} />
            WhatsApp
          </p>
          <h2 className="mt-1.5 font-serif text-[1.2rem] text-navy">Scan to chat on WhatsApp</h2>
          <p className="mt-1 text-[0.95rem] tabular-nums text-navy">{whatsappDisplay}</p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex min-h-11 items-center gap-1.5 whitespace-nowrap text-[0.9rem] font-medium text-navy"
          >
            <span className="link-underline">Open WhatsApp</span>
            <ArrowUpRight aria-hidden className="h-4 w-4" />
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
      </div>
    </div>
  );
}
