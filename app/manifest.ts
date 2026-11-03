import { MetadataRoute } from "next";
import { getPersonalInfo } from "@/lib/config";

export default function manifest(): MetadataRoute.Manifest {
  const personalInfo = getPersonalInfo();

  return {
    name: `${personalInfo.name} Portfolio`,
    short_name: "Imran Portfolio",
    description:
      personalInfo.seoDescription ||
      personalInfo.bio ||
      `Portfolio of ${personalInfo.name}, ${personalInfo.title}.`,
    start_url: "/",
    display: "standalone",
    background_color: "#0b0b0f",
    theme_color: "#0b0b0f",
    icons: [
      {
        src: "/imran-logo.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
