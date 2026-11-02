"use client";

import { Check, Copy, Share2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type CardActionsProps = {
  shareTitle: string;
  shareText: string;
  /** Canonical card URL; when null (domain not configured) the current page URL is used. */
  shareUrl: string | null;
  detailsText: string;
  buttonClassName: string;
  /** Extra classes while a button shows its "copied" confirmation. */
  activeClassName?: string;
  /** Label for the copy button (shorter labels suit compact layouts). */
  copyLabel?: string;
};

type Status = { kind: "idle" } | { kind: "ok" | "error"; message: string };

async function copyText(text: string) {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return;
    } catch {
      // Permission denied or unavailable — fall through to the legacy method.
    }
  }
  // Fallback for older browsers, non-secure contexts and embedded views.
  const area = document.createElement("textarea");
  area.value = text;
  area.setAttribute("readonly", "");
  area.style.position = "fixed";
  area.style.opacity = "0";
  document.body.appendChild(area);
  area.select();
  const ok = document.execCommand("copy");
  area.remove();
  if (!ok) throw new Error("copy failed");
}

/** Share and copy actions for the digital business card. Renders list items for the parent action grid. */
export function CardActions({
  shareTitle,
  shareText,
  shareUrl,
  detailsText,
  buttonClassName,
  activeClassName = "border-sage bg-sage-100",
  copyLabel = "Copy details",
}: CardActionsProps) {
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [copied, setCopied] = useState<"link" | "details" | null>(null);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const flash = (next: Status, which: "link" | "details" | null = null) => {
    setStatus(next);
    setCopied(which);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      setStatus({ kind: "idle" });
      setCopied(null);
    }, 3200);
  };

  const onShare = async () => {
    const url = shareUrl ?? window.location.href;
    if (typeof navigator.share === "function") {
      try {
        await navigator.share({ title: shareTitle, text: shareText, url });
        return;
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return;
      }
    }
    try {
      await copyText(url);
      flash({ kind: "ok", message: "Card link copied to clipboard." }, "link");
    } catch {
      flash({ kind: "error", message: `Could not share automatically. The link is ${url}` });
    }
  };

  const onCopy = async () => {
    try {
      await copyText(detailsText);
      flash({ kind: "ok", message: "Contact details copied to clipboard." }, "details");
    } catch {
      flash({ kind: "error", message: "Copying is not available in this browser." });
    }
  };

  return (
    <>
      <li>
        <button type="button" onClick={onShare} className={`${buttonClassName} ${copied === "link" ? activeClassName : ""}`}>
          {copied === "link" ? <Check aria-hidden className="h-5 w-5 text-sage" strokeWidth={1.6} /> : <Share2 aria-hidden className="h-5 w-5 text-sage" strokeWidth={1.5} />}
          <span>{copied === "link" ? "Link copied" : "Share"}</span>
        </button>
      </li>
      <li>
        <button type="button" onClick={onCopy} aria-label={copied === "details" ? undefined : "Copy contact details"} className={`${buttonClassName} ${copied === "details" ? activeClassName : ""}`}>
          {copied === "details" ? <Check aria-hidden className="h-5 w-5 text-sage" strokeWidth={1.6} /> : <Copy aria-hidden className="h-5 w-5 text-sage" strokeWidth={1.5} />}
          <span>{copied === "details" ? "Copied" : copyLabel}</span>
        </button>
        <p role="status" aria-live="polite" className="sr-only">
          {status.kind === "idle" ? "" : status.message}
        </p>
      </li>
      {status.kind === "error" && (
        <li className="col-span-full break-all text-[0.85rem] text-red-800">{status.message}</li>
      )}
    </>
  );
}
