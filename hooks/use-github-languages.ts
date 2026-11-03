import { useQuery } from "@tanstack/react-query";

export interface ApiLanguage {
  name: string;
  value: number;
}

async function fetchGithubLanguages(): Promise<ApiLanguage[]> {
  const res = await fetch("/api/github-languages");

  if (!res.ok) {
    throw new Error("Failed to fetch GitHub languages");
  }

  return res.json();
}

export function useGithubLanguages() {
  return useQuery({
    queryKey: ["github-languages"],
    queryFn: fetchGithubLanguages,
  });
}
