import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { firm, proprietor } from "@/lib/site";

export const dynamic = "force-static";

const size = { width: 1200, height: 630 };

/** Social sharing image, rendered once at build time to /og-image.png. */
export async function GET() {
  const photo = await readFile(join(process.cwd(), "public/images/grandhi-sarath-kumar-800.jpg"));
  const photoSrc = `data:image/jpeg;base64,${photo.toString("base64")}`;

  const logo = await readFile(join(process.cwd(), "public/images/brand/ca-india-logo-160.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "linear-gradient(100deg, #081d3a 0%, #0b2545 40%, #1e5faa 100%)",
        }}
      >
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "60px 60px 52px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 80, height: 80, borderRadius: 18, background: "#fff" }}>
              {/* eslint-disable-next-line @next/next/no-img-element -- rendered by ImageResponse, not the browser */}
              <img src={logoSrc} alt="" width={60} height={45} />
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ fontSize: 32, fontWeight: 700, color: "#ffffff" }}>{firm.name}</div>
              <div style={{ fontSize: 20, color: "#a9badb", marginTop: 4 }}>{firm.designation}</div>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 56, lineHeight: 1.1, color: "#ffffff", letterSpacing: -1 }}>Simplify your Income Tax</div>
            <div style={{ fontSize: 56, lineHeight: 1.1, color: "#e2b437", letterSpacing: -1 }}>Return e-Filing</div>
            <div style={{ fontSize: 24, color: "#e4ebf6", marginTop: 28 }}>Tax · GST · Audit · Accounting · Compliance</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ display: "flex", height: 5, width: 300, background: "#d4a017", borderRadius: 3 }} />
            <div style={{ fontSize: 22, color: "#e4ebf6" }}>{`Narsipatnam, Andhra Pradesh · Est. ${firm.established}`}</div>
          </div>
        </div>
        <div style={{ width: 400, height: "100%", display: "flex", position: "relative" }}>
          {/* eslint-disable-next-line @next/next/no-img-element -- rendered by ImageResponse, not the browser */}
          <img src={photoSrc} alt="" width={400} height={630} style={{ objectFit: "cover", width: 400, height: 630 }} />
          <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, display: "flex", flexDirection: "column", padding: "20px 28px", background: "rgba(11,37,69,0.88)", borderTop: "4px solid #d4a017" }}>
            <div style={{ fontSize: 24, color: "#fff" }}>{proprietor.titledName}</div>
            <div style={{ fontSize: 18, color: "#a9badb", marginTop: 2 }}>{`${proprietor.qualifications} · ${proprietor.role}`}</div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
