import { NextResponse } from "next/server";

export async function GET() {
  const username = process.env.GITHUB_USERNAME;
  if (!username) return NextResponse.json([]);
  const token = process.env.GITHUB_TOKEN;

  const headers: HeadersInit = token
    ? { Authorization: `Bearer ${token}` }
    : {};

  // Fetch all repos (up to 100)
  const reposRes = await fetch(
    `https://api.github.com/users/${username}/repos?per_page=100`,
    { headers, next: { revalidate: 3600 } },
  );

  if (!reposRes.ok) {
    return NextResponse.json(
      { error: "Failed to fetch repositories" },
      { status: reposRes.status },
    );
  }

  const repos: Array<{ languages_url: string }> = await reposRes.json();

  const languageMap: Record<string, number> = {};

  // Fetch languages for each repo in parallel
  const langResults = await Promise.allSettled(
    repos.map((repo) =>
      fetch(repo.languages_url, { headers, next: { revalidate: 3600 } }).then(
        (r) => r.json() as Promise<Record<string, number>>,
      ),
    ),
  );

  for (const result of langResults) {
    if (result.status === "fulfilled") {
      for (const [lang, bytes] of Object.entries(result.value)) {
        languageMap[lang] = (languageMap[lang] ?? 0) + bytes;
      }
    }
  }

  const total = Object.values(languageMap).reduce((a, b) => a + b, 0);
  if (total === 0) {
    return NextResponse.json([]);
  }

  const result = Object.entries(languageMap)
    .map(([name, value]) => ({
      name,
      value: Math.round((value / total) * 100),
    }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 6);

  return NextResponse.json(result);
}
