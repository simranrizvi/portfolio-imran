"use client";

import dynamic from "next/dynamic";
import { FaGithub } from "react-icons/fa";
import { ArrowRight } from "lucide-react";
import { useTheme } from "next-themes";
import { getSocialLinks } from "@/lib/config";

const GitHubCalendar = dynamic(
  () => import("react-github-calendar").then((mod) => mod.GitHubCalendar),
  {
    ssr: false,
  },
);

export default function GithubContributions() {
  const { resolvedTheme } = useTheme();
  const githubUrl = getSocialLinks().find((link) => link.platform === "GitHub")?.url;
  if (!githubUrl) return <p className="text-muted-foreground">GitHub profile not provided.</p>;
  const username = new URL(githubUrl).pathname.split("/").filter(Boolean)[0];

  return (
    <div className="flex w-full flex-col gap-4">
      <GitHubCalendar
        className="mx-auto w-full"
        username={username}
        blockSize={16}
        blockMargin={8}
        fontSize={16}
        colorScheme={resolvedTheme === "dark" ? "dark" : "light"}
      />

      <div className="flex justify-center">
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
        >
          <FaGithub className="size-4" aria-hidden="true" />
          View full profile on GitHub
          <span className="transition-transform duration-200 group-hover:translate-x-0.5">
            <ArrowRight className="size-4" aria-hidden="true" />
          </span>
        </a>
      </div>
    </div>
  );
}
