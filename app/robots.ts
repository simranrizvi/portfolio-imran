import { MetadataRoute } from "next";
import { getPersonalInfo } from "@/lib/config";

export const dynamic = "force-static";
export const revalidate = 86400;

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getPersonalInfo().websiteUrl.replace(/\/$/, "");
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"],
    },
    host: siteUrl,
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
