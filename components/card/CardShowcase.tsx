import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import { cardQrSvg, showQr, whatsappQrSvg } from "@/lib/qr";
import { address, proprietor } from "@/lib/site";
import { ButtonLink } from "../Button";
import { Reveal, stagger } from "../Reveal";
import { CardBack } from "./CardBack";
import { CardFace } from "./CardFace";
import { ElevatedCard } from "./ElevatedCard";

const features = [
  { icon: Phone, title: "Call in one tap", text: "Both office numbers, ready to dial." },
  { icon: Mail, title: "Email directly", text: "Opens a new message to the firm." },
  { icon: MapPin, title: "Find the office", text: `${address.locality}, ${address.district}.` },
];

/** Homepage / About section that presents the digital business card as an elevated object on a navy stage. */
export async function CardShowcase({ headingId = "card-showcase-title" }: { headingId?: string }) {
  const qrSvg = showQr ? await cardQrSvg() : null;
  const whatsappSvg = await whatsappQrSvg();

  return (
    <section aria-labelledby={headingId} className="relative overflow-clip bg-navy-950 py-24 text-navy-100 md:py-32">
      {/* Stage lighting: a soft glow behind the card and a faint ruled texture. */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-12%] top-1/2 h-[52rem] w-[52rem] -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(30,95,170,0.45),rgba(30,95,170,0)_62%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-[-20%] top-[-30%] h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(circle,rgba(212,160,23,0.16),rgba(212,160,23,0)_65%)]"
      />
      <div aria-hidden className="ledger-lines-light pointer-events-none absolute inset-0 opacity-60" />

      <div className="container-site relative grid items-center gap-20 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <Reveal variant="blur">
            <p className="eyebrow text-sage-300">Digital business card</p>
            <h2 id={headingId} className="mt-5 text-[2.3rem] leading-[1.08] text-white md:text-[3.2rem]">
              The visiting card, <span className="serif-italic text-sage-300">now on your phone</span>
            </h2>
            <p className="mt-6 max-w-md text-[1.05rem] leading-relaxed text-navy-300">
              Every detail from {proprietor.name}&rsquo;s printed card, in one place. Flip the card to scan its WhatsApp QR code.
            </p>
          </Reveal>

          <Reveal group as="ul" className="mt-10 border-t border-white/10" delay={0.15}>
            {features.map((feature, i) => (
              <li key={feature.title} style={stagger(i)} className="flex items-center gap-4 border-b border-white/10 py-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5">
                  <feature.icon aria-hidden className="h-[1.05rem] w-[1.05rem] text-sage-300" strokeWidth={1.5} />
                </span>
                <span>
                  <span className="block font-medium text-white">{feature.title}</span>
                  <span className="block text-[0.9rem] text-navy-300">{feature.text}</span>
                </span>
              </li>
            ))}
          </Reveal>

          <Reveal className="mt-10" delay={0.3}>
            <ButtonLink href="/digital-card/" variant="inverse" className="btn-sheen">
              Open the digital card
              <ArrowRight aria-hidden className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </ButtonLink>
          </Reveal>
        </div>

        <Reveal variant="card" className="lg:col-span-6 lg:col-start-7" delay={0.1}>
          <ElevatedCard
            tone="dark"
            className="mx-auto max-w-[36rem] px-4 sm:px-8"
            front={<CardFace interactive={false} />}
            back={<CardBack qrSvg={qrSvg} whatsappSvg={whatsappSvg} />}
          />
        </Reveal>
      </div>
    </section>
  );
}
