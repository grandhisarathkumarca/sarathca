"use client";

import { CircleAlert, CircleCheck, LoaderCircle, MessageCircle } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useId, useRef, useState, type FormEvent } from "react";
import { services } from "@/lib/services";
import { email as firmEmail, firm, phones, whatsappUrl } from "@/lib/site";

/**
 * Query form ("Talk to a Chartered Accountant"), per the Query Form section of the content pack.
 * Submissions are delivered to the firm's inbox through Web3Forms (https://web3forms.com), which
 * works with a fully static site. The access key is public by design and is configured with
 * NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY.
 */
const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
const ENDPOINT = "https://api.web3forms.com/submit";

type Fields = "name" | "phone" | "city" | "service" | "email" | "message";
type Errors = Partial<Record<Fields, string>>;
type State = { status: "idle" | "submitting" } | { status: "success"; summary: string } | { status: "error"; message: string };

const FIELDS: Fields[] = ["name", "phone", "city", "service", "email", "message"];
const OTHER = "Other / not sure";

/** Returns the 10-digit Indian mobile number, accepting +91 / 0 prefixes, spaces and dashes. */
function normalisePhone(value: string) {
  let digits = value.replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("91")) digits = digits.slice(2);
  else if (digits.length === 11 && digits.startsWith("0")) digits = digits.slice(1);
  return /^[6-9]\d{9}$/.test(digits) ? digits : null;
}

function validate(data: Record<Fields, string>): Errors {
  const errors: Errors = {};
  if (data.name.trim().length < 2) errors.name = "Please enter your full name.";
  if (!data.phone.trim()) errors.phone = "Please enter your phone number.";
  else if (!normalisePhone(data.phone)) errors.phone = "Please enter a valid 10-digit mobile number.";
  if (data.city.trim().length < 2) errors.city = "Please enter your city.";
  if (data.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email.trim()))
    errors.email = "Please enter a valid email address, or leave this blank.";
  if (data.message.trim().length < 10) errors.message = "Please describe your query in a sentence or two.";
  else if (data.message.length > 3000) errors.message = "Please keep the query under 3,000 characters.";
  return errors;
}

type ContactFormProps = {
  /** Compact layout for the hero card: no email field, tighter spacing. */
  compact?: boolean;
  /** Service category slug to preselect (otherwise read from ?service=). */
  service?: string;
  /** Sub-service the visitor is enquiring from, sent with the query (e.g. "E-Way Bill"). */
  topic?: string;
};

export function ContactForm({ compact = false, service: serviceSlug, topic }: ContactFormProps) {
  const uid = useId();
  const searchParams = useSearchParams();
  const preselected =
    services.find((s) => s.slug === (serviceSlug ?? searchParams.get("service")))?.enquiryLabel ?? "";
  const [state, setState] = useState<State>({ status: "idle" });
  const [errors, setErrors] = useState<Errors>({});
  const startedAt = useRef<number>(0);

  const id = (name: Fields | "botcheck") => `${uid}-${name}`;

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const fd = new FormData(form);
    const data = Object.fromEntries(FIELDS.map((k) => [k, String(fd.get(k) ?? "")])) as Record<Fields, string>;

    const found = validate(data);
    setErrors(found);
    const firstInvalid = FIELDS.find((k) => found[k]);
    if (firstInvalid) {
      form.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    // Spam checks: hidden honeypot field and a minimum fill time.
    if (fd.get("botcheck") || (startedAt.current && Date.now() - startedAt.current < 2500)) {
      setState({ status: "error", message: "Your query could not be sent. Please try again in a moment, or call the firm." });
      return;
    }

    if (!ACCESS_KEY) {
      setState({
        status: "error",
        message: `Online queries are not yet connected. Please call ${phones[0].display}, WhatsApp the firm or email ${firmEmail}.`,
      });
      return;
    }

    const name = data.name.trim();
    const phone = normalisePhone(data.phone) ?? data.phone.trim();
    const service = data.service || OTHER;
    setState({ status: "submitting" });
    try {
      const response = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject: `New Query – ${name} – ${topic ?? service}`,
          from_name: `${firm.name} website`,
          replyto: data.email.trim() || undefined,
          Name: name,
          Phone: `+91 ${phone}`,
          "Call now": `tel:+91${phone}`,
          City: data.city.trim(),
          "Service needed": topic ? `${service} – ${topic}` : service,
          Email: data.email.trim() || "—",
          Query: data.message.trim(),
        }),
      });
      const result = (await response.json().catch(() => null)) as { success?: boolean; message?: string } | null;
      if (!response.ok || !result?.success) throw new Error(result?.message || `HTTP ${response.status}`);
      setState({
        status: "success",
        summary: `New query from the website\nName: ${name}\nPhone: +91 ${phone}\nCity: ${data.city.trim()}\nService: ${topic ? `${service} – ${topic}` : service}\nQuery: ${data.message.trim()}`,
      });
      form.reset();
    } catch {
      setState({
        status: "error",
        message: `Your query could not be sent. Please try again, or contact the firm at ${phones[0].display} or ${firmEmail}.`,
      });
    }
  };

  if (state.status === "success") {
    return (
      <div role="status" aria-live="polite" className="rounded-[10px] border border-whatsapp/30 bg-whatsapp/5 p-6 sm:p-8">
        <CircleCheck aria-hidden className="h-9 w-9 text-whatsapp-700" strokeWidth={1.6} />
        <h3 className="mt-4 text-[1.35rem]">Thank you! We will contact you shortly.</h3>
        <p className="mt-3 text-[0.96rem] leading-relaxed">
          Your query has been sent to the firm. For a faster response you can also send the same details on WhatsApp,
          or call{" "}
          <a href={`tel:${phones[0].e164}`} className="font-medium text-navy underline underline-offset-2">
            {phones[0].display}
          </a>
          .
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={`${whatsappUrl}?text=${encodeURIComponent(state.summary)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-2 rounded-full bg-whatsapp px-5 text-[0.95rem] font-semibold text-white hover:bg-whatsapp-700"
          >
            <MessageCircle aria-hidden className="h-4 w-4" />
            Send on WhatsApp
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
          <button
            type="button"
            onClick={() => setState({ status: "idle" })}
            className="min-h-11 rounded-full px-4 text-[0.95rem] font-medium text-navy underline-offset-4 hover:underline"
          >
            Send another query
          </button>
        </div>
      </div>
    );
  }

  const submitting = state.status === "submitting";
  const inputClass = `block w-full rounded-[8px] border bg-paper-200 px-4 text-[1rem] text-navy placeholder:text-ink-soft/80 transition-[border-color,box-shadow,background-color] duration-200 focus:border-royal focus:bg-white focus:outline-none focus:ring-2 focus:ring-royal/20 ${
    compact ? "mt-1 py-2.5" : "mt-2 py-3"
  }`;
  const field = (name: Fields) => ({
    name,
    id: id(name),
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `${id(name)}-error` : undefined,
    className: `${inputClass} ${errors[name] ? "border-red-700" : "border-line-strong"}`,
    onFocus: () => {
      if (!startedAt.current) startedAt.current = Date.now();
    },
  });
  const error = (name: Fields) =>
    errors[name] ? (
      <p id={`${id(name)}-error`} className="mt-1.5 flex items-center gap-1.5 text-[0.84rem] text-red-800">
        <CircleAlert aria-hidden className="h-3.5 w-3.5 shrink-0" />
        {errors[name]}
      </p>
    ) : null;
  const label = (name: Fields, text: string, required = true) => (
    <label htmlFor={id(name)} className="text-[0.88rem] font-medium text-navy">
      {text}
      {required ? (
        <span aria-hidden className="ml-0.5 text-red-700">
          *
        </span>
      ) : (
        <span className="ml-1.5 font-normal text-ink-soft">(optional)</span>
      )}
      {required && <span className="sr-only"> (required)</span>}
    </label>
  );

  return (
    <form
      noValidate
      onSubmit={onSubmit}
      onReset={() => {
        setErrors({});
        if (state.status === "error") setState({ status: "idle" });
      }}
      aria-describedby={`${uid}-privacy`}
      className={`relative ${compact ? "space-y-3" : "space-y-5"}`}
    >
      <div className={`grid sm:grid-cols-2 ${compact ? "gap-3" : "gap-5"}`}>
        <div>
          {label("name", "Full Name")}
          <input type="text" autoComplete="name" required maxLength={120} {...field("name")} />
          {error("name")}
        </div>
        <div>
          {label("phone", "Phone Number")}
          <input
            type="tel"
            inputMode="numeric"
            autoComplete="tel-national"
            required
            maxLength={16}
            placeholder="10-digit mobile"
            {...field("phone")}
          />
          {error("phone")}
        </div>
        <div>
          {label("city", "City")}
          <input type="text" autoComplete="address-level2" required maxLength={80} {...field("city")} />
          {error("city")}
        </div>
        <div>
          {label("service", "Service needed", false)}
          <select defaultValue={preselected} key={preselected} {...field("service")}>
            <option value="">Choose a service</option>
            {services.map((s) => (
              <option key={s.slug} value={s.enquiryLabel}>
                {s.enquiryLabel}
              </option>
            ))}
            <option value={OTHER}>{OTHER}</option>
          </select>
        </div>
        {!compact && (
          <div className="sm:col-span-2">
            {label("email", "Email", false)}
            <input type="email" autoComplete="email" maxLength={160} {...field("email")} />
            {error("email")}
          </div>
        )}
      </div>
      <div>
        {label("message", "Describe your Query")}
        <textarea rows={compact ? 3 : 5} required maxLength={3000} {...field("message")} />
        {error("message")}
      </div>

      {/* Honeypot: hidden from people, often filled in by bots. */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={id("botcheck")}>Leave this field empty</label>
        <input type="text" id={id("botcheck")} name="botcheck" tabIndex={-1} autoComplete="off" />
      </div>

      {state.status === "error" && (
        <p role="alert" className="flex gap-2 rounded-[8px] border-l-2 border-red-700 bg-red-50 px-4 py-3 text-[0.9rem] text-red-900">
          <CircleAlert aria-hidden className="mt-0.5 h-4 w-4 shrink-0" />
          {state.message}
        </p>
      )}

      <div className="flex gap-3 pt-1">
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full bg-gold px-7 text-[0.98rem] font-semibold text-navy shadow-[0_10px_24px_-14px_rgba(212,160,23,0.9)] transition-colors duration-300 hover:bg-gold-500 active:bg-gold-700 disabled:cursor-wait disabled:opacity-70"
        >
          {submitting && <LoaderCircle aria-hidden className="h-4 w-4 animate-spin" />}
          {submitting ? "Sending…" : "Send Message"}
        </button>
        <button
          type="reset"
          disabled={submitting}
          className="inline-flex min-h-12 items-center justify-center rounded-full border border-line-strong bg-white px-6 text-[0.95rem] font-medium text-ink transition-colors duration-300 hover:border-navy hover:text-navy disabled:opacity-60"
        >
          Clear
        </button>
      </div>

      <p id={`${uid}-privacy`} className="text-[0.8rem] leading-relaxed text-ink-soft">
        Your details are used only to respond to your query. Please do not include passwords or bank details. See the{" "}
        <Link href="/privacy-policy/" className="text-navy underline underline-offset-2">
          privacy policy
        </Link>
        .
      </p>
    </form>
  );
}
