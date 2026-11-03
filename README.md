# Sarath Kumar & Associates — website

Website and digital business card for **Sarath Kumar & Associates, Chartered Accountants**, Narsipatnam.

- **Stack:** Next.js 16 (App Router, static export), TypeScript, Tailwind CSS 4, Lucide icons, `qrcode` (build-time only).
- **Output:** a fully static site in `out/` — no server, database or CMS. It can be hosted on Cloudflare Pages, Netlify or ordinary cPanel shared hosting.
- **Motion:** CSS animations plus one shared IntersectionObserver (`components/RevealObserver.tsx`) — word-by-word hero reveal, image wipes, staggered lists, a practice-area marquee, scroll progress and parallax (where the browser supports scroll-driven animations). The digital card (`components/card/ElevatedCard.tsx`) tilts towards the pointer, catches a glare and flips to its QR side. Everything is disabled for visitors who prefer reduced motion, and content stays visible without JavaScript.
- **Enquiry form:** delivered to the firm's inbox through [Web3Forms](https://web3forms.com).

Before launch, read [`CONTENT-APPROVAL.md`](CONTENT-APPROVAL.md) — several items need the proprietor's sign-off.

---

## 1. Local setup

Requires Node.js 20.9 or newer.

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev                  # http://localhost:3000
```

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build → `out/` |
| `npm run preview` | Serves `out/` locally at http://localhost:4173 |
| `npm run check` | Lint, build and type-check |
| `npm run images` | Regenerates the optimised portraits in `public/images/` from the original photo |

## 2. Environment variables

Set these in `.env.local` for local work **and** in the hosting provider's build settings. They are read at build time, so rebuild after changing them.

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Yes, for launch | Production origin, e.g. `https://www.example.in` (no trailing slash). Used for canonical URLs, sitemap, Open Graph, the vCard website field and the **QR code**. Until it is set, the card page hides the QR code in production builds and the build prints a warning. |
| `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` | Yes, for the form | Web3Forms access key. Without it the form validates input but tells visitors to call or email instead — it never pretends to succeed. |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Optional | Adds a WhatsApp button to the digital card. Set **only** after the proprietor confirms which number uses WhatsApp. Digits only with country code, e.g. `917997670238`. |

## 3. Where to edit content

| What | File |
| --- | --- |
| Firm name, proprietor, qualifications, FRN, membership no., address, phones, email | `lib/site.ts` (single source — header, footer, contact page, digital card, vCard and structured data all read from it) |
| Services (scope, introductions, documents, related links) | `lib/services.ts` |
| FAQs, client segments, trust points, principles, official portal links | `lib/content.ts` |
| Privacy Policy / Disclaimer text | `app/(site)/privacy-policy/page.tsx`, `app/(site)/disclaimer/page.tsx` |
| Mark legal pages as approved (removes the "draft" notice) | `legalPagesApproved` in `lib/site.ts` |
| Colours and typography tokens | `app/globals.css` (`@theme` block) |

The original portrait photo (the WhatsApp image in the project root) is never modified. To replace the portrait, change `SOURCE` in `scripts/prepare-images.mjs` and run `npm run images`. Service pages use no photographs; their content lives in `lib/services.ts`.

## 4. Site map

| URL | Page |
| --- | --- |
| `/` | Home |
| `/about/` | About the firm and proprietor |
| `/services/` | Services overview |
| `/services/<category>/` | Nine service categories (ITR Filing, GST, Audit, Accounting, Registrations, Project Finance, Valuation, Compliance, Statutory Filings) |
| `/services/<category>/<sub-service>/` | 123 sub-service pages, each with the query form |
| `/industries/` | Client segments |
| `/resources/` | FAQs and official portal links |
| `/contact/` | Contact details and enquiry form (`?service=<slug>` pre-selects a service) |
| `/digital-card/` | Shareable digital business card |
| `/grandhi-sarath-kumar.vcf` | vCard file used by "Save contact" |
| `/digital-card-qr.png`, `/digital-card-qr.svg` | Downloadable QR code for the card (print-ready) |
| `/privacy-policy/`, `/disclaimer/` | Legal drafts |
| `/sitemap.xml`, `/robots.txt`, `/og-image.png` | SEO files, generated at build time |

## 5. Enquiry form (Web3Forms)

1. Go to https://web3forms.com and create an access key using **contact@sarathca.in** (the key is tied to the inbox that receives submissions).
2. Put the key in `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` on the host and rebuild. The key is designed to be public; it cannot be used to read submissions.
3. Recommended in the Web3Forms dashboard: restrict submissions to the production domain, and enable their spam filtering. The form already uses a honeypot field and a minimum fill time.
4. After launch, send a test enquiry from the live site and confirm it arrives (check the spam folder the first time).

The free plan has a monthly submission limit; check Web3Forms' current terms. To switch providers later, only `components/ContactForm.tsx` needs to change.

## 6. Deployment

### Recommended: Cloudflare Pages (free plan, commercial use permitted)

1. Push this project to a GitHub repository owned by the firm (or by you, transferred at handover).
2. Cloudflare dashboard → Workers & Pages → Create → Pages → connect the repository.
3. Build settings: **Framework preset** none, **Build command** `npm run build`, **Output directory** `out`, environment variable `NODE_VERSION=20` (or newer).
4. Add the three environment variables from section 2.
5. Deploy, then add the custom domain under the project's *Custom domains* tab. HTTPS certificates are issued automatically.

Netlify works the same way (build `npm run build`, publish `out`). `public/_headers` sets security and caching headers on both.

### Vercel

Vercel's free Hobby plan is for non-commercial use only, so a firm website needs the Pro plan; check Vercel's current terms.

1. Push this project to a GitHub repository (or upload it with the Vercel CLI: `npx vercel`).
2. Vercel dashboard → Add New → Project → import the repository. The **Next.js** preset is detected; leave the build command and output directory at their defaults.
3. Under *Environment Variables*, add the variables from section 2 (at least `NEXT_PUBLIC_SITE_URL` and `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY`) for Production.
4. Deploy, then add the domain under *Settings → Domains* and create the DNS records Vercel shows. HTTPS is issued automatically.

If `NEXT_PUBLIC_SITE_URL` is added or changed after the first deploy, redeploy so the new value is built in. `vercel.json` sets the same security and caching headers as `public/_headers`.

### Alternative: cPanel / shared hosting (e.g. a domain + hosting bundle)

1. Run `npm run build` locally with the production `.env.local`.
2. Upload the **contents** of `out/` to `public_html/` (File Manager or FTP).
3. Copy `deploy/htaccess-for-shared-hosting.txt` to `public_html/.htaccess` and replace `your-domain.in`.
4. Enable the free SSL certificate (AutoSSL / Let's Encrypt) in cPanel.

Every content change requires a rebuild and re-upload on shared hosting; Git-connected hosts rebuild automatically on push.

## 7. Domain and DNS

Choose one canonical host (recommended: `www.`) and use the same value in `NEXT_PUBLIC_SITE_URL`.

- **Cloudflare Pages / Netlify:** follow the host's custom-domain wizard. Typically a `CNAME` record `www → <project>.pages.dev` (or the Netlify subdomain), plus a redirect from the bare domain to `www`. If the domain's DNS is moved to Cloudflare, the bare-domain record is handled automatically.
- **Shared hosting:** point the domain's nameservers to the hosting provider, or set an `A` record for `@` and `www` to the server IP the provider gives you.
- After DNS propagates, confirm that `http://`, bare-domain and `www` all redirect to the single canonical HTTPS address.

Register the domain in the firm's name with the firm's email as the registrant contact, and enable auto-renew and registrar lock.

## 8. Search Console and analytics

**Google Search Console** (free, no tracking code on the site):
1. https://search.google.com/search-console → Add property → **Domain** → verify with the DNS `TXT` record Google provides (add it at the DNS host).
2. Submit `https://<domain>/sitemap.xml` under *Sitemaps*.
3. Use *URL inspection* on the homepage and request indexing.

**Google Business Profile:** if the firm wants map listings, the proprietor should create or claim the profile personally at https://business.google.com using the same name, address and phone numbers as the website. This website does not claim any listing exists.

**Analytics:** none is installed. If the firm approves analytics later, prefer a cookie-free option (e.g. Cloudflare Web Analytics, enabled from the Pages dashboard with no code change), and update the Privacy Policy before enabling it. Do not add tracking that requires consent without a consent mechanism.

## 9. Structured data and SEO notes

- `AccountingService` + `Person` + `WebSite` JSON-LD on every page (`lib/seo.ts`); `BreadcrumbList` on inner pages; `FAQPage` only on `/resources/`, where all answers are visible.
- No ratings, reviews, opening hours or map coordinates are published, because none have been supplied. Add opening hours to `organizationJsonLd()` only if the firm confirms them.
- Validate after launch with https://validator.schema.org and https://search.google.com/test/rich-results.

## 10. Backups and recovery

- **Code and content:** the Git repository is the backup. Keep it in an account the firm controls; the hosting can be rebuilt from it in minutes.
- **Built site:** keep a zip of the latest `out/` folder with the handover documents.
- **Enquiries:** stored only in the firm's email inbox (Web3Forms does not act as the archive).
- **Recovery:** if hosting is lost, create a new Pages/Netlify project from the repository (section 6) and repoint DNS.

## 11. Handover checklist

- [ ] Proprietor has approved all items in `CONTENT-APPROVAL.md`, and `legalPagesApproved` is set to `true`.
- [ ] Domain registered in the firm's name; registrar login handed over; auto-renew on.
- [ ] Hosting account owned by (or transferred to) the firm; login handed over.
- [ ] Git repository owned by (or transferred to) the firm.
- [ ] Web3Forms account created with the firm's email; test enquiry received.
- [ ] `NEXT_PUBLIC_SITE_URL` set; QR code on `/digital-card/` scanned and opens the live card.
- [ ] "Save contact" tested on an iPhone and an Android phone.
- [ ] Search Console verified and sitemap submitted.
- [ ] HTTPS and canonical redirects confirmed.

## 12. Quality checks performed

Lighthouse (mobile, simulated slow 4G) against the production build served locally: Performance 93–98, Accessibility 100, Best Practices 100, SEO 100, CLS 0 on `/`, `/digital-card/` and `/about/`. Scores vary by device and network and should be re-checked on the live domain.
