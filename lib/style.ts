import type { CSSProperties } from "react";

/** Sets the CSS entrance-animation delay used by .animate-rise / .animate-frame. */
export function delay(ms: number): CSSProperties {
  return { "--delay": `${ms}ms` } as CSSProperties;
}
