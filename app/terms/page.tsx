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
      name: "Terms of Service",
      item: `${siteUrl}/terms`,
    },
  ],
};

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of Service governing the use of Syed Muhammad Imran's portfolio website.",
  alternates: {
    canonical: `${siteUrl}/terms`,
  },
  openGraph: {
    title: "Terms of Service | Syed Muhammad Imran",
    description:
      "Terms governing the use of Syed Muhammad Imran's portfolio.",
    url: `${siteUrl}/terms`,
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms of Service | Syed Muhammad Imran",
    description:
      "Terms governing the use of Syed Muhammad Imran's portfolio.",
    images: ["/opengraph-image"],
  },
};

const LAST_UPDATED = "October 13, 2026";

export default function TermsPage() {
  const info = getPersonalInfo();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <LegalPage title="Terms of Service" lastUpdated={LAST_UPDATED}>
        <LegalSection title="Acceptance of Terms">
          <p>
            These Terms of Service (&quot;Terms&quot;) govern your access to and
            use of{" "}
            <a href={siteUrl} target="_blank" rel="noopener noreferrer">
              {siteUrl}
            </a>{" "}
            (the &quot;Site&quot;), operated by <strong>{info.name}</strong>. By
            accessing or using the Site, you agree to be bound by these Terms.
            If you do not agree, please do not use the Site.
          </p>
        </LegalSection>

        <LegalSection title="Use of the Site">
          <p>
            The Site is provided for informational purposes about my
            professional work and services. You agree to use the Site lawfully
            and not to:
          </p>
          <ul>
            <li>
              Attempt to gain unauthorized access to the Site or its systems.
            </li>
            <li>
              Interfere with or disrupt the Site&apos;s operation or
              availability.
            </li>
            <li>
              Scrape, copy, or republish content for commercial use without
              permission.
            </li>
            <li>
              Use the Site to transmit malicious code, spam, or unlawful
              material.
            </li>
          </ul>
        </LegalSection>

        <LegalSection title="Intellectual Property">
          <p>
            All content on the Site — including text, design, graphics, source
            code, and project showcases — is owned by or licensed to me and is
            protected by applicable intellectual property laws. You may view and
            share the Site for personal, non-commercial purposes, but you may
            not reproduce, modify, or distribute its content without prior
            written permission.
          </p>
        </LegalSection>

        <LegalSection title="Third-Party Links & Services">
          <p>
            The Site may contain links to third-party websites and services,
            such as GitHub, LinkedIn, and analytics providers. I am not
            responsible for the content, policies, or practices of those third
            parties. Accessing them is at your own discretion and subject to
            their terms.
          </p>
        </LegalSection>

        <LegalSection title="AI Chatbot Disclaimer">
          <p>
            The Site includes an AI-powered chatbot intended to answer questions
            about my background and experience. Responses are generated
            automatically and may be inaccurate, incomplete, or outdated.
            Chatbot output is provided for convenience only and should not be
            relied upon as professional, legal, or financial advice.
          </p>
        </LegalSection>

        <LegalSection title="Disclaimer of Warranties">
          <p>
            The Site and its content are provided &quot;as is&quot; and &quot;as
            available&quot; without warranties of any kind, whether express or
            implied, including but not limited to fitness for a particular
            purpose and non-infringement. I do not warrant that the Site will be
            uninterrupted, secure, or error-free.
          </p>
        </LegalSection>

        <LegalSection title="Limitation of Liability">
          <p>
            To the fullest extent permitted by law, I shall not be liable for
            any indirect, incidental, special, consequential, or punitive
            damages arising out of or related to your use of, or inability to
            use, the Site or its content.
          </p>
        </LegalSection>

        <LegalSection title="Indemnification">
          <p>
            You agree to indemnify and hold harmless {info.name} from any
            claims, damages, liabilities, and expenses arising from your misuse
            of the Site or violation of these Terms.
          </p>
        </LegalSection>

        <LegalSection title="Governing Law">
          <p>
            These Terms are governed by and construed in accordance with the
            laws of Pakistan, without regard to its conflict of law principles.
            Any disputes shall be subject to the exclusive jurisdiction of the
            courts of Pakistan.
          </p>
        </LegalSection>

        <LegalSection title="Changes to These Terms">
          <p>
            I may update these Terms from time to time. Changes take effect when
            posted on this page with a revised &quot;Last updated&quot; date.
            Your continued use of the Site after changes are posted constitutes
            acceptance of the updated Terms.
          </p>
        </LegalSection>

        <LegalSection title="Contact">
          <p>
            For questions about these Terms, contact me at{" "}
            <a href={`mailto:${info.email}`}>{info.email}</a>. Please also
            review the <Link href="/privacy">Privacy Policy</Link>.
          </p>
        </LegalSection>
      </LegalPage>
    </>
  );
}
