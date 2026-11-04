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
    <div className="grid w-full gap-4 md:grid-cols-2">
      <Card className="group relative overflow-hidden rounded-2xl border border-border bg-card shadow-sm ring-0 transition-colors hover:border-foreground/20">
        <div className="absolute inset-0 bg-linear-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Total Views
          </CardTitle>
          <Eye
            className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-foreground"
            aria-hidden="true"
          />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-semibold tracking-tight text-foreground">
            {stats ? (
              <NumberTicker value={stats?.views} />
            ) : (
              <Skeleton className="h-9 w-24 bg-muted" />
            )}
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            Total visits across the portfolio
          </p>
        </CardContent>
      </Card>

      <Card className="group relative overflow-hidden rounded-2xl border border-border bg-card shadow-sm ring-0 transition-colors hover:border-foreground/20">
        <div className="absolute inset-0 bg-linear-to-r from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Appreciation Count
          </CardTitle>
          <Activity
            className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-red-500"
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
          <p className="mt-4 text-xs text-muted-foreground">
            People who loved the portfolio design
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
