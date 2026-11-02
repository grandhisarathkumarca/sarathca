import Link from "next/link";
import { LegalPage } from "@/components/LegalPage";
import { pageMetadata } from "@/lib/seo";
import { firm } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Website Disclaimer",
  description: `Terms on which information on the ${firm.name} website is provided.`,
  path: "/disclaimer/",
});

export default function DisclaimerPage() {
  return (
    <LegalPage title="Website Disclaimer" path="/disclaimer/" updated="October 2026">
      <p>
        This website is maintained by {firm.name}, {firm.designation}, to provide general information about the firm,
        its proprietor and the professional services it offers. By using this website you acknowledge the following.
      </p>

      <h2>Information, not solicitation</h2>
      <p>
        The content of this website is provided for information only, at the visitor&rsquo;s own initiative. It is not
        intended as an advertisement, a solicitation of work, or an invitation to create a professional relationship.
        Chartered Accountants in India are subject to the Code of Ethics of the Institute of Chartered Accountants of
        India, and this website is intended to be read in that context.
      </p>

      <h2>Not professional advice</h2>
      <p>
        Nothing on this website constitutes professional advice. Tax, accounting and compliance requirements depend on
        individual facts and change over time. Please consult the firm or another qualified professional before acting
        on any information here. No client relationship is created by reading this website or by sending an enquiry; an
        engagement begins only when its terms are agreed.
      </p>

      <h2>Services and outcomes</h2>
      <p>
        Services described on this website are offered subject to applicable law, professional standards, eligibility
        and agreed terms of engagement. The firm does not guarantee any particular outcome, including tax savings,
        registrations, approvals, the sanction of finance or the result of any proceeding.
      </p>

      <h2>Accuracy and external links</h2>
      <p>
        Reasonable care is taken to keep the information on this website accurate, but it may not reflect the most
        recent changes in law or practice. Links to external websites, including government portals, are provided for
        convenience; the firm is not responsible for their content or availability.
      </p>

      <h2>Communication by email or the enquiry form</h2>
      <p>
        Email and web forms are not fully secure channels. Please do not send confidential documents or sensitive
        information until an engagement is in place and a suitable method has been agreed. See the{" "}
        <Link href="/privacy-policy/">privacy policy</Link> for how enquiry information is handled.
      </p>
    </LegalPage>
  );
}
