import { Inter, Poppins } from "next/font/google";

/** Heading face (Poppins, per the brief): bold headings, clean sans-serif. */
export const heading = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

/** Body face; not preloaded so it never competes with the headline font. */
export const sans = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});
