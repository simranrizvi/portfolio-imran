import GithubContributions from "@/components/github-contribution";
import TechStack from "@/components/github-techstack";
import { PortfolioStats } from "@/components/analytics/PortfolioStats";

import { Code, GitGraph, BarChart3 } from "lucide-react";
import type { Metadata } from "next";
import { getPersonalInfo } from "@/lib/config";

const siteUrl = getPersonalInfo().websiteUrl.replace(/\/$/, "");

export const metadata: Metadata = {
  title: "Portfolio Stats & Analytics",
  description:
    "View Syed Muhammad Imran's portfolio analytics and technical skills.",
  alternates: {
    canonical: `${siteUrl}/stats`,
  },
  openGraph: {
    title: "Portfolio Stats & Analytics | Syed Muhammad Imran",
    description:
      "Portfolio analytics and technical skills for Syed Muhammad Imran.",
    url: `${siteUrl}/stats`,
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio Stats & Analytics | Syed Muhammad Imran",
    description:
      "Portfolio analytics and technical skills for Syed Muhammad Imran.",
    images: ["/opengraph-image"],
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
    {
      "@type": "ListItem",
      position: 2,
      name: "Stats",
      item: `${siteUrl}/stats`,
    },
  ],
};

export default function StatsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <div className="mx-auto max-w-7xl min-h-screen pt-24 pb-12 px-4 xl:px-0 space-y-16">
        {/* Analytics Section */}
        <section>
          <div className="mb-6 flex items-center gap-3">
            <BarChart3
              className="size-6 text-text-tertiary"
              aria-hidden="true"
            />
            <h1 className="text-2xl md:text-3xl font-bold text-text-primary tracking-tight">
              Portfolio Analytics
            </h1>
          </div>
          <PortfolioStats />
        </section>

        {/* Github Contributions */}
        <section className="relative">
          <div className="mb-6 flex items-center gap-3">
            <GitGraph
              className="size-6 text-text-tertiary"
              aria-hidden="true"
            />
            <h2 className="text-2xl md:text-3xl font-bold text-text-primary tracking-tight">
              Github Contributions
            </h2>
          </div>
          <GithubContributions />
        </section>

        {/* Tech Stack */}
        <section>
          <div className="mb-6 flex items-center gap-3">
            <Code className="size-6 text-text-tertiary" aria-hidden="true" />
            <h2 className="text-2xl md:text-3xl font-bold text-text-primary tracking-tight">
              Tech Stack & Languages
            </h2>
          </div>
          <div className="rounded-xl">
            <TechStack />
          </div>
        </section>
      </div>
    </>
  );
}
