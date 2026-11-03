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
    <div className="flex flex-col md:flex-row gap-6">
      {/* LEFT CARD */}
      <div className="rounded-xl md:max-w-xs bg-bg-secondary border border-border-default p-5 min-h-35">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-text-tertiary mb-3">
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
                className="px-3 py-1 text-xs rounded-full border border-border-default font-medium transition"
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
      <div className="rounded-xl flex-1 bg-bg-secondary border border-border-default p-2 lg:p-5 min-h-60">
        {showSkeleton ? (
          <TechStackChartSkeleton />
        ) : isError ? (
          <p className="text-sm text-red-400">Failed to load chart</p>
        ) : languages.length === 0 ? (
          <p className="text-sm text-text-tertiary">No data available</p>
        ) : (
          <div className="flex items-center gap-2 md:gap-6 animate-in fade-in duration-500">
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
            <div className="flex-1 space-y-2 text-sm">
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

                  <span className="text-text-secondary">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
