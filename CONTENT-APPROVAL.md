# Content for proprietor approval

Under ICAI's Code of Ethics and guidelines for members' websites, the proprietor should review and approve all content before the website is published. Nothing on the site has been reviewed by a legal professional or by ICAI.

## 1. Discrepancies to resolve

| Item | Visiting card / brief | On the website (per client instruction) | Action |
| --- | --- | --- | --- |
| Proprietor's name | "CA Sarath Kumar Grandhi" | **Grandhi Sarath Kumar** | Confirm the preferred order. Changing it in `lib/site.ts` updates the whole site, the vCard and structured data. |
| Qualifications | "ACA" | **CA, DISA, B.Com** | Confirm. "ACA" is not shown anywhere. Confirm that DISA has been awarded. |
| Phone format | 7997670238 / 9391185755 | +91 79976 70238 / +91 93911 85755 | Same numbers, international format. Confirm both are current. |

## 2. Facts displayed — please confirm

- Firm name, "Chartered Accountants", established **2022**.
- ICAI Firm Registration No. **024704S** and Membership No. **262952** (About page, homepage proprietor section, footer).
- Address: D No. 24-6-41, Thotavaari Veedhi, Narsipatnam, Visakhapatnam District, Andhra Pradesh – 531116.
- Email: grandhisarathkumar@gmail.com.
- The **Directions** links run a Google Maps search for the address rather than a fixed map pin. Check that the result lands on the office; if not, supply a confirmed map link.

## 3. WhatsApp

- WhatsApp is enabled on **+91 93911 85755** (confirmed by the client). It appears as a button and a QR code on `/digital-card/`, and as a QR code on `/contact/`.

## 4. Branding

- The logo is an SVG redrawing of the **CA mark** on the visiting card (navy "CA" with a green tick). Use of the CA logo is governed by ICAI's guidelines. Please confirm the firm may use it on the website. If not, replace `components/Logo.tsx` and `app/icon.svg` with a monogram.

## 5. Copy written for the site (not taken word-for-word from the brief)

These follow the brief's facts and qualifiers but are new wording:

- Homepage hero headline "Clarity in numbers. Confidence in decisions."
- The four "How the firm works" principles (Clarity, Confidentiality, Accuracy, Responsible service), based on the brief's About text.
- Each service page's introduction, "Who may need this service" list and "Information typically requested" list (`lib/services.ts`). Service scope bullet points are taken from section 5 of the brief.
- About page profile paragraph.
- Resources page list of official government portals (Income Tax, GST, MCA, Udyam, Startup India, ICAI).
- FAQ answers are from the brief. "Who leads the firm?" uses the name and qualifications above.

## 6. Legal drafts

- `/privacy-policy/` and `/disclaimer/` are initial drafts based on how the site actually works: no cookies or analytics, form delivered via Web3Forms, Google Maps links, and server logs at the host. Each page shows a "Draft" notice until `legalPagesApproved` in `lib/site.ts` is set to `true`.
- Consider whether the firm wants a click-through disclaimer on first visit, which some CA firms use. It is not included, to keep the site fast and unobtrusive.

## 7. Deliberately not included

Testimonials, client names or logos, team members, years-of-experience claims, statistics, awards, ratings, opening hours, map coordinates, FCRA services, virtual CFO services and bank loan syndication.

## 8. October 2026 content-pack update — still to confirm or supply

The site now follows *Sarath_Kumar_Associates_Website_Content-1.docx* (navy / royal-blue / gold theme, Poppins headings, query form, WhatsApp buttons, About, FAQs, Terms). The pack left these as placeholders, so they are **not** shown on the site:

- Years of practice ("[X] years") — the site says "Established in 2022" instead.
- Office hours, a second email address and a confirmed Google Maps pin (the contact-page map is located from the postal address).
- Founder achievements ("Add 2–3 lines").
- Logo: the header, favicon and digital card now use the supplied **CA India** logo. Confirm the firm may use it under ICAI's guidelines.
- Jurisdiction in the Terms page is "courts at Visakhapatnam" as in the pack. Narsipatnam now falls in Anakapalli district, so please confirm.

Needs setup before launch:

- **Query form delivery:** set `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY`. Until then the form shows a "call / WhatsApp / email" fallback message. Email subject: "New Query – [Name] – [Service]".
- **Instant WhatsApp alert, auto-reply SMS, query dashboard and reCAPTCHA** (from the Quick Response Alert section) need a backend or automation service (e.g. WhatsApp Business API). The static site can't send these by itself. For now, after a successful submission the visitor gets a "Send on WhatsApp" button pre-filled with their query.

## 9. Services restructured to the content pack (sections 6–15)

- Services now follow the pack's menu: **ITR Filing, GST, Audit, Accounting, Registrations, Project Finance, Valuation, Compliance, Statutory Filings** — shown as a services bar with mega-menus under the header (collapsible lists on mobile).
- Every sub-service in the pack has its own page (`/services/<category>/<sub-service>/`, 123 pages) in the pack's short layout: banner + title, "What is it?", three "What we do for you" boxes, documents required, **Get Started – Enquire Now**, and the query form (right on desktop, below on mobile). Enquiries from these pages carry the sub-service name.
- **To approve:** the "Documents required" lists are drafts per category (the pack says "[firm to supply]"), as are the short category intros. Two pack items titled "Others" are shown as **Other Loans** and **Other Certificates**.
- Old service URLs (e.g. `/services/income-tax/`, `/services/audit-assurance/`) no longer exist. If they were shared or indexed, add redirects on the host.
- The pack's sample also lists FCRA registration and virtual CFO services, which section 7 above previously excluded; they are now included as the pack specifies — please confirm.

- **Blogs removed (client request):** the Blogs section and its starter topics are no longer on the site; the menu item is now "FAQs".

- **Courses removed (client request):** the Courses section (Tally Prime with GST, ITR filing, GST practical, payroll, MS Excel) is no longer on the site; only FAQs and official portal links remain at `/resources/`.
