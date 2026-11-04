"use client";

import { CircleAlert, MessageCircle } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useId, useState, type FormEvent } from "react";
import { services } from "@/lib/services";
import { phones, whatsappDisplay, whatsappUrl } from "@/lib/site";

/**
 * Query form ("Talk to a Chartered Accountant"), per the Query Form section of the content pack.
 * Submitting opens WhatsApp with the query pre-filled for the firm's number. The visitor presses
 * send in WhatsApp; nothing reaches the firm until they do.
 */
type Fields = "name" | "phone" | "city" | "service" | "email" | "message";
type Errors = Partial<Record<Fields, string>>;

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
  if (data.message.length > 3000) errors.message = "Please keep the query under 3,000 characters.";
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
  const [sentUrl, setSentUrl] = useState<string | null>(null);
  const [errors, setErrors] = useState<Errors>({});

  const id = (name: Fields) => `${uid}-${name}`;

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
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

    const service = data.service || OTHER;
    const lines = [
      "New query from the website",
      `Name: ${data.name.trim()}`,
      `Phone: +91 ${normalisePhone(data.phone)}`,
      `City: ${data.city.trim()}`,
      `Service: ${topic ? `${service} – ${topic}` : service}`,
      ...(data.email.trim() ? [`Email: ${data.email.trim()}`] : []),
      ...(data.message.trim() ? [`Query: ${data.message.trim()}`] : []),
    ];
    const url = `${whatsappUrl}?text=${encodeURIComponent(lines.join("\n"))}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setSentUrl(url);
    form.reset();
  };

  // A blocked pop-up can't be detected with noopener, so the link is always offered here too.
  if (sentUrl) {
    return (
      <div role="status" aria-live="polite" className="rounded-[10px] border border-whatsapp/30 bg-whatsapp/5 p-6 sm:p-8">
        <MessageCircle aria-hidden className="h-9 w-9 text-whatsapp-700" strokeWidth={1.6} />
        <h3 className="mt-4 text-[1.35rem]">One more step: press send in WhatsApp</h3>
        <p className="mt-3 text-[0.96rem] leading-relaxed">
          Your query is ready in WhatsApp, addressed to {whatsappDisplay}. It reaches the firm once you press send. If
          WhatsApp did not open, use the button below or call{" "}
          <a href={`tel:${phones[0].e164}`} className="font-medium text-navy underline underline-offset-2">
            {phones[0].display}
          </a>
          .
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={sentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-2 rounded-full bg-whatsapp px-5 text-[0.95rem] font-semibold text-white hover:bg-whatsapp-700"
          >
            <MessageCircle aria-hidden className="h-4 w-4" />
            Open WhatsApp
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
          <button
            type="button"
            onClick={() => setSentUrl(null)}
            className="min-h-11 rounded-full px-4 text-[0.95rem] font-medium text-navy underline-offset-4 hover:underline"
          >
            Send another query
          </button>
        </div>
      </div>
    );
  }

  const inputClass = `block w-full rounded-[8px] border bg-paper-200 px-4 text-[1rem] text-navy placeholder:text-ink-soft/80 transition-[border-color,box-shadow,background-color] duration-200 focus:border-royal focus:bg-white focus:outline-none focus:ring-2 focus:ring-royal/20 ${
    compact ? "mt-1 py-2.5" : "mt-2 py-3"
  }`;
  const field = (name: Fields) => ({
    name,
    id: id(name),
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `${id(name)}-error` : undefined,
    className: `${inputClass} ${errors[name] ? "border-red-700" : "border-line-strong"}`,
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
      onReset={() => setErrors({})}
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
        {label("message", "Describe your Query", false)}
        <textarea rows={compact ? 3 : 5} maxLength={3000} {...field("message")} />
        {error("message")}
      </div>

      <div className="flex gap-3 pt-1">
        <button
          type="submit"
          className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full bg-gold px-7 text-[0.98rem] font-semibold text-navy shadow-[0_10px_24px_-14px_rgba(212,160,23,0.9)] transition-colors duration-300 hover:bg-gold-500 active:bg-gold-700"
        >
          <MessageCircle aria-hidden className="h-4 w-4" />
          Send on WhatsApp
        </button>
        <button
          type="reset"
          className="inline-flex min-h-12 items-center justify-center rounded-full border border-line-strong bg-white px-6 text-[0.95rem] font-medium text-ink transition-colors duration-300 hover:border-navy hover:text-navy"
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
