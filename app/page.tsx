import type { Metadata } from "next";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import ReactLenis from "lenis/react";
import { HeroSection } from "@/components/sections/HeroSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { getPersonalInfo, getSocialLinks } from "@/lib/config";

const info = getPersonalInfo();
const siteUrl = info.websiteUrl.replace(/\/$/, "");

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  const sameAs = getSocialLinks()
    .filter(
      (link) => link.platform === "GitHub" || link.platform === "LinkedIn",
    )
    .map((link) => link.url);
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${siteUrl}/#person`,
        name: info.name,
        alternateName: ["Syed Muhammad Imran", "Muhammad Imran"],
        jobTitle: info.title,
        description: info.seoDescription,
        url: siteUrl,
        image: `${siteUrl}/imran-logo.svg`,
        sameAs,
        email: `mailto:${info.email}`,
        telephone: info.phone,
        knowsLanguage: ["English", "Urdu"],
        areaServed: ["Pakistan", "Remote"],
        homeLocation: { "@type": "Place", name: info.location },
        worksFor: { "@type": "Organization", name: info.company },
        knowsAbout: [
          "React",
          "Next.js",
          "Node.js",
          "Express.js",
          "FastAPI",
          "PostgreSQL",
          "AI Integration",
          "Full Stack Development",
          "System Design",
        ],
        alumniOf: {
          "@type": "EducationalOrganization",
          name: "Hamdard University, Karachi",
        },
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        name: `${info.name} Portfolio`,
        url: siteUrl,
        inLanguage: "en",
        description: info.seoDescription,
        publisher: { "@id": `${siteUrl}/#person` },
      },
    ],
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <ReactLenis root options={{ lerp: 0.05 }}>
        <HeroSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <section
          id="contact"
          aria-labelledby="contact-heading"
          className="mx-auto max-w-4xl scroll-mt-24 px-4 py-24 text-center sm:px-6 md:py-28 lg:py-32"
        >
          <h2
            id="contact-heading"
            className="text-4xl font-bold tracking-[-0.02em] leading-[1.05] md:text-5xl lg:text-6xl"
          >
            Get in touch
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-pretty text-muted-foreground md:text-xl">
            Have a project or opportunity to discuss? Contact {info.name} by
            email.
          </p>
          <a
            href={"mailto:" + info.email}
            className="mt-10 inline-block text-lg font-medium text-foreground underline underline-offset-4 transition-colors hover:text-primary md:text-xl"
          >
            {info.email}
          </a>
        </section>
      </ReactLenis>
    </div>
  );
}
