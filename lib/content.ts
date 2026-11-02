import type { FaqItem } from "./services";
import { firm, proprietor } from "./site";

/** FAQs from section 9 of the brief. The "Who leads the firm?" answer uses the proprietor details supplied by the client. */
export const faqs: FaqItem[] = [
  {
    question: "What services does Sarath Kumar & Associates provide?",
    answer:
      "The firm provides audit and assurance, income-tax, GST, accounting, company and LLP compliance, business registration, project report and related professional services, subject to eligibility and engagement.",
  },
  {
    question: "When was the firm established?",
    answer: `${firm.name} was established in ${firm.established}.`,
  },
  {
    question: "Who leads the firm?",
    answer: `The firm is led by its proprietor, ${proprietor.name} (${proprietor.qualifications}).`,
  },
  {
    question: "Do you assist startups and MSMEs?",
    answer:
      "Yes. The firm assists eligible startups and MSMEs with relevant registrations, tax and GST compliance, accounting and business documentation.",
  },
  {
    question: "Do you help with company and LLP compliance?",
    answer:
      "Yes. Assistance is available for incorporation and applicable ongoing MCA/ROC and LLP compliance matters.",
  },
  {
    question: "Can you prepare project reports and CMA data?",
    answer:
      "Yes. Project reports, financial projections and CMA data can be prepared based on the client's information, assumptions and intended purpose.",
  },
  {
    question: "Can services be provided remotely?",
    answer:
      "Remote assistance may be available depending on the nature of the assignment and document requirements. Please confirm this with the firm when you get in touch.",
  },
  {
    question: "How can a client get started?",
    answer:
      "Contact the firm by phone or email with a brief description of the requirement. The firm will explain the documents needed and the proposed scope of work.",
  },
];

/** Section 6 of the brief. */
export const clientSegments = [
  { title: "Individuals, salaried persons and professionals" },
  { title: "Proprietorships, partnership firms, LLPs and private limited companies" },
  { title: "Startups and MSMEs" },
  { title: "Trading, retail and wholesale businesses" },
  { title: "Manufacturing and service businesses" },
  { title: "Healthcare and professional service providers" },
  { title: "Transport, travel and logistics businesses" },
  { title: "Petrol pumps and fuel retail businesses" },
  {
    title: "Eligible trusts, societies and non-profit organisations",
    note: "For relevant accounting, audit and tax compliance assignments",
  },
];

/** Homepage trust points, drawn from "Why Choose Us" in the content pack. */
export const trustPoints = [
  { label: "Established", value: `In ${firm.established}` },
  { label: "Leadership", value: "Qualified Chartered Accountant-led" },
  { label: "Response", value: "Reply within 24 hours" },
  { label: "Fees", value: "Transparent, no hidden charges" },
];

/** "Who We Are" and "Our Mission" (About Us, section 3 of the content pack). */
export const whoWeAre =
  "Sarath Kumar & Associates is a Chartered Accountancy firm that helps individuals, start-ups, MSMEs, companies, trusts and NGOs stay compliant, save tax legally and grow with confidence. We combine technical expertise with clear, honest communication so that every client understands exactly what is being done and why.";

export const mission =
  "To make taxation, audit, accounting and compliance simple, accurate and stress-free for every client.";

/** "Why Choose Us" (About Us, section 3 of the content pack). */
export const principles = [
  {
    title: "Chartered Accountant-led",
    text: "Every engagement is handled by a qualified Chartered Accountant-led team.",
  },
  {
    title: "Single window",
    text: "One firm for tax, GST, audit, accounting and registrations — no running between consultants.",
  },
  {
    title: "Timely filings",
    text: "Due dates are tracked so filings go in on time, avoiding missed deadlines and penalties.",
  },
  {
    title: "Transparent fees",
    text: "Fees are agreed in writing up front, with no hidden charges.",
  },
  {
    title: "Confidentiality",
    text: "Client records are handled with confidentiality and kept secure.",
  },
  {
    title: "Quick response",
    text: "Enquiries receive a reply within 24 hours.",
  },
];

/** Official portals listed on the Resources page. */
export const officialPortals = [
  { name: "Income Tax e-Filing Portal", href: "https://www.incometax.gov.in/", note: "Income Tax Department, Government of India" },
  { name: "GST Portal", href: "https://www.gst.gov.in/", note: "Goods and Services Tax Network" },
  { name: "MCA Portal", href: "https://www.mca.gov.in/", note: "Ministry of Corporate Affairs" },
  { name: "Udyam Registration", href: "https://udyamregistration.gov.in/", note: "Ministry of Micro, Small & Medium Enterprises" },
  { name: "Startup India", href: "https://www.startupindia.gov.in/", note: "DPIIT startup recognition" },
  { name: "ICAI", href: "https://www.icai.org/", note: "The Institute of Chartered Accountants of India" },
];
