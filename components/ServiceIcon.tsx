import {
  BadgeCheck,
  BookOpenCheck,
  Building2,
  CalendarCheck,
  ChartNoAxesCombined,
  FileText,
  ReceiptIndianRupee,
  ScanSearch,
  Stamp,
  type LucideProps,
} from "lucide-react";
import type { ServiceIcon as ServiceIconName } from "@/lib/services";

const icons = {
  itr: FileText,
  gst: ReceiptIndianRupee,
  audit: ScanSearch,
  accounting: BookOpenCheck,
  registrations: Stamp,
  "project-finance": ChartNoAxesCombined,
  valuation: BadgeCheck,
  compliance: Building2,
  statutory: CalendarCheck,
} satisfies Record<ServiceIconName, unknown>;

export function ServiceIcon({ name, ...props }: { name: ServiceIconName } & LucideProps) {
  const Icon = icons[name];
  return <Icon aria-hidden strokeWidth={1.4} {...props} />;
}
