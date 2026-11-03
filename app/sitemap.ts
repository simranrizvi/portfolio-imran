import { MetadataRoute } from "next";
import { getPersonalInfo } from "@/lib/config";

export const dynamic = "force-static";
export const revalidate = 86400;

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getPersonalInfo().websiteUrl.replace(/\/$/, "");
  return [
    {
      url: siteUrl,
    },
    {
      url: `${siteUrl}/stats`,
    },
    {
      url: `${siteUrl}/privacy`,
      lastModified: "2026-10-13",
    },
    {
      url: `${siteUrl}/terms`,
      lastModified: "2026-10-13",
    },
  ];
}
