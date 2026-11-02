import Link from "next/link";
import { LegalPage } from "@/components/LegalPage";
import { pageMetadata } from "@/lib/seo";
import { addressOneLine, email, firm, phones } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description: `How ${firm.name} handles personal information submitted through this website's enquiry form and contact links.`,
  path: "/privacy-policy/",
});

export default function PrivacyPolicyPage() {
  return (
    <LegalPage title="Privacy Policy" path="/privacy-policy/" updated="October 2026">
      <p>
        This policy explains how {firm.name}, {firm.designation} (&ldquo;the firm&rdquo;, &ldquo;we&rdquo;), handles
        personal information collected through this website. It applies only to this website and not to information
        exchanged during a professional engagement, which is governed by the terms of that engagement and the firm&rsquo;s
        professional obligations of confidentiality.
      </p>

      <h2>Information we collect</h2>
      <p>
        We collect only the information you submit (name, phone, email, city, query and documents) to respond to
        enquiries and deliver services. The website&rsquo;s query form asks for:
      </p>
      <ul>
        <li>your full name, phone number and city;</li>
        <li>optionally, the service you need and your email address;</li>
        <li>a description of your query.</li>
      </ul>
      <p>
        Please do not include passwords, bank account details, identity documents or other sensitive information in the
        enquiry form.
      </p>
      <p>
        The website does not use advertising or analytics cookies and does not track visitors across other websites. If
        analytics are added in future, this policy will be updated before they are enabled.
      </p>

      <h2>How the information is used</h2>
      <p>
        Information submitted through the form is used only to respond to your enquiry and, where you engage the firm, to
        deliver the service you requested. We do not sell or share your data with third parties except as required by
        law or to complete a service you requested. Documents are stored securely and used only for the engagement.
      </p>

      <h2>Service providers</h2>
      <ul>
        <li>
          <strong>Form delivery:</strong> enquiries are transmitted to the firm&rsquo;s email inbox through Web3Forms, a
          third-party form-delivery service.
        </li>
        <li>
          <strong>Email:</strong> enquiries are received in the firm&rsquo;s email account, which is hosted by an email
          service provider.
        </li>
        <li>
          <strong>Website hosting:</strong> the hosting provider may record technical information such as IP addresses
          and browser details in server logs for security and reliability.
        </li>
        <li>
          <strong>Maps:</strong> the contact page shows an embedded Google Map and &ldquo;Get directions&rdquo; links
          that open Google Maps. Google may set its own cookies when the map loads; its use is subject to
          Google&rsquo;s own privacy policy.
        </li>
        <li>
          <strong>WhatsApp:</strong> the WhatsApp buttons open WhatsApp, operated by Meta, and any message you send there
          is subject to WhatsApp&rsquo;s own terms and privacy policy.
        </li>
      </ul>

      <h2>Retention</h2>
      <p>
        Enquiries are retained only for as long as needed to respond to them and for any related engagement, or as
        required by applicable law and professional standards.
      </p>

      <h2>Your choices</h2>
      <p>
        You may ask the firm to access, correct or delete personal information you have submitted through this website,
        subject to applicable law, including the Digital Personal Data Protection Act, 2023, as and when its provisions
        apply. You may request deletion of your data by writing to <a href={`mailto:${email}`}>{email}</a>.
      </p>

      <h2>Contact</h2>
      <p>
        {firm.name}, {addressOneLine}.<br />
        Email: <a href={`mailto:${email}`}>{email}</a> · Phone: {phones.map((p) => p.display).join(" / ")}
      </p>

      <h2>Changes to this policy</h2>
      <p>
        This policy may be updated from time to time. The date at the top of the page shows when it was last revised.
        Please also read the <Link href="/terms-and-conditions/">terms and conditions</Link> and the{" "}
        <Link href="/disclaimer/">website disclaimer</Link>.
      </p>
    </LegalPage>
  );
}
