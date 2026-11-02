import type { NextConfig } from "next";

if (process.env.NODE_ENV === "production" && !process.env.NEXT_PUBLIC_SITE_URL) {
  console.warn(
    "\n⚠  NEXT_PUBLIC_SITE_URL is not set. Canonical URLs, the sitemap and the digital-card QR code\n" +
      "   will not point at the production domain. Set it before building for launch (see .env.example).\n",
  );
}

const nextConfig: NextConfig = {
  // Fully static site: deployable to any static host (Netlify, Cloudflare Pages, shared hosting).
  output: "export",
  // Emits /about/index.html so URLs work on every static host without rewrite rules.
  trailingSlash: true,
  // Images are pre-optimised by scripts/prepare-images.mjs (AVIF/WebP at several widths).
  images: { unoptimized: true },
  poweredByHeader: false,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
