import type { Metadata } from "next";
import Link from "next/link";
import { getPersonalInfo } from "@/lib/config";
import { LegalPage, LegalSection } from "@/components/legal-page";

const info = getPersonalInfo();
const siteUrl = info.websiteUrl.replace(/\/$/, "");

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
    {
      "@type": "ListItem",
      position: 2,
      name: "Privacy Policy",
      item: `${siteUrl}/privacy`,
    },
  ],
};

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for Syed Muhammad Imran's portfolio — how information is collected, used, and protected.",
  alternates: {
    canonical: `${siteUrl}/privacy`,
  },
  openGraph: {
    title: "Privacy Policy | Syed Muhammad Imran",
    description:
      "How this portfolio collects, uses, and protects visitor information.",
    url: `${siteUrl}/privacy`,
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | Syed Muhammad Imran",
    description:
      "How this portfolio collects, uses, and protects visitor information.",
    images: ["/opengraph-image"],
  },
};

const LAST_UPDATED = "October 13, 2026";

export default function PrivacyPage() {
  const info = getPersonalInfo();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <LegalPage title="Privacy Policy" lastUpdated={LAST_UPDATED}>
        <LegalSection title="Introduction">
          <p>
            This Privacy Policy explains how <strong>{info.name}</strong>{" "}
            (&quot;I&quot;, &quot;me&quot;, or &quot;my&quot;) collects, uses,
            and safeguards information when you visit{" "}
            <a href={siteUrl} target="_blank" rel="noopener noreferrer">
              {siteUrl}
            </a>{" "}
            (the &quot;Site&quot;). By using the Site, you agree to the
            practices described in this policy.
          </p>
        </LegalSection>

        <LegalSection title="Information I Collect">
          <p>
            The Site is designed to be informative and does not require you to
            create an account. However, some information may be collected
            automatically or provided by you voluntarily:
          </p>
          <ul>
            <li>
              <strong>Usage data.</strong> Pages visited, referring URLs,
              approximate location (country/region), browser and device type,
              and interaction events, collected through analytics.
            </li>
            <li>
              <strong>Contact information.</strong> Your name, email address,
              and message when you reach out through the contact form or by
              email.
            </li>
            <li>
              <strong>Chatbot input.</strong> Text you submit to the AI chatbot
              to generate a response. This content is processed to answer your
              query and is not used to identify you.
            </li>
          </ul>
        </LegalSection>

        <LegalSection title="How Information Is Used">
          <ul>
            <li>
              To respond to your messages, questions, and collaboration
              requests.
            </li>
            <li>
              To understand how the Site is used and improve its content and
              performance.
            </li>
            <li>To provide and maintain chatbot functionality.</li>
            <li>
              To protect the Site against abuse, spam, and security threats.
            </li>
            <li>To comply with applicable legal obligations.</li>
          </ul>
        </LegalSection>

        <LegalSection title="Cookies & Analytics">
          <p>
            The Site uses Google Analytics 4 to measure traffic and usage
            trends. Google Analytics may set cookies and collect data such as
            your IP address (with IP anonymization enabled), device information,
            and browsing behavior. This data is aggregated and used solely to
            improve the Site.
          </p>
          <p>
            You can opt out of analytics cookies by using your browser&apos;s
            cookie controls or the{" "}
            <a
              href="https://tools.google.com/dlpage/gaoptout"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google Analytics Opt-out Browser Add-on
            </a>
            .
          </p>
        </LegalSection>

        <LegalSection title="Third-Party Services">
          <p>
            The Site integrates with trusted third-party providers that may
            process limited data on my behalf:
          </p>
          <ul>
            <li>
              <strong>Vercel</strong> for hosting and deployment.
            </li>
            <li>
              <strong>Google Analytics</strong> for anonymous traffic
              measurement.
            </li>
            <li>
              <strong>GitHub API</strong> to display public contribution and
              language statistics.
            </li>
            <li>
              <strong>AI providers</strong> to power chatbot responses. Messages
              sent to the chatbot may be transmitted to these providers for
              processing.
            </li>
          </ul>
          <p>
            Each provider processes data under its own privacy policy. I do not
            sell your personal information.
          </p>
        </LegalSection>

        <LegalSection title="Data Retention & Security">
          <p>
            Information is retained only for as long as necessary to fulfill the
            purposes described in this policy. I apply reasonable technical and
            organizational measures to protect information against unauthorized
            access, alteration, or loss. However, no method of transmission or
            storage over the internet is completely secure, and absolute
            security cannot be guaranteed.
          </p>
        </LegalSection>

        <LegalSection title="Your Rights">
          <p>
            Depending on your location, you may have the right to access,
            correct, or delete personal information I hold about you, or to
            object to certain processing. To exercise any of these rights,
            contact me using the details below.
          </p>
        </LegalSection>

        <LegalSection title="Children's Privacy">
          <p>
            This Site is not directed at children under the age of 13, and I do
            not knowingly collect personal information from children. If you
            believe a child has provided personal information, please contact me
            so it can be removed.
          </p>
        </LegalSection>

        <LegalSection title="Changes to This Policy">
          <p>
            This Privacy Policy may be updated periodically. Any changes will be
            posted on this page with an updated &quot;Last updated&quot; date.
            Continued use of the Site after changes are posted constitutes
            acceptance of the revised policy.
          </p>
        </LegalSection>

        <LegalSection title="Contact">
          <p>
            If you have questions about this Privacy Policy or how your
            information is handled, you can reach me at{" "}
            <a href={`mailto:${info.email}`}>{info.email}</a>. Please also
            review the <Link href="/terms">Terms of Service</Link>.
          </p>
        </LegalSection>
      </LegalPage>
    </>
  );
}
