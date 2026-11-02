/**
 * Service content, from sections 6–14 of Sarath_Kumar_Associates_Website_Content-1.docx.
 * Each menu category (ITR Filing, GST, Audit …) has groups of sub-services; every sub-service
 * has the pack's short intro and three key points. Category intros and the "documents required"
 * lists are drafts written for the site (the pack leaves them to the firm) and need approval.
 */

export type ServiceIcon =
  | "itr"
  | "gst"
  | "audit"
  | "accounting"
  | "registrations"
  | "project-finance"
  | "valuation"
  | "compliance"
  | "statutory";

export type FaqItem = { question: string; answer: string };

export type SubService = {
  slug: string;
  title: string;
  /** "What is it?" — the pack's short intro. */
  intro: string;
  /** "What we do for you" — the pack's three key points. */
  points: [string, string, string];
};

export type ServiceGroup = { title: string; items: SubService[] };

export type Service = {
  slug: string;
  /** Page heading. */
  title: string;
  /** Main-menu label from the pack ("ITR Filing", "GST" …). */
  menuLabel: string;
  /** Option in the query form's "Service needed" drop-down. */
  enquiryLabel: string;
  icon: ServiceIcon;
  summary: string;
  metaDescription: string;
  intro: string;
  documents: string[];
  groups: ServiceGroup[];
};

type ItemTuple = [title: string, intro: string, points: string];

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Builds sub-services from [title, intro, "point • point • point"] rows, as laid out in the pack. */
function items(rows: ItemTuple[]): SubService[] {
  return rows.map(([title, intro, points]) => ({
    slug: slugify(title),
    title,
    intro,
    points: points.split(" • ") as SubService["points"],
  }));
}

export const services: Service[] = [
  {
    slug: "itr-filing",
    title: "Income Tax Return Filing",
    menuLabel: "ITR Filing",
    enquiryLabel: "ITR Filing",
    icon: "itr",
    summary: "The right ITR form for your income, filed accurately before the due date — plus updated returns and tax notices.",
    metaDescription:
      "ITR filing for individuals, HUFs, firms, LLPs, companies and trusts — ITR-1 to ITR-7, ITR-U updated returns and income tax notices. Sarath Kumar & Associates, Chartered Accountants.",
    intro:
      "We help you pick the correct ITR form for your income sources and file it accurately before the due date — with review of Form 26AS / AIS and e-verification support.",
    documents: [
      "PAN and Aadhaar",
      "Form 16 / Form 16A and other TDS certificates",
      "Annual Information Statement (AIS) and Form 26AS",
      "Bank statements and interest certificates",
      "Investment and deduction proofs (80C, 80D and others)",
      "Capital gains, property or business details, where applicable",
    ],
    groups: [
      {
        title: "Income Tax Return Filing",
        items: items([
          [
            "Overview – Choose the Right ITR Form",
            "We help you pick the correct ITR form for your income sources and file it accurately before the due date.",
            "Review of Form 26AS / AIS • Correct form selection • E-verification support",
          ],
          [
            "ITR-1 (SAHAJ)",
            "For resident individuals with salary or pension, one house property and other-source income within the prescribed limit.",
            "Salary & pension income • One house property • Interest income",
          ],
          [
            "ITR-2",
            "For individuals and HUFs who have capital gains, more than one house property, foreign assets/income, but no business income.",
            "Capital gains • Multiple properties • Foreign assets disclosure",
          ],
          [
            "ITR-3",
            "For individuals and HUFs having income from business or profession, including those who keep books of accounts.",
            "Business / profession income • Books & balance sheet • Partner remuneration",
          ],
          [
            "ITR-4 (SUGAM)",
            "For eligible resident individuals, HUFs and firms (other than LLP) opting for the presumptive scheme under Sections 44AD, 44ADA and 44AE.",
            "Presumptive income • Simple compliance • Small traders & professionals",
          ],
          [
            "ITR-5",
            "For partnership firms, LLPs, AOPs, BOIs and certain other entities.",
            "Firms & LLPs • AOP / BOI • Audit report linkage",
          ],
          [
            "ITR-6",
            "For companies other than those claiming exemption under Section 11 (charitable or religious purpose).",
            "Company returns • Financial statements • Tax computation",
          ],
          [
            "ITR-7",
            "For persons including companies required to furnish return under Sections 139(4A) to 139(4F) – trusts, institutions and similar entities.",
            "Trusts & institutions • 12A / 80G entities • Political parties & others",
          ],
          [
            "ITR-U (Updated Return)",
            "Filing an updated return to correct errors or report missed income within the time allowed by law, on payment of additional tax.",
            "Missed income reporting • Correction of errors • Penalty-risk reduction",
          ],
          [
            "Tax Notices",
            "Professional help to read, reply to and resolve notices and intimations from the Income Tax Department.",
            "Notice analysis • Reply drafting & filing • Rectification & appeals guidance",
          ],
        ]),
      },
    ],
  },
  {
    slug: "gst",
    title: "GST Services",
    menuLabel: "GST",
    enquiryLabel: "GST",
    icon: "gst",
    summary: "GST registration, monthly and annual returns, e-invoicing, e-way bills, export refunds and notice replies.",
    metaDescription:
      "GST registration, GSTR-1 / GSTR-3B and annual return filing, composition scheme, e-invoicing, e-way bills, export refunds and GST notices — Sarath Kumar & Associates.",
    intro:
      "From new registration to monthly returns, refunds and notices, we handle your GST compliance end to end so that nothing is missed and input tax credit is not lost.",
    documents: [
      "PAN and Aadhaar of the proprietor, partners or directors",
      "Photograph of the proprietor, partners or directors",
      "Proof of business address (rent agreement, electricity bill or NOC)",
      "Bank account details (cancelled cheque or statement)",
      "Sales and purchase invoices or registers",
      "Copies of notices or orders received, where applicable",
    ],
    groups: [
      {
        title: "GST",
        items: items([
          [
            "GST Registrations",
            "New GST registration for businesses, e-commerce sellers, casual taxable persons and others.",
            "PAN, Aadhaar & address proof • Business documents • ARN tracking until approval",
          ],
          [
            "GST Return",
            "Monthly, quarterly and annual GST return filing with reconciliation.",
            "GSTR-1 / GSTR-3B • GSTR-9 / 9C annual returns • ITC reconciliation (2B)",
          ],
          [
            "Composition Scheme",
            "Guidance on opting for and operating under the GST Composition Scheme for small businesses.",
            "Eligibility check • Quarterly CMP-08 & annual return • Scheme exit advice",
          ],
          [
            "E-Invoicing",
            "Setup and guidance on e-invoice (IRN) generation for businesses crossing the notified turnover threshold.",
            "Applicability check • IRN & QR code process • Software integration advice",
          ],
          [
            "E-Way Bill",
            "Generation and management of e-way bills for movement of goods.",
            "Part A / Part B guidance • Bulk generation • Compliance advice",
          ],
          [
            "Exports & Refunds",
            "GST on exports, LUT filing and refund claims for exporters and inverted-duty cases.",
            "LUT filing • Refund application (RFD-01) • Follow-up with department",
          ],
          [
            "Advisory & Notices",
            "Advice on GST law and replies to show-cause notices, scrutiny and demand orders.",
            "Notice replies • Audit & assessment support • Appeal guidance",
          ],
        ]),
      },
    ],
  },
  {
    slug: "audit-services",
    title: "Audit Services",
    menuLabel: "Audit",
    enquiryLabel: "Audit",
    icon: "audit",
    summary: "Tax, statutory, internal, GST, stock, bank and specialised audits — independent, thorough and on time.",
    metaDescription:
      "Tax audit (Sec 44AB), statutory, internal, GST, stock, bank, concurrent, forensic, management, due diligence, CSR and RERA audits — Sarath Kumar & Associates.",
    intro:
      "Independent audits that give owners, lenders and regulators confidence in your numbers — carried out within applicable professional standards and statutory requirements.",
    documents: [
      "Books of account, ledgers and trial balance for the period",
      "Bank statements and reconciliations",
      "Previous year's audited financial statements and audit reports",
      "GST and TDS returns filed for the period",
      "Fixed asset and stock records",
      "Statutory registers and filings, as relevant to the entity",
    ],
    groups: [
      {
        title: "Audit Services",
        items: items([
          [
            "Tax Audit (Sec 44AB)",
            "Audit of accounts for businesses and professionals crossing the turnover or receipts limits under Section 44AB.",
            "Form 3CA/3CB-3CD • Compliance checks • Timely filing",
          ],
          [
            "Statutory Audit",
            "Independent audit of financial statements of companies, LLPs and other entities as required by law.",
            "Audit report • Books verification • Compliance review",
          ],
          [
            "Internal Audit",
            "Review of internal controls, processes and transactions to reduce risk and leakage.",
            "Process review • Control gaps report • Management recommendations",
          ],
          [
            "GST Audit",
            "Review of GST returns, ITC and reconciliations to identify errors before the department does.",
            "ITC verification • Turnover reconciliation • Corrective action plan",
          ],
          [
            "Stock Audit",
            "Verification of stock, valuation and records, commonly required by banks for working capital limits.",
            "Physical verification • Valuation check • Bank-format report",
          ],
          [
            "Bank Audit",
            "Audit support for branches and banking-related assignments as per the assignment terms.",
            "Branch audit support • LFAR assistance • Advances review",
          ],
          [
            "Concurrent Audit",
            "Ongoing real-time audit of transactions during the period to detect issues early.",
            "Daily / weekly checks • Exception reporting • Regulatory adherence",
          ],
          [
            "Forensic Audit",
            "Detailed investigation of financial records to detect fraud, misstatement or misuse.",
            "Fraud detection • Evidence gathering • Investigation report",
          ],
          [
            "Management Audit",
            "Evaluation of management performance, policies and efficiency.",
            "Policy review • Performance analysis • Improvement roadmap",
          ],
          [
            "Due Diligence Audit",
            "Financial and tax due diligence before mergers, acquisitions, investments or lending.",
            "Financial review • Tax & compliance review • Risk summary",
          ],
          [
            "CSR Audit",
            "Audit and certification of Corporate Social Responsibility spending and utilisation.",
            "Fund utilisation check • Documentation review • Impact reporting support",
          ],
          [
            "RERA Audit",
            "Audit and certification for real-estate projects and promoters under RERA requirements.",
            "Project accounts audit • Form certification • Withdrawal certification",
          ],
        ]),
      },
    ],
  },
  {
    slug: "accounting",
    title: "Accounting & Bookkeeping",
    menuLabel: "Accounting",
    enquiryLabel: "Accounting",
    icon: "accounting",
    summary: "Monthly bookkeeping, Tally / Zoho accounting, payroll, MIS reports, virtual CFO and year-end finalisation.",
    metaDescription:
      "Monthly bookkeeping, Tally Prime and Zoho Books accounting, bank reconciliation, payroll, financial statements, MIS reporting and virtual CFO services — Sarath Kumar & Associates.",
    intro:
      "Accurate, up-to-date books are the base for tax filings, audits, loans and everyday decisions. We keep your accounts in order every month and present them clearly.",
    documents: [
      "Sales and purchase invoices",
      "Bank statements for all accounts",
      "Expense vouchers and payment records",
      "Salary and attendance details, for payroll",
      "Details of loans, assets and investments",
      "Previous year's financial statements",
    ],
    groups: [
      {
        title: "Accounting & Bookkeeping",
        items: items([
          [
            "Monthly Bookkeeping",
            "Accurate, up-to-date books of accounts maintained every month.",
            "Voucher entry • Ledger scrutiny • Monthly reports",
          ],
          [
            "Tally / Zoho Books Accounting",
            "Accounting setup and maintenance in Tally Prime or Zoho Books, including GST-ready data.",
            "Software setup • Data migration • Training for your team",
          ],
          [
            "Bank Reconciliation",
            "Matching bank statements with books to identify differences and errors.",
            "Monthly reconciliation • BRS statements • Unreconciled item follow-up",
          ],
          [
            "Accounts Payable & Receivable",
            "Tracking of vendor bills and customer dues to improve cash flow.",
            "Ageing reports • Payment reminders • Vendor reconciliation",
          ],
          [
            "Payroll Processing",
            "Salary calculation with PF, ESI, Professional Tax and TDS on salary.",
            "Payslips • Statutory deductions • Return filing support",
          ],
          [
            "Financial Statement Preparation",
            "Preparation of Profit & Loss account, Balance Sheet and notes for tax, bank and statutory needs.",
            "Final accounts • Schedules & notes • Bank / loan formats",
          ],
          [
            "Inventory Accounting",
            "Stock tracking, valuation and reconciliation with books.",
            "Stock registers • Valuation methods • Stock-to-books tie-up",
          ],
          [
            "Virtual CFO Services",
            "Part-time CFO support – budgeting, cash-flow planning and decision support at a fraction of the cost.",
            "Budgets & forecasts • Cash-flow management • Management reviews",
          ],
          [
            "MIS Reporting",
            "Clear monthly dashboards and reports for owners and managers.",
            "P&L and cost analysis • Sales & expense trends • Custom reports",
          ],
          [
            "Year-End Closing & Finalization",
            "Smooth closing of books at year end with accurate finalisation.",
            "Adjustment entries • Provisions & depreciation • Audit-ready accounts",
          ],
        ]),
      },
    ],
  },
  {
    slug: "registrations",
    title: "Registrations",
    menuLabel: "Registrations",
    enquiryLabel: "Registration",
    icon: "registrations",
    summary: "Company, LLP and firm registration, MSME, Startup India and NGO registration, tax registrations and licences.",
    metaDescription:
      "Company, LLP, OPC and partnership registration, MSME and Startup India, trust, society and NGO registration, PAN, TAN, GST, PF, ESI, FSSAI, IEC, trademark and other licences.",
    intro:
      "Start right with the correct structure and every registration and licence your business or organisation needs — handled from documents to certificate.",
    documents: [
      "PAN and Aadhaar of the owners, partners, directors or trustees",
      "Passport-size photographs",
      "Proof of office address (rent agreement and utility bill)",
      "Bank account details",
      "Proposed name and a short description of the activity",
      "Existing constitution documents (deed, MOA / AOA), where applicable",
    ],
    groups: [
      {
        title: "Company Registration",
        items: items([
          [
            "Sole Proprietorship",
            "Simple registration and licences for single-owner businesses.",
            "Quick setup • Minimal compliance • Bank account guidance",
          ],
          [
            "Partnership Firm",
            "Drafting of partnership deed and registration of the firm.",
            "Deed drafting • PAN & bank account • Registration support",
          ],
          [
            "Limited Liability Partnership",
            "LLP incorporation with limited liability and flexible management.",
            "Name approval • LLP agreement • Incorporation filing",
          ],
          [
            "One Person Company",
            "Incorporation of a company with a single owner and nominee.",
            "Name approval • MOA & AOA • Certificate of Incorporation",
          ],
          [
            "Private Limited Company",
            "Incorporation of a Private Limited Company – the preferred structure for start-ups and growth.",
            "Name reservation • DIN & DSC • PAN, TAN & incorporation certificate",
          ],
          [
            "Company Registration in UK",
            "Assistance with setting up a UK company for international business.",
            "Company formation • Registered address • Compliance guidance",
          ],
          [
            "Company Registration in USA",
            "Assistance with setting up a US company (LLC / C-Corp) for global operations.",
            "State selection • EIN guidance • Compliance guidance",
          ],
        ]),
      },
      {
        title: "Business & NGO Registration",
        items: items([
          [
            "MSME Registration",
            "Udyam registration to access MSME benefits and schemes.",
            "Free online registration • Subsidy & loan benefits • Udyam certificate",
          ],
          [
            "Startup India Registration",
            "DPIIT recognition for eligible start-ups to access tax and funding benefits.",
            "Eligibility check • Application support • Benefit guidance",
          ],
          [
            "Trust Registration",
            "Registration of public or private trusts with a trust deed.",
            "Deed drafting • Registration filing • PAN & bank support",
          ],
          [
            "Society Registration",
            "Registration of societies with bye-laws and memorandum.",
            "Bye-laws drafting • Registration filing • Compliance guidance",
          ],
          [
            "NGO Registration",
            "Complete NGO setup – Trust, Society or Section 8 Company.",
            "Structure advice • Registration • Post-registration compliance",
          ],
          [
            "12A and 80G Registration",
            "Tax-exemption registration for charitable organisations and tax benefits for donors.",
            "12A registration • 80G approval • Renewal support",
          ],
        ]),
      },
      {
        title: "Tax & License",
        items: items([
          [
            "PAN Card Registration",
            "Application for new PAN for individuals, firms and companies.",
            "Online application • Correction support • Quick processing",
          ],
          [
            "TAN Registration",
            "Tax Deduction Account Number required for deducting or collecting tax.",
            "Online application • TAN allotment • TDS compliance advice",
          ],
          [
            "GST Registration",
            "Registration under GST for goods and services businesses.",
            "Document checklist • Application filing • GSTIN issuance",
          ],
          [
            "Professional Tax Registration",
            "State professional tax registration for employers and professionals.",
            "Enrolment • Registration certificate • Return guidance",
          ],
          [
            "PF Registration",
            "Employees’ Provident Fund registration for eligible establishments.",
            "Establishment registration • Employer code • UAN guidance",
          ],
          [
            "ESI Registration",
            "Employees’ State Insurance registration for eligible establishments.",
            "Employer registration • Employee enrolment • Contribution guidance",
          ],
          [
            "LEI Registration",
            "Legal Entity Identifier registration for entities in financial transactions.",
            "Application support • Renewal • Documentation",
          ],
        ]),
      },
      {
        title: "Other Registrations",
        items: items([
          [
            "Trade License",
            "Municipal licence for operating a shop, office or business at a location.",
            "Application support • Renewal • Local rules guidance",
          ],
          [
            "Labour License",
            "Licence for contractors and establishments engaging contract labour.",
            "Application filing • Renewal • Compliance advice",
          ],
          [
            "FSSAI Registration",
            "Food business registration or licence under FSSAI.",
            "Basic / State / Central licence • Documents & application • Renewal",
          ],
          [
            "Import Export Code (IEC)",
            "IEC for businesses engaged in import or export.",
            "Online application • IEC certificate • Modification support",
          ],
          [
            "ISO Registration",
            "ISO certification assistance to improve quality and credibility.",
            "Standard selection • Documentation • Audit coordination",
          ],
          [
            "FCRA Registration",
            "Registration to receive foreign contributions for eligible NGOs.",
            "Eligibility check • Application filing • Annual return support",
          ],
          [
            "Trademark Registration",
            "Protect your brand name and logo.",
            "Search & filing • Objection reply • Registration follow-up",
          ],
          [
            "Copyright Registration",
            "Protect creative works such as software, music, art and literature.",
            "Application filing • Documentation • Follow-up",
          ],
          [
            "Patent Registration",
            "Protection for new inventions through patent filing.",
            "Prior-art guidance • Application drafting • Filing support",
          ],
          [
            "RERA Registration",
            "Registration of real-estate projects and agents with RERA.",
            "Project registration • Agent registration • Quarterly updates",
          ],
        ]),
      },
    ],
  },
  {
    slug: "project-finance",
    title: "Project Finance",
    menuLabel: "Project Finance",
    enquiryLabel: "Loan / Project Finance",
    icon: "project-finance",
    summary: "Project reports, CMA data, loan guidance for business and personal needs, government schemes and startup support.",
    metaDescription:
      "Bank-ready project reports and CMA data, working capital, term, PMEGP and CGTMSE loan guidance, government schemes, tenders and startup support — Sarath Kumar & Associates.",
    intro:
      "Bank-ready project reports, CMA data and loan guidance, plus practical support with schemes, tenders and starting or closing a business. Preparing a report does not guarantee that a loan will be sanctioned.",
    documents: [
      "KYC of the promoters (PAN, Aadhaar, address proof)",
      "Project description, project cost and quotations",
      "Income tax returns and financial statements for the last 2–3 years",
      "Bank statements for the last 12 months",
      "Details and sanction letters of existing loans",
      "Property or collateral documents, where applicable",
    ],
    groups: [
      {
        title: "Loans – Guidance",
        items: items([
          [
            "Project Report",
            "Bank-ready project reports with projections and feasibility analysis.",
            "Cost of project & means of finance • Profit & cash-flow projections • Ratio analysis",
          ],
          [
            "CMA Data",
            "Credit Monitoring Arrangement data prepared in bank format for loan proposals.",
            "Past & projected financials • Fund-flow analysis • Bank-ready format",
          ],
          [
            "Working Capital Loans",
            "Guidance on cash credit and overdraft limits to run daily operations.",
            "Limit assessment • Documentation • Bank liaison",
          ],
          [
            "Term Loans",
            "Long-term funding for machinery, expansion and projects.",
            "Eligibility review • Project report • Sanction follow-up",
          ],
          [
            "PMEGP Scheme Loans",
            "Subsidy-linked loans for new micro-enterprises under the Government PMEGP scheme.",
            "Eligibility check • Project report • Application support",
          ],
          [
            "CGTMSE Loans",
            "Collateral-free credit for MSMEs under the CGTMSE guarantee scheme.",
            "Scheme eligibility • Proposal preparation • Bank coordination",
          ],
          [
            "Home Loan",
            "Guidance on home loan eligibility, documentation and lender selection.",
            "Eligibility check • Document checklist • Tax benefit guidance",
          ],
          [
            "Personal Loan",
            "Support in documentation and lender selection for personal loans.",
            "Eligibility check • Document checklist • Quick processing guidance",
          ],
          [
            "Loan Against Property",
            "Funding against residential or commercial property.",
            "Property documents review • Valuation coordination • Lender selection",
          ],
          [
            "Gold Loan",
            "Guidance on short-term loans against gold.",
            "Lender comparison • Documents • Repayment planning",
          ],
          [
            "Other Loans",
            "Other loan and financing needs – vehicle, education, equipment and more.",
            "Needs assessment • Document support • Lender coordination",
          ],
        ]),
      },
      {
        title: "Business Support",
        items: items([
          [
            "Startup Guidance",
            "End-to-end support for new founders – structure, registrations, tax and funding.",
            "Business structure advice • Compliance roadmap • Funding readiness",
          ],
          [
            "Government Schemes",
            "Identify and apply for central and state government schemes and subsidies.",
            "Scheme matching • Application support • Documentation",
          ],
          [
            "Tenders Guidance",
            "Support in preparing and submitting government and private tenders.",
            "Eligibility review • Document preparation • Financial bid support",
          ],
          [
            "MSME Samadhan",
            "Assistance in recovering delayed payments from buyers through the MSME Samadhan portal.",
            "Claim filing • Documentation • Follow-up",
          ],
          [
            "Closure of Business",
            "Legal and tax-compliant closure of firms, LLPs and companies.",
            "Closure filings • Final returns • Asset & liability settlement",
          ],
          [
            "CSR Fund",
            "Guidance for NGOs on receiving and for companies on utilising CSR funds.",
            "CSR-1 registration • Project reporting • Utilisation certificates",
          ],
        ]),
      },
    ],
  },
  {
    slug: "valuation",
    title: "Valuation & Certification",
    menuLabel: "Valuation",
    enquiryLabel: "Valuation & Certification",
    icon: "valuation",
    summary: "Share, business, property and other valuations, deed drafting, and CA certificates for banks, visas and RERA.",
    metaDescription:
      "Stock, brand, property, jewellery, income tax, capital gains and business valuation, MoU and deed drafting, RERA, net worth and other CA certificates — Sarath Kumar & Associates.",
    intro:
      "Valuations, deed drafting and Chartered Accountant certificates for banks, visas, tenders, tax and RERA — undertaken where the firm is legally permitted and professionally eligible, and issued only where records support them.",
    documents: [
      "The purpose of the valuation or certificate, and any prescribed format",
      "Financial statements and books of account",
      "Property or asset documents",
      "Shareholding records, for share valuation",
      "Supporting records for the figures to be certified",
      "Earlier valuation reports, if any",
    ],
    groups: [
      {
        title: "Valuation Services",
        items: items([
          [
            "Stock Valuation",
            "Valuation of stock and shares for sale, transfer, funding or reporting.",
            "Method selection • Valuation report • Regulatory use",
          ],
          [
            "Brand Valuation",
            "Estimating the monetary value of brands and intangible assets.",
            "Intangible valuation • Methodology note • Report for investors",
          ],
          [
            "Property Valuation",
            "Valuation of land, buildings and other property.",
            "Market-value assessment • Site inspection coordination • Report for bank / court",
          ],
          [
            "Jewellery Valuation",
            "Valuation of gold, diamond and jewellery assets.",
            "Weight & purity basis • Market-rate valuation • Certificate",
          ],
          [
            "Income Tax Valuation",
            "Valuation required for income tax purposes such as share transfer or gifts.",
            "Applicable rule method • Computation • Valuation report",
          ],
          [
            "Capital Gains Valuation",
            "Valuation and computation for capital gains on assets.",
            "Cost & indexation guidance • Gain computation • Tax planning",
          ],
          [
            "Business Valuation",
            "Valuation of a business for sale, merger, investment or succession.",
            "DCF / market methods • Detailed report • Negotiation support",
          ],
          [
            "MoU",
            "Drafting of Memorandum of Understanding between parties.",
            "Clear terms • Legal review guidance • Quick turnaround",
          ],
          [
            "Sale Deed Drafting",
            "Drafting of sale deeds for property transfer.",
            "Draft preparation • Stamp duty guidance • Registration support",
          ],
          [
            "Gift Deed Drafting",
            "Drafting of gift deeds for family and other transfers.",
            "Draft preparation • Stamp duty guidance • Registration support",
          ],
        ]),
      },
      {
        title: "Certifications",
        items: items([
          [
            "RERA Certifications",
            "Chartered Accountant certificates required under RERA for projects.",
            "Form certificates • Cost & fund utilisation • Quarterly updates",
          ],
          [
            "Networth Certificate",
            "Certificate of net worth for visas, loans, tenders and other uses.",
            "Asset & liability review • Signed certificate • Quick delivery",
          ],
          [
            "Stock Report",
            "Stock statements and reports for bank submission.",
            "Stock statements • Bank format • Periodic updates",
          ],
          [
            "Other Certificates",
            "Other CA certificates – turnover, income, net worth, utilisation and more.",
            "Custom certificate • Verification of records • Quick delivery",
          ],
        ]),
      },
    ],
  },
  {
    slug: "compliance",
    title: "Corporate Compliance",
    menuLabel: "Compliance",
    enquiryLabel: "Compliance",
    icon: "compliance",
    summary: "ROC, LLP and company annual compliance, FEMA and RBI reporting, company changes, conversions and closure.",
    metaDescription:
      "ROC filing, LLP and private limited company compliance, FEMA and RBI reporting, name and registered office change, share transfer, DPT-3, CHG-1/CHG-4, conversions and closure.",
    intro:
      "Annual and event-based compliance for proprietorships, partnerships, LLPs and companies — so your filings, approvals and records stay up to date with the ROC, RBI and other authorities.",
    documents: [
      "Certificate of Incorporation, MOA / AOA or LLP agreement",
      "PAN, DIN and DSC of the directors or partners",
      "Audited financial statements for the year",
      "Board, shareholder or partner resolutions",
      "Statutory registers and earlier ROC filings",
      "Documents for the change (new address, share transfer, loan or charge papers)",
    ],
    groups: [
      {
        title: "Company Compliance",
        items: items([
          [
            "Proprietorship",
            "Ongoing tax and licence compliance for proprietorship businesses.",
            "Income tax & GST • Licence renewals • Book maintenance",
          ],
          [
            "Partnership",
            "Annual and periodic compliance for partnership firms.",
            "Firm return • Partner capital & profit sharing • Deed amendments",
          ],
          [
            "ROC Filing",
            "Annual filing of financial statements and returns with the Registrar of Companies.",
            "AOC-4 • MGT-7 / MGT-7A • Board and AGM support",
          ],
          ["LLP Compliance", "Annual compliance for LLPs.", "Form 11 • Form 8 • Income tax return"],
          [
            "Pvt. Ltd. Compliance",
            "Complete annual compliance for private limited companies.",
            "Board & general meetings • ROC filings • Director KYC (DIR-3 KYC)",
          ],
          [
            "FEMA Compliance",
            "Reporting and compliance for foreign investment and overseas transactions.",
            "FC-GPR / FC-TRS • FLA return • RBI reporting",
          ],
          [
            "RBI Compliance",
            "Compliance and reporting for entities regulated by or reporting to RBI.",
            "Periodic returns • Certificates • Advisory",
          ],
        ]),
      },
      {
        title: "Company Changes",
        items: items([
          [
            "Company Name Change",
            "Procedure for changing the name of a company or LLP.",
            "Name approval • Board & shareholder approvals • ROC filing",
          ],
          [
            "Registered Office",
            "Change of registered office within or outside the city / state.",
            "Notice & approvals • ROC filing • Document updates",
          ],
          [
            "Share Transfer",
            "Documentation and filing for transfer of shares.",
            "SH-4 preparation • Stamp duty guidance • Register updates",
          ],
          [
            "DPT 3 Filing",
            "Return of deposits / outstanding receipts filing for companies.",
            "Applicability review • Form preparation • Timely filing",
          ],
          [
            "CHG-1 (Loan Taken)",
            "Registration of charge when a company borrows against its assets.",
            "Charge documents • Form filing • Certificate of registration",
          ],
          [
            "CHG-4 (Loan Repaid)",
            "Satisfaction of charge once the loan is repaid.",
            "Lender NOC • Form filing • Updated records",
          ],
        ]),
      },
      {
        title: "Conversions & Closure",
        items: items([
          [
            "Pvt Ltd to OPC",
            "Conversion of a Private Limited Company into a One Person Company where eligible.",
            "Eligibility check • Approvals & filing • New certificate",
          ],
          [
            "Pvt Ltd to Public Ltd",
            "Conversion to a Public Limited Company for wider fund-raising.",
            "Board & shareholder approvals • Filing • Compliance changes",
          ],
          [
            "Partnership to LLP",
            "Convert a partnership firm into an LLP for limited liability.",
            "Eligibility check • Filing & approvals • Tax implications advice",
          ],
          [
            "Close Pvt Ltd Company",
            "Strike-off or winding-up of a private limited company.",
            "Strike-off filing • Final accounts • Bank & tax closure",
          ],
        ]),
      },
    ],
  },
  {
    slug: "statutory-filings",
    title: "Statutory Filings",
    menuLabel: "Statutory Filings",
    enquiryLabel: "Statutory Filings",
    icon: "statutory",
    summary: "PF, ESI, TDS and Professional Tax returns, demand notices and RERA filings — tracked and filed on time.",
    metaDescription:
      "PF ECR, ESI, TDS (24Q / 26Q) and Professional Tax return filing, demand notice replies and RERA periodic filings for employers and businesses — Sarath Kumar & Associates.",
    intro:
      "Monthly, quarterly and annual statutory returns for employers and businesses — tracked against due dates and filed on time, with support when a notice arrives.",
    documents: [
      "Employee master data and monthly salary details",
      "PF, ESI and Professional Tax registration details",
      "TDS deduction and challan details",
      "Earlier returns filed",
      "Copies of notices or intimations received",
      "RERA project details, for RERA filings",
    ],
    groups: [
      {
        title: "Tax Filing Services",
        items: items([
          [
            "PF Return Filings",
            "Monthly PF ECR filing and payment support for employers.",
            "ECR preparation • Challan payment • Compliance tracking",
          ],
          [
            "ESI Return Filing",
            "Monthly ESI contribution and half-yearly return support.",
            "Contribution calculation • Return filing • Employee records",
          ],
          [
            "TDS Return Filing",
            "Quarterly TDS return filing and TDS certificates.",
            "Form 24Q / 26Q • Form 16 / 16A • Notice & correction support",
          ],
          [
            "PT Return Filings",
            "Professional Tax monthly or annual return filing for employers.",
            "Return filing • Payment support • Registration updates",
          ],
          [
            "Demand Notices",
            "Handling demand notices and intimations related to statutory dues.",
            "Notice analysis • Reply & rectification • Appeal guidance",
          ],
          [
            "RERA Filings",
            "Periodic filings for real-estate projects under RERA.",
            "Quarterly updates • Annual audit filings • Form certifications",
          ],
        ]),
      },
    ],
  },
];

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}

export function getSubService(service: Service, slug: string) {
  for (const group of service.groups) {
    const item = group.items.find((i) => i.slug === slug);
    if (item) return { group, item };
  }
  return undefined;
}

export function allSubServices(service: Service) {
  return service.groups.flatMap((group) => group.items);
}

export function servicePath(slug: string, subSlug?: string) {
  return subSlug ? `/services/${slug}/${subSlug}/` : `/services/${slug}/`;
}

