import QRCode from "qrcode";
import { absoluteUrl, isSiteUrlConfigured, whatsappUrl } from "./site";

export const cardPath = "/digital-card/";
export const cardUrl = absoluteUrl(cardPath);

const options = {
  errorCorrectionLevel: "M" as const,
  margin: 2,
  color: { dark: "#0b2545", light: "#ffffff" },
};

/** QR code pointing at the digital business card, rendered at build time. */
export function cardQrSvg() {
  return QRCode.toString(cardUrl, { ...options, type: "svg" });
}

export function cardQrPng() {
  return QRCode.toBuffer(cardUrl, { ...options, type: "png", width: 1024 });
}

/** The QR code is shown in development, and in production only once the real domain is configured. */
export const showQr = isSiteUrlConfigured || process.env.NODE_ENV !== "production";

/** QR code that opens a WhatsApp chat with the firm (independent of the website domain). */
export function whatsappQrSvg() {
  return QRCode.toString(whatsappUrl, { ...options, type: "svg" });
}
