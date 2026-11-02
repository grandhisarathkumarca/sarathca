/**
 * Single source of truth for the firm's verified details.
 * Sources: the firm's visiting card, the Website Design & Content Brief (October 2026)
 * and the proprietor details supplied by the client. Change contact details here only —
 * the header, footer, contact page, digital card, vCard and structured data all read from it.
 */

const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/+$/, "");

/** Production origin, e.g. https://www.example.in (no trailing slash). */
export const siteUrl = rawSiteUrl || "http://localhost:3000";

/** False until NEXT_PUBLIC_SITE_URL points at a real, non-local domain. */
export const isSiteUrlConfigured =
  Boolean(rawSiteUrl) && !/localhost|127\.0\.0\.1|\[::1\]/.test(rawSiteUrl ?? "");

export const firm = {
  name: "Sarath Kumar & Associates",
  designation: "Chartered Accountants",
  established: 2022,
  frn: "024704S",
} as const;

export const proprietor = {
  name: "Grandhi Sarath Kumar",
  givenName: "Sarath Kumar",
  familyName: "Grandhi",
  qualifications: "CA, DISA, B.Com",
  role: "Proprietor",
  membershipNo: "262952",
  /** Name with the professional prefix, as used in the content pack ("CA Sarath Kumar"). */
  titledName: "CA Grandhi Sarath Kumar",
  tagline: "Chartered Accountant | Tax Consultant | Finance Professional",
} as const;

export const address = {
  street: "D No. 24-6-41, Thotavaari Veedhi",
  locality: "Narsipatnam",
  district: "Visakhapatnam District",
  region: "Andhra Pradesh",
  postalCode: "531116",
  country: "India",
  countryCode: "IN",
} as const;

export const addressLines = [
  address.street,
  `${address.locality}, ${address.district}`,
  `${address.region} – ${address.postalCode}`,
];

export const addressOneLine = `${address.street}, ${address.locality}, ${address.district}, ${address.region} – ${address.postalCode}`;

export type Phone = { display: string; e164: string };

export const phones: Phone[] = [
  { display: "+91 79976 70238", e164: "+917997670238" },
  { display: "+91 93911 85755", e164: "+919391185755" },
];

export const email = "grandhisarathkumar@gmail.com";

/**
 * WhatsApp number confirmed by the client: +91 93911 85755. NEXT_PUBLIC_WHATSAPP_NUMBER can
 * override it (international format, digits only).
 */
export const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "") || "919391185755";
export const whatsappDisplay = `+${whatsappNumber.slice(0, 2)} ${whatsappNumber.slice(2, 7)} ${whatsappNumber.slice(7)}`;
export const whatsappUrl = `https://wa.me/${whatsappNumber}`;

/** Pre-filled text for the floating "Chat with us on WhatsApp" button (from the content pack). */
export const whatsappGreeting = "Hello! I'm interested in your CA Services. Can you help me?";
export const whatsappChatUrl = `${whatsappUrl}?text=${encodeURIComponent(whatsappGreeting)}`;

/** Directions link built from the verified postal address (not a guessed map pin). */
export const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${address.street}, ${address.locality}, ${address.region} ${address.postalCode}`,
)}`;

export const portrait = {
  basePath: "/images/grandhi-sarath-kumar",
  widths: [480, 800, 1000],
  width: 1006,
  height: 1208,
  alt: "Portrait of Grandhi Sarath Kumar, Proprietor of Sarath Kumar & Associates, Chartered Accountants",
} as const;

export const navLinks = [
  { href: "/about/", label: "About Us" },
  { href: "/services/", label: "Services" },
  { href: "/industries/", label: "Clients" },
  { href: "/resources/", label: "FAQs" },
  { href: "/contact/", label: "Contact" },
] as const;

/** Absolute URL for a site path. Paths follow the trailing-slash convention. */
export function absoluteUrl(path = "/") {
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

/**
 * Set to true once the proprietor has reviewed and approved the Privacy Policy and Website
 * Disclaimer. While false, both pages display a visible "draft" notice.
 */
export const legalPagesApproved = false;
