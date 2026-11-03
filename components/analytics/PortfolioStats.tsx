"use client";

import { useEffect, useState } from "react";
import { Eye, Activity } from "lucide-react";
import { PortfolioLove } from "./PortfolioLove";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { NumberTicker } from "../ui/number-ticker";

type StatsData = {
  views: number;
  love: number;
};

export function PortfolioStats() {
  const [stats, setStats] = useState<StatsData | null>(null);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch("/api/analytics/stats");
        if (res.ok) {
          const data = await res.json();
          setStats(data);
        }
      } catch (err) {
        console.error("Failed to fetch stats", err);
      }
    }
    fetchStats();
  }, []);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2 w-full mb-8">
      <Card className="bg-bg-secondary border-border-default overflow-hidden relative group hover:border-primary/50 transition-colors">
        <div className="absolute inset-0 bg-linear-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-text-tertiary">
            Total Views
          </CardTitle>
          <Eye
            className="h-4 w-4 text-text-tertiary group-hover:text-primary transition-colors"
            aria-hidden="true"
          />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-text-primary">
            {stats ? (
              <NumberTicker value={stats?.views} />
            ) : (
              <Skeleton className="h-9 w-24 bg-muted" />
            )}
          </div>
          <p className="text-xs text-text-tertiary mt-2">
            Total visits across the portfolio
          </p>
        </CardContent>
      </Card>

      <Card className="bg-bg-secondary border-border-default overflow-hidden relative group hover:border-red-500/50 transition-colors">
        <div className="absolute inset-0 bg-linear-to-r from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-text-tertiary">
            Appreciation Count
          </CardTitle>
          <Activity
            className="h-4 w-4 text-text-tertiary group-hover:text-red-500 transition-colors"
            aria-hidden="true"
          />
        </CardHeader>
        <CardContent>
          <div className="w-full">
            {stats ? (
              <PortfolioLove initialCount={stats.love} />
            ) : (
              <Skeleton className="h-9 w-full bg-muted" />
            )}
          </div>
          <p className="text-xs text-text-tertiary mt-4">
            People who loved the portfolio design
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
