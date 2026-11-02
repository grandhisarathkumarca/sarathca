import { portrait } from "@/lib/site";

type PortraitProps = {
  className?: string;
  /** CSS sizes attribute describing the rendered width. */
  sizes: string;
  priority?: boolean;
  alt?: string;
};

/** Responsive AVIF/WebP picture of the supplied proprietor photograph. */
export function Portrait({ className = "", sizes, priority = false, alt = portrait.alt }: PortraitProps) {
  const srcSet = (ext: string) =>
    portrait.widths.map((w) => `${portrait.basePath}-${w}.${ext} ${Math.min(w, portrait.width)}w`).join(", ");
  return (
    <picture>
      <source type="image/avif" srcSet={srcSet("avif")} sizes={sizes} />
      <source type="image/webp" srcSet={srcSet("webp")} sizes={sizes} />
      <img
        src={`${portrait.basePath}-800.jpg`}
        alt={alt}
        width={portrait.width}
        height={portrait.height}
        sizes={sizes}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding={priority ? "sync" : "async"}
        className={`h-full w-full object-cover ${className}`}
      />
    </picture>
  );
}
