import type { CSSProperties, ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Delay in seconds. */
  delay?: number;
  as?: "div" | "section" | "nav" | "li" | "article" | "ul" | "ol" | "dl";
  /** fade-up (default), soft-focus blur, scale-in, image mask wipe or 3D card arrival. */
  variant?: "up" | "blur" | "scale" | "mask" | "card";
  /** Stagger direct children instead of animating the block as one (children need --i). */
  group?: boolean;
  id?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
};

/**
 * Animates a block once as it enters the viewport. Server-rendered; the shared
 * <RevealObserver /> adds the visible state, so no per-block JavaScript is shipped.
 * Content stays visible when JavaScript is unavailable or reduced motion is requested.
 */
export function Reveal({ children, className, delay = 0, as: Component = "div", variant = "up", group, id, ...aria }: RevealProps) {
  const style = delay ? ({ "--reveal-delay": `${delay}s` } as CSSProperties) : undefined;
  const attrs = group ? { "data-reveal-group": "" } : { "data-reveal": variant === "up" ? "" : variant };
  return (
    <Component {...attrs} {...aria} id={id} className={className} style={style}>
      {children}
    </Component>
  );
}

/** Index variable for children of a staggered <Reveal group>. */
export function stagger(i: number): CSSProperties {
  return { "--i": i } as CSSProperties;
}
