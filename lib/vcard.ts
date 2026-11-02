import { absoluteUrl, address, email, firm, isSiteUrlConfigured, phones, proprietor } from "./site";

/** Escapes a vCard 3.0 text value (RFC 2426 §4). */
function escape(value: string) {
  return value.replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/,/g, "\\,").replace(/;/g, "\\;");
}

/** Folds lines longer than 75 octets, as required by the vCard specification. */
function fold(line: string) {
  const bytes = new TextEncoder().encode(line);
  if (bytes.length <= 75) return line;
  const parts: string[] = [];
  let current = "";
  let size = 0;
  for (const char of line) {
    const charSize = new TextEncoder().encode(char).length;
    const limit = parts.length === 0 ? 75 : 74;
    if (size + charSize > limit) {
      parts.push(current);
      current = "";
      size = 0;
    }
    current += char;
    size += charSize;
  }
  parts.push(current);
  return parts.join("\r\n ");
}

export function buildVCard() {
  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `N:${escape(proprietor.familyName)};${escape(proprietor.givenName)};;;${escape(proprietor.qualifications)}`,
    `FN:${escape(proprietor.name)}`,
    `ORG:${escape(`${firm.name}, ${firm.designation}`)}`,
    `TITLE:${escape(proprietor.role)}`,
    ...phones.map((phone, i) => `TEL;TYPE=${i === 0 ? "CELL,VOICE,PREF" : "CELL,VOICE"}:${phone.e164}`),
    `EMAIL;TYPE=INTERNET,PREF:${email}`,
    `ADR;TYPE=WORK:;;${escape(address.street)};${escape(address.locality)};${escape(address.region)};${escape(address.postalCode)};${escape(address.country)}`,
    // The website URL is included only once the production domain is configured.
    ...(isSiteUrlConfigured ? [`URL:${absoluteUrl("/")}`] : []),
    `NOTE:${escape(`${proprietor.qualifications}. ${firm.name}, ${firm.designation}, established ${firm.established}.`)}`,
    "END:VCARD",
  ];
  return lines.map(fold).join("\r\n") + "\r\n";
}
