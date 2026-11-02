import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import type { CSSProperties } from "react";
import { allSubServices, type Service, type SubService } from "@/lib/services";
import { delay } from "@/lib/style";
import { CountUp } from "./CountUp";
import { ServiceIcon } from "./ServiceIcon";

type ServiceFolioProps = {
  service: Service;
  /** Sub-service page: the card lists that service's three key points. */
  item?: SubService;
};

type Row = { name: string; count?: number; share?: number };

/**
 * Image-free page-header card for service pages, matching the homepage services ledger:
 * a navy card with an outlined service mark, ruled entries with dotted leaders and a double-underlined total.
 */
export function ServiceFolio({ service, item }: ServiceFolioProps) {
  const entries = allSubServices(service);
  const group = item ? service.groups.find((g) => g.items.includes(item)) : undefined;
  const max = Math.max(...service.groups.map((g) => g.items.length));

  let rows: Row[];
  if (item) rows = item.points.map((point) => ({ name: point }));
  else if (service.groups.length > 1)
    rows = service.groups.map((g) => ({ name: g.title, count: g.items.length, share: g.items.length / max }));
  else rows = entries.slice(0, 4).map((e) => ({ name: e.title }));

  return (
    <div
      className="animate-frame spotlight spotlight-dark banner-gradient ledger-lines-light relative overflow-hidden rounded-[22px] p-6 text-navy-100 shadow-[0_40px_80px_-40px_rgba(6,22,43,0.7)] sm:p-7 lg:ml-auto lg:max-w-[24rem]"
      style={delay(160)}
    >
      <span aria-hidden className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full border border-white/10" />
      <span aria-hidden className="pointer-events-none absolute -bottom-24 -right-4 h-48 w-48 rounded-full border border-white/10" />

      <div className="relative">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-gold-500">
              {item ? service.menuLabel : "At a glance"}
            </p>
            <p className="mt-2.5 text-[1.05rem] font-semibold leading-snug text-white">
              {item ? (group && service.groups.length > 1 ? group.title : "What we do for you") : service.title}
            </p>
          </div>
          <ServiceIcon aria-hidden name={service.icon} className="h-16 w-16 shrink-0 text-gold-500/80" strokeWidth={0.9} />
        </div>

        <ul className="mt-6 border-t border-white/15">
          {rows.map((row, i) => (
            <li key={row.name} className="border-b border-white/10 py-3 text-[0.88rem]">
              <div className="flex items-end gap-3">
                <span className="text-white">{row.name}</span>
                <span aria-hidden className="ledger-leader ledger-leader-light h-[3px] min-w-6 flex-1" />
                {row.count !== undefined ? (
                  <span className="whitespace-nowrap tabular-nums text-navy-300">{row.count}</span>
                ) : (
                  <Check aria-hidden className="h-4 w-4 shrink-0 text-gold-500" strokeWidth={2.2} />
                )}
              </div>
              {row.share !== undefined && (
                <span className="mt-2 block h-[3px] rounded-full bg-white/10">
                  <span
                    className="ledger-bar block h-full rounded-full bg-gold"
                    style={{ width: `${row.share * 100}%`, "--i": i } as CSSProperties}
                  />
                </span>
              )}
            </li>
          ))}
        </ul>

        {!item && (
          <div className="mt-5 flex items-end justify-between gap-4">
            <span className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-navy-300">Total services</span>
            <span className="border-b-[4px] border-double border-gold pb-0.5 font-serif text-[1.6rem] font-bold leading-none tabular-nums text-white">
              <CountUp value={entries.length} />
            </span>
          </div>
        )}

        <Link
          href="#enquire"
          className="group mt-6 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-gold px-6 text-[0.92rem] font-semibold text-navy transition-colors hover:bg-gold-500"
        >
          Enquire Now
          <ArrowRight aria-hidden className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  );
}
