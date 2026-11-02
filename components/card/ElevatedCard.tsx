"use client";

import { QrCode, RotateCcw } from "lucide-react";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

type ElevatedCardProps = {
  front: ReactNode;
  back: ReactNode;
  className?: string;
  /** "dark" adjusts the stacked card, shadow and button for a navy background. */
  tone?: "light" | "dark";
  /** Once, after arriving, the card turns slightly as a hint that it can be flipped. */
  peek?: boolean;
};

/**
 * Presents the business card as a physical object: it lifts and tilts towards the pointer
 * (fine pointers only), catches a soft glare, and flips to reveal the QR code on its back.
 * Tilt is skipped for touch input and when reduced motion is requested.
 */
export function ElevatedCard({ front, back, className = "", tone = "light", peek = false }: ElevatedCardProps) {
  const dark = tone === "dark";
  const stageRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  const frame = useRef(0);
  const [flipped, setFlipped] = useState(false);
  const [canTilt, setCanTilt] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    const update = () => setCanTilt(query.matches);
    update();
    query.addEventListener("change", update);
    return () => {
      query.removeEventListener("change", update);
      cancelAnimationFrame(frame.current);
    };
  }, []);

  const setVars = useCallback((vars: Record<string, string>) => {
    const stage = stageRef.current;
    if (!stage) return;
    for (const [key, value] of Object.entries(vars)) stage.style.setProperty(key, value);
  }, []);

  const onMove = (event: React.PointerEvent) => {
    if (!canTilt || event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      tiltRef.current?.setAttribute("data-tracking", "");
      setVars({
        "--ry": `${(x * 16).toFixed(2)}deg`,
        "--rx": `${(-y * 12).toFixed(2)}deg`,
        "--mx": `${((x + 0.5) * 100).toFixed(1)}%`,
        "--my": `${((y + 0.5) * 100).toFixed(1)}%`,
        "--glare": "1",
        "--rz": "0deg",
        "--ty": "-14px",
        "--lift": "1",
      });
    });
  };

  const onLeave = () => {
    cancelAnimationFrame(frame.current);
    tiltRef.current?.removeAttribute("data-tracking");
    // Clearing the variables returns the card to its resting pose defined in CSS.
    const stage = stageRef.current;
    for (const key of ["--rx", "--ry", "--rz", "--ty", "--mx", "--my"]) stage?.style.removeProperty(key);
    setVars({ "--glare": "0", "--lift": "0" });
  };

  return (
    <div className={className}>
      <div ref={stageRef} className="card-stage relative" onPointerMove={onMove} onPointerLeave={onLeave}>
        {/* Ground shadow that softens as the card lifts. */}
        <div
          aria-hidden
          className={`card-shadow absolute inset-x-[6%] -bottom-14 h-16 rounded-[50%] blur-3xl ${dark ? "bg-black/70" : "bg-navy-950/40"}`}
        />
        {/* A second card resting underneath, for depth. */}
        <div
          aria-hidden
          className={`card-ghost absolute inset-0 rounded-[6px] ${
            dark
              ? "border border-white/10 bg-slate-blue/70 shadow-[0_40px_70px_-30px_rgba(0,0,0,0.7)]"
              : "bg-navy shadow-[0_40px_70px_-30px_rgba(11,37,69,0.55)]"
          }`}
        >
          <div className="brand-rule absolute inset-x-0 bottom-10 opacity-60" />
        </div>
        <div ref={tiltRef} className="card-tilt relative">
          <div className={peek && !flipped ? "card-peek" : undefined} style={{ transformStyle: "preserve-3d" }}>
            <div className="card-flip" data-flipped={flipped ? "" : undefined}>
              <div className="card-side relative rounded-[6px]" aria-hidden={flipped} inert={flipped}>
                {front}
                <div aria-hidden className="card-glare" />
              </div>
              <div className="card-side card-back relative rounded-[6px]" aria-hidden={!flipped} inert={!flipped}>
                {back}
                <div aria-hidden className="card-glare" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-16 flex justify-center">
        <button
          type="button"
          onClick={() => setFlipped((v) => !v)}
          aria-pressed={flipped}
          className={`group inline-flex min-h-11 items-center gap-2.5 rounded-full border px-5 text-[0.9rem] font-medium backdrop-blur transition-[border-color,background-color,box-shadow] duration-300 ${
            dark
              ? "border-white/25 bg-white/5 text-white hover:border-white/60 hover:bg-white/10"
              : "border-navy/20 bg-white/80 text-navy shadow-[0_6px_20px_-12px_rgba(11,37,69,0.4)] hover:border-navy hover:bg-white hover:shadow-[0_10px_28px_-14px_rgba(11,37,69,0.5)]"
          }`}
        >
          {flipped ? (
            <RotateCcw
              aria-hidden
              className="h-4 w-4 transition-transform duration-500 group-hover:-rotate-180"
              strokeWidth={1.6}
            />
          ) : (
            <QrCode
              aria-hidden
              className="h-4 w-4 transition-transform duration-500 group-hover:rotate-90"
              strokeWidth={1.6}
            />
          )}
          {flipped ? "Show the front" : "Flip for QR codes"}
        </button>
      </div>
    </div>
  );
}
