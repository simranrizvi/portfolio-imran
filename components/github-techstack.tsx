"use client";

import { ApiLanguage, useGithubLanguages } from "@/hooks/use-github-languages";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

import {
  TechStackChartSkeleton,
  TechStackTagsSkeleton,
} from "./tech-stack-skeleton";

type LanguageWithColor = ApiLanguage & {
  color: string;
};

const COLORS = [
  "#3b82f6",
  "#06b6d4",
  "#ec4899",
  "#8b5cf6",
  "#22c55e",
  "#f59e0b",
];

export default function TechStack() {
  const { data, isPending, isError } = useGithubLanguages();

  const languages: LanguageWithColor[] =
    data?.map((lang, index) => ({
      ...lang,
      color: COLORS[index % COLORS.length],
    })) || [];

  const showSkeleton = isPending;

  return (
    <div className="flex flex-col gap-4 md:flex-row">
      {/* LEFT CARD */}
      <div className="min-h-35 rounded-2xl border border-border bg-card p-5 shadow-sm md:w-72 md:shrink-0">
        <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Core Technologies & Languages
        </h3>

        {showSkeleton ? (
          <TechStackTagsSkeleton />
        ) : isError ? (
          <p className="text-sm text-red-400">Failed to load technologies</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {languages.map((lang) => (
              <span
                key={lang.name}
                className="rounded-md border border-border px-3 py-1.5 text-xs font-medium"
                style={{
                  backgroundColor: `${lang.color}20`,
                  color: lang.color,
                }}
              >
                {lang.name}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* RIGHT CARD */}
      <div className="min-h-60 flex-1 rounded-2xl border border-border bg-card p-5 shadow-sm">
        {showSkeleton ? (
          <TechStackChartSkeleton />
        ) : isError ? (
          <p className="text-sm text-red-400">Failed to load chart</p>
        ) : languages.length === 0 ? (
          <p className="text-sm text-muted-foreground">No data available</p>
        ) : (
          <div className="flex flex-col items-center gap-5 sm:flex-row sm:gap-8">
            {/* CHART */}
            <div className="relative w-48 h-48 shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={languages}
                    innerRadius={65}
                    outerRadius={90}
                    paddingAngle={2}
                    dataKey="value"
                    isAnimationActive={true}
                    animationDuration={900}
                    animationEasing="ease-out"
                  >
                    {languages.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* LEGEND */}
            <div className="w-full flex-1 space-y-2 text-sm">
              {languages.map((item) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between gap-2"
                >
                  <span
                    className="flex items-center gap-2"
                    style={{ color: item.color }}
                  >
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      aria-hidden="true"
                      style={{
                        backgroundColor: item.color,
                      }}
                    />
                    {item.name}
                  </span>

                  <span className="text-muted-foreground">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
