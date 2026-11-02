import { cardQrPng } from "@/lib/qr";

export const dynamic = "force-static";

export async function GET() {
  const png = await cardQrPng();
  return new Response(new Uint8Array(png), { headers: { "Content-Type": "image/png" } });
}
