import { cardQrSvg } from "@/lib/qr";

export const dynamic = "force-static";

export async function GET() {
  return new Response(await cardQrSvg(), { headers: { "Content-Type": "image/svg+xml" } });
}
