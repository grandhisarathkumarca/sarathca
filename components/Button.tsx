import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "navy" | "secondary" | "ghost" | "light" | "inverse" | "whatsapp";

const base =
  "group inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-6 py-2.5 text-[0.95rem] font-semibold transition-[background-color,border-color,color,box-shadow,transform] duration-300 ease-out active:translate-y-px disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary:
    "border border-gold bg-gold text-navy shadow-[0_10px_24px_-14px_rgba(212,160,23,0.9)] hover:border-gold-500 hover:bg-gold-500 active:bg-gold-700",
  navy: "border border-navy bg-navy text-white hover:bg-navy-700 active:bg-navy-950",
  secondary: "border border-navy/25 bg-white text-navy hover:border-navy active:bg-navy-100",
  ghost: "px-0 text-navy hover:text-royal",
  inverse: "border border-white bg-white text-navy hover:bg-navy-100 active:bg-navy-300",
  light: "border border-white/40 text-white hover:border-white hover:bg-white/10",
  whatsapp: "border border-whatsapp bg-whatsapp text-white hover:border-whatsapp-700 hover:bg-whatsapp-700",
};

export function buttonClass(variant: Variant = "primary", extra = "") {
  return `${base} ${variants[variant]} ${extra}`;
}

type ButtonLinkProps = Omit<ComponentProps<typeof Link>, "className"> & {
  variant?: Variant;
  className?: string;
  children: ReactNode;
};

export function ButtonLink({ variant = "primary", className = "", children, ...props }: ButtonLinkProps) {
  return (
    <Link className={buttonClass(variant, className)} {...props}>
      {children}
    </Link>
  );
}
