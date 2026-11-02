import { whatsappChatUrl } from "@/lib/site";

/** Floating "Chat with us on WhatsApp" button shown on every site page (content pack, Footer section). */
export function WhatsAppFloat() {
  return (
    <a
      href={whatsappChatUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp (opens in a new tab)"
      className="group fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-whatsapp p-3.5 text-white shadow-[0_14px_30px_-10px_rgba(27,138,71,0.75)] transition-[background-color,transform] duration-300 hover:-translate-y-0.5 hover:bg-whatsapp-700 sm:bottom-6 sm:right-6 sm:pr-5"
    >
      <svg aria-hidden viewBox="0 0 32 32" className="h-7 w-7 shrink-0" fill="currentColor">
        <path d="M16.04 3C8.86 3 3.03 8.82 3.03 16c0 2.3.6 4.53 1.74 6.5L3 29l6.68-1.74A12.97 12.97 0 0 0 16.04 29C23.2 29 29.04 23.18 29.04 16S23.2 3 16.04 3Zm0 23.62c-1.98 0-3.92-.53-5.61-1.54l-.4-.24-3.96 1.03 1.06-3.86-.26-.4A10.6 10.6 0 0 1 5.4 16c0-5.86 4.77-10.62 10.64-10.62 5.86 0 10.63 4.76 10.63 10.62 0 5.86-4.77 10.62-10.63 10.62Zm5.83-7.95c-.32-.16-1.88-.93-2.17-1.03-.29-.1-.5-.16-.71.16-.21.32-.82 1.03-1 1.24-.18.21-.37.24-.69.08-.32-.16-1.34-.5-2.56-1.58-.95-.85-1.59-1.9-1.77-2.21-.19-.32-.02-.49.14-.65.14-.14.32-.37.48-.56.16-.18.21-.32.32-.53.1-.21.05-.4-.03-.56-.08-.16-.71-1.71-.98-2.34-.26-.62-.52-.53-.71-.54h-.61c-.21 0-.56.08-.85.4-.29.32-1.11 1.09-1.11 2.65 0 1.56 1.14 3.07 1.3 3.28.16.21 2.24 3.42 5.43 4.8.76.33 1.35.52 1.81.67.76.24 1.45.2 2 .12.61-.09 1.88-.77 2.14-1.51.27-.74.27-1.38.19-1.51-.08-.13-.29-.21-.61-.37Z" />
      </svg>
      <span className="hidden text-[0.92rem] font-semibold sm:inline">Chat with us</span>
    </a>
  );
}
