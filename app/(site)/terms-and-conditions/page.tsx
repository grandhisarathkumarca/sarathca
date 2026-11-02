import Link from "next/link";
import { LegalPage } from "@/components/LegalPage";
import { pageMetadata } from "@/lib/seo";
import { address, email, firm } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Terms and Conditions",
  description: `Terms and conditions for using the ${firm.name} website and engaging the firm.`,
  path: "/terms-and-conditions/",
});

/** Text from the "Terms and Conditions" section of the content pack. */
export default function TermsPage() {
  return (
    <LegalPage title="Terms and Conditions" path="/terms-and-conditions/" updated="October 2026">
      <p>
        These terms apply to the use of this website maintained by {firm.name}, {firm.designation} (&ldquo;the
        firm&rdquo;), and to professional engagements that begin through it.
      </p>

      <h2>General guidance only</h2>
      <p>
        Information on this website is for general guidance and is not a substitute for professional advice on specific
        facts.
      </p>

      <h2>Engagement</h2>
      <p>A professional engagement begins only after a written confirmation of scope and fees.</p>

      <h2>Fees</h2>
      <p>Fees are as agreed in writing; statutory fees and government charges are extra.</p>

      <h2>Client responsibilities</h2>
      <p>
        Clients must provide complete and correct information and documents in time. The firm is not liable for
        penalties arising from delayed or incorrect information supplied by the client.
      </p>

      <h2>Jurisdiction</h2>
      <p>Disputes are subject to the jurisdiction of courts at Visakhapatnam, {address.region}.</p>

      <h2>Contact</h2>
      <p>
        Questions about these terms can be sent to <a href={`mailto:${email}`}>{email}</a>. Please also read the{" "}
        <Link href="/privacy-policy/">privacy policy</Link> and the <Link href="/disclaimer/">website disclaimer</Link>.
      </p>
    </LegalPage>
  );
}
