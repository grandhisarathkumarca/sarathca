type LogoMarkProps = { className?: string; title?: string };

/**
 * The CA India mark (supplied by the firm), on a white rounded tile so it reads on both light
 * and navy backgrounds. Source artwork: public/images/brand/ca-india-logo-*.png.
 */
export function LogoMark({ className = "", title }: LogoMarkProps) {
  return (
    <span
      className={`inline-flex items-center justify-center rounded-[22%] border border-line bg-white p-1.5 ${className}`}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- static export with images pre-sized in public/ */}
      <img
        src="/images/brand/ca-india-logo-160.png"
        srcSet="/images/brand/ca-india-logo-160.png 1x, /images/brand/ca-india-logo-320.png 2x"
        alt=""
        width={160}
        height={119}
        decoding="async"
        className="block h-auto w-full min-w-0"
      />
    </span>
  );
}

type LogoProps = { className?: string; inverted?: boolean };

export function Logo({ className = "", inverted = false }: LogoProps) {
  return (
    <span className={`flex min-w-0 items-center gap-2.5 sm:gap-3 ${className}`}>
      <LogoMark className="h-10 w-10 shrink-0 md:h-12 md:w-12" />
      <span className="flex min-w-0 flex-col leading-none">
        <span
          className={`font-serif text-[0.82rem] font-semibold tracking-[-0.005em] min-[360px]:whitespace-nowrap min-[400px]:text-[1rem] md:text-[1.12rem] ${inverted ? "text-white" : "text-navy"}`}
        >
          Sarath Kumar &amp; Associates
        </span>
        <span className={`mt-1 text-[0.72rem] tracking-[0.06em] ${inverted ? "text-navy-300" : "text-ink-soft"}`}>
          Chartered Accountants
        </span>
      </span>
    </span>
  );
}
